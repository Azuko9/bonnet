// src/app/api/marques/route.ts

import dbConnect from "@/lib/dbConnect";
import Marque from "@/models/Marque";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

// GET /api/marques : Récupérer toutes les marques (public)
export async function GET() {
  await dbConnect();
  const marques = await Marque.find().lean();
  return NextResponse.json(marques);
}

// POST /api/marques : Ajouter une nouvelle marque (admin seulement)
export async function POST(req: Request) {
  const admin = verifyAuth(req);
  if (!admin)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  await dbConnect();
  const body = await req.json();

  // Vérification des champs obligatoires
  if (
    !body.name?.fr ||
    !body.name?.en ||
    !body.name?.es ||
    !body.description?.fr ||
    !body.description?.en ||
    !body.description?.es ||
    !body.logoUrl
  ) {
    return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
  }

  // Création de la marque
  const marque = await Marque.create(body);
  return NextResponse.json(marque, { status: 201 });
}
