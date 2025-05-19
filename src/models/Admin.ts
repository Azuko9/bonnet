// src/models/Admin.ts

import mongoose, { Schema } from "mongoose";

// Définition de l’interface TypeScript pour le modèle Admin
export interface IAdmin extends mongoose.Document {
  email: string;      // email unique pour l’admin
  password: string;   // mot de passe HASHÉ (jamais en clair)
}

// Définition du schéma Mongoose pour Admin
const AdminSchema = new Schema<IAdmin>({
  email:    { type: String, required: true, unique: true }, // email requis et unique
  password: { type: String, required: true },               // mot de passe requis (hashé)
});

// Export du modèle (évite l’erreur en hot-reload)
export default mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
