// scripts/seedAdmin.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config"; // Pour charger le .env.local
console.log("MONGODB_URI =", process.env.MONGODB_URI);
import Admin from "../src/models/Admin";

// Les infos de ton admin à créer
const email = "admin@example.com";
const password = "Test1234!"; // à retenir pour le test

async function main() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const hashed = await bcrypt.hash(password, 10);
  const admin = await Admin.findOneAndUpdate(
    { email },
    { email, password: hashed },
    { upsert: true, new: true }
  );
  console.log("Admin créé ou mis à jour :", admin);
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
