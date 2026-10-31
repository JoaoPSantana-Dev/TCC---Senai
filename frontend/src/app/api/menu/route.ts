import { buscarItensMenu } from "@/lib/menuTotem";
import { ehAdministrador } from "@/lib/sessao";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await buscarItensMenu(await ehAdministrador()));
}
