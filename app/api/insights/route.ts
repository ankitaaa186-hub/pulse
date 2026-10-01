import { NextResponse } from "next/server";
import { DEMO_COMPANIES, DEMO_INSIGHTS } from "@/db/demo-data";

export async function GET() {
  return NextResponse.json({ companies: DEMO_COMPANIES, insights: DEMO_INSIGHTS });
}
