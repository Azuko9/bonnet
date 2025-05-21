// src/app/api/marques/[id]/route.ts

import dbConnect from "@/lib/dbConnect";
import Marque from "@/models/Marque";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

type Params = { params: { id: string } };

// GET /api/marques/[id] : Lire une marque spécifique (public)
export async function GET(req: Request, { params }: Params) {
  await dbConnect();
  const marque = await Marque.findById(params.id).lean();
  if (!marque)
    return NextResponse.json({ error: "Marque non trouvée" }, { status: 404 });
  return NextResponse.json(marque);
}

// PUT /api/marques/[id] : Modifier une marque (admin seulement)
export async function PUT(req: Request, { params }: Params) {
  const admin = verifyAuth(req);
  if (!admin)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  await dbConnect();
  const updates = await req.json();
  const marque = await Marque.findByIdAndUpdate(params.id, updates, { new: true });
  if (!marque)
    return NextResponse.json({ error: "Marque non trouvée" }, { status: 404 });
  return NextResponse.json(marque);
}

// DELETE /api/marques/[id] : Supprimer une marque (admin seulement)
export async function DELETE(req: Request, { params }: Params) {
  const admin = verifyAuth(req);
  if (!admin)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  await dbConnect();
  const marque = await Marque.findByIdAndDelete(params.id);
  if (!marque)
    return NextResponse.json({ error: "Marque non trouvée" }, { status: 404 });
  return NextResponse.json({ success: true });
}
