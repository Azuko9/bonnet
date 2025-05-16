// src/api/profiles/[id]/route.ts

import dbConnect from "@/lib/dbConnect";
import Profile from "@/models/Profile";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

// GET /api/profiles/[id] : récupérer un profil spécifique
export async function GET(req: Request, { params }: Params) {
  await dbConnect();
  const prof = await Profile.findById(params.id).lean();
  if (!prof)
    return NextResponse.json({ error: "Profil non trouvé" }, { status: 404 });
  return NextResponse.json(prof);
}

// PUT /api/profiles/[id] : modifier un profil
export async function PUT(req: Request, { params }: Params) {
  await dbConnect();
  const updates = await req.json();
  const prof = await Profile.findByIdAndUpdate(params.id, updates, {
    new: true,
  });
  if (!prof)
    return NextResponse.json({ error: "Profil non trouvé" }, { status: 404 });
  return NextResponse.json(prof);
}

// DELETE /api/profiles/[id] : supprimer un profil
export async function DELETE(req: Request, { params }: Params) {
  await dbConnect();
  const prof = await Profile.findByIdAndDelete(params.id);
  if (!prof)
    return NextResponse.json({ error: "Profil non trouvé" }, { status: 404 });
  return NextResponse.json({ success: true });
}
