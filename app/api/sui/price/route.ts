import { NextResponse } from "next/server"
import { getSuiPrice } from "@/app/services/publish/publish.service"

export async function GET() {
  try {
    const result = await getSuiPrice()
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({
      code: 1,
      msg: error.message
    }, { status: 500 })
  }
}