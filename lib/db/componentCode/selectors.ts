import { ComponentCodeModel } from "./schema"
import { FilterQuery } from "mongoose"
import { ComponentCode } from "./types"

export async function listComponentCodes({
  userId,
  codegenId,
  page,
  pageSize,
  searchKeyword,
  filterField = "all",
}: {
  userId: string
  codegenId: string
  page: number
  pageSize: number
  searchKeyword?: string
  filterField?: "all" | "name" | "description"
}) {
  const skip = (page - 1) * pageSize

  let searchQuery: FilterQuery<ComponentCode> = {}

  if (searchKeyword) {
    if (filterField === "all") {
      searchQuery = {
        $or: [
          { name: { $regex: searchKeyword, $options: "i" } },
          { description: { $regex: searchKeyword, $options: "i" } },
        ],
      }
    } else {
      searchQuery = {
        [filterField]: { $regex: searchKeyword, $options: "i" },
      }
    }
  }

  // 执行查询
  const [data, total] = await Promise.all([
    ComponentCodeModel.find({ userId, codegenId, ...searchQuery })
      .select("_id name description versions")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean(),
    ComponentCodeModel.countDocuments({ userId, codegenId, ...searchQuery }),
  ])

  // 处理返回数据格式
  const formattedData = data.map(item => ({
    _id: item._id,
    name: item.name,
    description: item.description,
    codegenId: item.codegenId,
    latestVersionCode: item.versions?.[item.versions.length - 1]?.code || "",
  }))

  return {
    data: formattedData,
    total,
  }
}

export async function getComponentCodeDetail(id: string) {
  const componentCode = await ComponentCodeModel.findById(id)
    .select("_id name description versions")
    .lean()

  if (!componentCode) {
    throw new Error("Component code not found")
  }

  return componentCode
}
