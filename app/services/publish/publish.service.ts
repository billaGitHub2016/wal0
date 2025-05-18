import { spawn } from "child_process"
import path from "path"
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client"
import {
  SerialTransactionExecutor,
  Transaction,
} from "@mysten/sui/transactions"
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519"
import { env } from "@/lib/env"

// 添加 SUI 价格类型定义
interface SuiPriceResponse {
  code?: number
  price?: number
  msg?: string
}

interface PublishResult {
  siteObjectId?: string
  localPortalId?: string
  blobId?: string // 添加 blobId 字段
  raw: string
}

export const publishComponentCode = async (
  folderPath: string,
  onOutput: (output: string, type: "stdout" | "stderr") => void,
): Promise<PublishResult> => {
  try {
    const executablePath = path.join(
      process.cwd(),
      "public",
      "site-builder",
      "site-builder-testnet",
    )

    // 使用 spawn 来获取实时输出
    return new Promise((resolve, reject) => {
      const process = spawn(executablePath, [
        "publish",
        folderPath,
        "--epochs",
        "1",
      ])
      let fullOutput = ""

      process.stdout.on("data", data => {
        const output = data.toString()
        fullOutput += output
        onOutput?.(output, "stdout")
      })

      process.on("close", code => {
        if (code === 0) {
          // 解析输出获取 ID
          const siteObjectId = fullOutput.match(
            /New site object ID: (0x[a-f0-9]+)/,
          )?.[1]
          const localPortalId = fullOutput.match(
            /http:\/\/([a-z0-9]+)\.localhost/,
          )?.[1]
          // 提取 blobId
          const blobId = fullOutput.match(/with blob ID ([a-zA-Z0-9_-]+)/)?.[1]

          resolve({
            siteObjectId,
            localPortalId,
            blobId, // 添加 blobId 到返回结果
            raw: fullOutput.trim(),
          })
        } else {
          reject(new Error(`Process exited with code ${code}`))
        }
      })

      process.on("error", err => {
        reject(err)
      })
    })
  } catch (error) {
    console.error("Failed to publish component:", error)
    throw error
  }
}

export const updateComponentCode = async (
  folderPath: string,
  objectId: string,
  onOutput: (output: string, type: "stdout" | "stderr") => void,
): Promise<PublishResult> => {
  try {
    const executablePath = path.join(
      process.cwd(),
      "public",
      "site-builder",
      "site-builder-testnet",
    )

    // 使用 spawn 来获取实时输出
    return new Promise((resolve, reject) => {
      const process = spawn(executablePath, [
        "update",
        "--epochs",
        "1",
        folderPath,
        objectId,
      ])
      let fullOutput = ""

      process.stdout.on("data", data => {
        const output = data.toString()
        fullOutput += output
        onOutput?.(output, "stdout")
      })

      process.on("close", code => {
        if (code === 0) {
          const localPortalId = fullOutput.match(
            /http:\/\/([a-z0-9]+)\.localhost/,
          )?.[1]
          resolve({
            siteObjectId: objectId,
            localPortalId,
            raw: fullOutput.trim(),
          })
        } else {
          reject(new Error(`Process exited with code ${code}`))
        }
      })

      process.on("error", err => {
        reject(err)
      })
    })
  } catch (error) {
    console.error("Failed to publish component:", error)
    throw error
  }
}

export const getDigest = async (
  objectId: string,
  network: "testnet" | "mainnet",
) => {
  try {
    const suiClient = new SuiClient({ url: getFullnodeUrl(network) })
    const digest = await suiClient
      .getObject({
        id: objectId,
        options: { showContent: true, showPreviousTransaction: true },
      })
      .then(res => {
        if (res && res.data) {
          return res.data.previousTransaction
        }
      })

    let cost = 0
    if (digest) {
      cost = await suiClient
        .getTransactionBlock({
          digest,
          options: { showEffects: true, showBalanceChanges: true },
        })
        .then(res => {
          if (res && res.balanceChanges) {
            if (
              Array.isArray(res.balanceChanges) &&
              res.balanceChanges.length > 0
            ) {
              return parseInt(res.balanceChanges[0].amount)
            }
            return 0
          }
          return 0
        })
    }

    return {
      code: 0,
      digest,
      cost,
    }
  } catch (error: any) {
    return {
      code: 1,
      cost: 0,
      msg: error.message,
    }
  }
}

export async function transferSite({
  objectId,
  recipient,
  network = "testnet",
}: {
  objectId: string
  recipient: string
  network: "testnet" | "mainnet"
}) {
  try {
    const client = new SuiClient({ url: getFullnodeUrl(network) })
    // 将 base64 格式的私钥转换为 Uint8Array
    //  const privateKeyBytes = Buffer.from(env.WALLET_KEY, 'base64');

    // 使用私钥创建密钥对
    const keypair = Ed25519Keypair.fromSecretKey(env.WALLET_KEY)
    const executor = new SerialTransactionExecutor({
      client,
      signer: keypair,
    })

    const tx = new Transaction()
    tx.transferObjects([tx.object(objectId)], recipient)

    const { digest } = await executor.executeTransaction(tx)
    return {
      code: 0,
      digest,
    }
  } catch (error: any) {
    console.error(error)
    return {
      code: 1,
      msg: error.message,
    }
  }
}

export async function getDigestDetail(
  digest: string,
  nework: "testnet" | "mainnet" = "testnet",
) {
  try {
    const client = new SuiClient({ url: getFullnodeUrl(nework) })
    const res = await client.getTransactionBlock({
      digest,
      options: { showEffects: true, showBalanceChanges: true },
    })
    let totalCost = 0
    if (res && Array.isArray(res.balanceChanges)) {
      totalCost = res.balanceChanges.reduce((acc, cur) => {
        if (cur.coinType === "0x2::sui::SUI") {
          return acc + parseInt(cur.amount)
        }
        return acc
      }, 0)
    }
    return {
      code: 0,
      digest,
      cost: totalCost,
    }
  } catch (error: any) {
    return { code: 1, msg: error.message }
  }
}

export async function getSuiPrice(): Promise<SuiPriceResponse> {
  try {
    const response = await fetch(
      "https://hermes.pyth.network/v2/updates/price/latest?ids%5B%5D=0x23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744",
    )

    if (!response.ok) {
      throw new Error("Failed to fetch SUI price")
    }

    const data = await response.json()

    if (!data || !Array.isArray(data.parsed) || data.parsed.length === 0) {
      throw new Error("Invalid price data format")
    }

    // Pyth 返回的价格需要根据 expo 进行计算
    const priceInfo = data.parsed[0].price
    const price = priceInfo.price * Math.pow(10, priceInfo.expo)

    return {
      code: 0,
      price: Number(price.toFixed(4)), // 保留4位小数
    }
  } catch (error: any) {
    console.error("Error fetching SUI price:", error)
    return {
      code: 1,
      msg: error.message,
    }
  }
}
