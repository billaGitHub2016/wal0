import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/options"
import { getComponentCodeDetail } from "@/lib/db/componentCode/selectors"
import { ComponentCodeApi } from "./type"
import { ComponentCode } from "@/lib/db/componentCode/types"
import { getCodeRendererUrl } from "@/lib/db/codegen/selectors"
import { renderPreviewPage } from "@/app/services/template/render"
import fs from "fs"
import path from "path"
import { transformComponentArtifactFromXml } from "@/lib/xml-message-parser/parser"
import {
  publishComponentCode,
  updateComponentCode,
  getDigest,
} from "@/app/services/publish/publish.service"
import {
  createWalrusSiteLog,
  updateWalrusSiteLogByObjectId,
} from "@/lib/db/walrusSiteLog/mutations"
import { getWalrusSiteLogByCodeId } from "@/lib/db/walrusSiteLog/selectors"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")
    const v = searchParams.get("v")
    const codegenId = searchParams.get("codegenId")
    // const wallet = searchParams.get("wallet")
    const network = searchParams.get("network") as "testnet" | "mainnet"
    const codeId = id

    if (!id) {
      return NextResponse.json(
        { error: "Missing required parameter: id" },
        { status: 400 },
      )
    }

    const data = (await getComponentCodeDetail(id)) as ComponentCode

    if (!codegenId) {
      return NextResponse.json(
        { error: "Missing required parameter: codegenId" },
        { status: 400 },
      )
    }

    if (v) {
      const matchVersion = data.versions.find(
        version => version._id.toString() === v,
      )
      if (matchVersion) {
        const html = renderPreviewPage(
          transformComponentArtifactFromXml(matchVersion.code),
        )
        const publicDir = path.join(
          process.cwd(),
          "public",
          "previews",
          `${id}_${v}`,
        )
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir, { recursive: true })
        }
        const fileName = `index.html`
        fs.writeFileSync(path.join(publicDir, fileName), html)

        // 创建一个 TransformStream 用于处理数据流
        const stream = new TransformStream()
        const writer = stream.writable.getWriter()

        // 创建响应流
        const response = new Response(stream.readable, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        })

        const siteLog = await getWalrusSiteLogByCodeId(
          codeId as string,
          network,
        )
        if (siteLog) {
          updateComponentCode(
            publicDir,
            siteLog.siteObjectId,
            async (output: string) => {
              const cleanOutput = output.replace(/\x1b\[[0-9;]*[a-zA-Z]/g, "")
              const encoder = new TextEncoder()
              await writer.write(encoder.encode(`data: ${cleanOutput}\n\n`))
            },
          )
            .then(async result => {
              if (result && result.siteObjectId) {
                const publishDigest = await getDigest(
                  result.siteObjectId,
                  network,
                )
                if (publishDigest && publishDigest.code === 0) {
                  const gasFee = publishDigest.cost + siteLog.gasFee
                  updateWalrusSiteLogByObjectId(siteLog._id, {
                    gasFee,
                    transactionDigest: publishDigest.digest,
                  })

                  // 发送最终结果到客户端
                  const encoder = new TextEncoder()
                  await writer.write(
                    encoder.encode(
                      `data: ${JSON.stringify({
                        type: "complete",
                        result: {
                          siteUrl:
                            `http://${result.localPortalId}.${process.env.WALRUS_PORTAL_HOST}` ||
                            "",
                        },
                      })}\n\n`,
                    ),
                  )
                }
              }
            })
            .finally(() => {
              writer.close()
            })
        } else {
          // 异步处理 publishComponentCode
          publishComponentCode(publicDir, async (output: string) => {
            const cleanOutput = output.replace(/\x1b\[[0-9;]*[a-zA-Z]/g, "")
            const encoder = new TextEncoder()
            await writer.write(encoder.encode(`data: ${cleanOutput}\n\n`))
          })
            .then(async result => {
              console.log("publish result = ", result)

              if (result && result.siteObjectId) {
                // const transferResult = await transferSite({
                //   objectId: result.siteObjectId as string,
                //   recipient: wallet as string,
                //   network
                // })
                const publishDigest = await getDigest(
                  result.siteObjectId,
                  network,
                )
                if (publishDigest && publishDigest.code === 0) {
                  // const transferDigest = await getDigestDetail(transferResult.digest as string, network)
                  // if (transferDigest && transferDigest.code === 0) {
                  //     // 保存发布日志
                  //     createWalrusSiteLog({
                  //       userId: session?.user?.id as string,
                  //       siteObjectId: result.siteObjectId as string,
                  //       transactionDigest: publishDigest.digest as string,
                  //       siteUrl: `http://${result.localPortalId}.localhost:3005` || '',
                  //       localPortalId: result.localPortalId || '',
                  //       gasFee: transferDigest.cost as number + publishDigest.cost as number || 0,
                  //       transferDigest: transferResult.digest as string,
                  //       netType: network,
                  //     }).catch((err) => {
                  //       console.error('Failed to create walrus site log:', err)
                  //     })
                  // }
                  // 保存发布日志
                  createWalrusSiteLog({
                    userId: session?.user?.id as string,
                    siteObjectId: result.siteObjectId as string,
                    transactionDigest: publishDigest.digest as string,
                    siteUrl:
                      `http://${result.localPortalId}.${process.env.WALRUS_PORTAL_HOST}` ||
                      "",
                    localPortalId: result.localPortalId || "",
                    gasFee: (publishDigest.cost as number) || 0,
                    transferDigest: " ",
                    blobId: result.blobId as string,
                    netType: network,
                    codeId: codeId as string,
                  }).catch(err => {
                    console.error("Failed to create walrus site log:", err)
                  })
                }
              }

              // 发送最终结果到客户端
              const encoder = new TextEncoder()
              await writer.write(
                encoder.encode(
                  `data: ${JSON.stringify({
                    type: "complete",
                    result: {
                      siteUrl:
                        `http://${result.localPortalId}.${process.env.WALRUS_PORTAL_HOST}` ||
                        "",
                    },
                  })}\n\n`,
                ),
              )
            })
            .finally(() => {
              writer.close()
            })
        }
        return response
      }
    }

    const codeRendererUrl = await getCodeRendererUrl(codegenId)

    const response: ComponentCodeApi.detailResponse = {
      data: {
        _id: data._id,
        name: data.name,
        description: data.description,
        versions: data.versions,
        codeRendererUrl,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Failed to get component code detail:", error)
    return NextResponse.json(
      { error: "Failed to get component code detail" },
      { status: 500 },
    )
  }
}

export const dynamic = "force-dynamic"
