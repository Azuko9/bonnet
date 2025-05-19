// src/api/profiles/route.ts

import dbConnect from "@/lib/dbConnect"; // Connexion à la base MongoDB
import Profile from "@/models/Profile"; // Importation du modèle Profile
import { NextResponse } from "next/server"; // Importation de NextResponse pour gérer les réponses HTTP
import { verifyAuth } from "@/lib/auth"; // Vérifie le JWT



// GET /api/profiles : récupérer tous les profils
export async function GET() {
  console.log("===> API PROFILES GET CALLED <===");
  await dbConnect();
  const profiles = await Profile.find().lean();
  return NextResponse.json(profiles);
}

// POST /api/profiles : ajouter un nouveau profil
export async function POST(req: Request) {
    // On vérifie d’abord que le token JWT est présent et valide
  const admin = verifyAuth(req);
  if (!admin)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  await dbConnect();
  const body = await req.json();
  if (!body.firstName || !body.lastName || !body.profession) {
    return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
  }
  const profile = await Profile.create(body);
  return NextResponse.json(profile, { status: 201 });
}
