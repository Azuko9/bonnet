// src/api/profiles/[id]/route.ts

import dbConnect from "@/lib/dbConnect"; // Connexion à la base MongoDB
import Profile from "@/models/Profile"; // Importation du modèle Profile
import { NextResponse } from "next/server"; // Importation de NextResponse pour gérer les réponses HTTP
import { verifyAuth } from "@/lib/auth"; // Vérifie le JWT

type Params = { params: { id: string } }; // Type pour les paramètres de la route

// GET /api/profiles/[id] : récupérer un profil spécifique
export async function GET(req: Request, { params }: Params) {
  await dbConnect();
  const prof = await Profile.findById(params.id).lean();
  if (!prof)
    return NextResponse.json({ error: "Profil non trouvé" }, { status: 404 });
  return NextResponse.json(prof);
}

// PUT /api/profiles/[id] : modifier un profil
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const admin = verifyAuth(req); // Vérifie le JWT et retourne l'admin
  if (!admin)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  await dbConnect();
  const updates = await req.json();
  const prof = await Profile.findByIdAndUpdate(params.id, updates, { new: true });
  if (!prof)
    return NextResponse.json({ error: "Profil non trouvé" }, { status: 404 });
  return NextResponse.json(prof);
}

// DELETE /api/profiles/[id] : supprimer un profil
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const admin = verifyAuth(req); // Vérifie le JWT et retourne l'admin
  if (!admin)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  await dbConnect();
  const prof = await Profile.findByIdAndDelete(params.id);
  if (!prof)
    return NextResponse.json({ error: "Profil non trouvé" }, { status: 404 });
  return NextResponse.json({ success: true });
}
