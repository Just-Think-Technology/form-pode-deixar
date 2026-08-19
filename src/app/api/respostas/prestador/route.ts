import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import {
  providerPayloadSchema,
  toProviderResponseData,
} from "@/lib/validations/provider";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = providerPayloadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Respostas incompletas ou inválidas." },
        { status: 400 },
      );
    }

    await prisma.providerResponse.create({
      data: toProviderResponseData(parsed.data),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to save provider response", error);
    return NextResponse.json(
      { error: "Não foi possível registrar a resposta." },
      { status: 500 },
    );
  }
}
