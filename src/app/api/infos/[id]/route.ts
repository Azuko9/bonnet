// src/app/api/infos/[id]/route.ts

import dbConnect from "@/lib/dbConnect";
import Info from "@/models/Info";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

// Type pour la route dynamique
type Params = { params: { id: string } };

// GET /api/infos/[id] : lire une info spécifique (publique)
export async function GET(req: Request, { params }: Params) {
  await dbConnect();
  const info = await Info.findById(params.id).lean();
  if (!info)
    return NextResponse.json({ error: "Info non trouvée" }, { status: 404 });
  return NextResponse.json(info);
}

// PUT /api/infos/[id] : modifier une info (admin uniquement)
export async function PUT(req: Request, { params }: Params) {
  const admin = verifyAuth(req);
  if (!admin)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  await dbConnect();
  const updates = await req.json();
  const info = await Info.findByIdAndUpdate(params.id, updates, { new: true });
  if (!info)
    return NextResponse.json({ error: "Info non trouvée" }, { status: 404 });
  return NextResponse.json(info);
}

// DELETE /api/infos/[id] : supprimer une info (admin uniquement)
export async function DELETE(req: Request, { params }: Params) {
  const admin = verifyAuth(req);
  if (!admin)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  await dbConnect();
  const info = await Info.findByIdAndDelete(params.id);
  if (!info)
    return NextResponse.json({ error: "Info non trouvée" }, { status: 404 });
  return NextResponse.json({ success: true });
}
