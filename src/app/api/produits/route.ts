// src/app/api/produits/route.ts

import dbConnect from "@/lib/dbConnect";
import Produit from "@/models/Produit";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

// GET /api/produits : récupérer tous les produits (public)
export async function GET() {
  await dbConnect();
  const produits = await Produit.find().lean();
  return NextResponse.json(produits);
}

// POST /api/produits : ajouter un produit (admin uniquement)
export async function POST(req: Request) {
  const admin = verifyAuth(req);
  if (!admin)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  await dbConnect();
  const body = await req.json();

  // Vérification des champs obligatoires
  if (
    !body.name?.fr ||
    !body.description?.fr ||
    !body.marque ||
    !body.imageUrl
  ) {
    return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
  }

  const produit = await Produit.create(body);
  return NextResponse.json(produit, { status: 201 });
}
