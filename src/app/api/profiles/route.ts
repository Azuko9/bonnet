// src/api/profiles/route.ts

import dbConnect from "@/lib/dbConnect";
import Profile from "@/models/Profile";
import { NextResponse } from "next/server";

// GET /api/profiles : récupérer tous les profils
export async function GET() {
  console.log("===> API PROFILES GET CALLED <===");
  await dbConnect();
  const profiles = await Profile.find().lean();
  return NextResponse.json(profiles);
}

// POST /api/profiles : ajouter un nouveau profil
export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  if (!body.firstName || !body.lastName || !body.profession) {
    return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
  }
  const profile = await Profile.create(body);
  return NextResponse.json(profile, { status: 201 });
}
