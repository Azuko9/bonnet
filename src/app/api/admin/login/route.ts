// src/app/api/admin/login/route.ts

import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await dbConnect(); // Connexion à la base MongoDB
  const { email, password } = await req.json(); // On récupère email et mot de passe du body

  // Vérifie que les champs sont présents
  if (!email || !password)
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });

  // Recherche l’admin par email
  const admin = await Admin.findOne({ email });
  if (!admin)
    return NextResponse.json({ error: "Admin introuvable" }, { status: 401 });

  // Compare le mot de passe fourni avec le hashé en base
  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid)
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });

  // Crée un JWT pour l’admin authentifié (valable 8h)
  const token = jwt.sign(
    { adminId: admin._id, email: admin.email },
    process.env.JWT_SECRET!,
    { expiresIn: "8h" }
  );

  // Retourne le token au client (admin)
  return NextResponse.json({ token });
}
