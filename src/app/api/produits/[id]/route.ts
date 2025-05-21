// src/app/api/produits/[id]/route.ts

import dbConnect from "@/lib/dbConnect";
import Produit from "@/models/Produit";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

type Params = { params: { id: string } };

// GET /api/produits/[id] : lire un produit spécifique (public)
export async function GET(req: Request, { params }: Params) {
  await dbConnect();
  const produit = await Produit.findById(params.id).lean();
  if (!produit)
    return NextResponse.json({ error: "Produit non trouvé" }, { status: 404 });
  return NextResponse.json(produit);
}

// PUT /api/produits/[id] : modifier un produit (admin uniquement)
export async function PUT(req: Request, { params }: Params) {
  const admin = verifyAuth(req);
  if (!admin)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  await dbConnect();
  const updates = await req.json();
  const produit = await Produit.findByIdAndUpdate(params.id, updates, { new: true });
  if (!produit)
    return NextResponse.json({ error: "Produit non trouvé" }, { status: 404 });
  return NextResponse.json(produit);
}

// DELETE /api/produits/[id] : supprimer un produit (admin uniquement)
export async function DELETE(req: Request, { params }: Params) {
  const admin = verifyAuth(req);
  if (!admin)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  await dbConnect();
  const produit = await Produit.findByIdAndDelete(params.id);
  if (!produit)
    return NextResponse.json({ error: "Produit non trouvé" }, { status: 404 });
  return NextResponse.json({ success: true });
}
