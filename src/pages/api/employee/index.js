import connectMongoDB from "@/utils/connect"
import { NextResponse } from "next/server"
import Employee from "@/models/employee"

export default async function GET() {
    await connectMongoDB()
    const employee = await Employee.find()
    return NextResponse.json({ employee })
}