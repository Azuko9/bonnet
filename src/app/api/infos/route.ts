// src/app/api/infos/route.ts

import dbConnect from "@/lib/dbConnect";
import Info from "@/models/Info";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

// GET /api/infos : récupérer toutes les infos
export async function GET() {
  await dbConnect();
  const infos = await Info.find().lean();
  return NextResponse.json(infos);
}

// POST /api/infos : ajouter une info (admin uniquement)
export async function POST(req: Request) {
  // Sécurisation JWT : seul l'admin peut créer une info
  const admin = verifyAuth(req);
  if (!admin)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  await dbConnect();
  const body = await req.json();

  // Vérification des champs obligatoires
  if (
    !body.title?.fr ||
    !body.title?.en ||
    !body.title?.es ||
    !body.imageUrl
  ) {
    return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
  }

  // Création de la nouvelle info
  const info = await Info.create(body);
  return NextResponse.json(info, { status: 201 });
}
