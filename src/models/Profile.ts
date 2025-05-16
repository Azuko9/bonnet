// src/models/Profile.ts

import mongoose, { Schema } from "mongoose";

// Interface TypeScript pour documenter chaque profil (pour l'autocomplétion et la sécurité du code)
export interface IProfile extends mongoose.Document {
  firstName: string; // Prénom du profil
  lastName: string; // Nom du profil
  profession: {
    // Métier/profession, traduit dans chaque langue
    fr: string;
    en: string;
    es: string;
  };
  photoUrl: string; // URL de la photo du profil
  phone: string; // Téléphone
  email: string; // Email
}

// Le schéma Mongoose
const ProfileSchema = new Schema<IProfile>({
  firstName: { type: String, required: true }, // Prénom obligatoire
  lastName: { type: String, required: true }, // Nom obligatoire
  profession: {
    fr: { type: String, required: true },
    en: { type: String, required: true },
    es: { type: String, required: true },
  },
  photoUrl: { type: String, required: true }, // URL de la photo (image publique ou stockée dans /public)
  phone: { type: String },
  email: { type: String },
});

// Export du modèle : s'il existe déjà (hot reload Next.js), on le réutilise, sinon on le crée
export default mongoose.models.Profile ||
  mongoose.model<IProfile>("Profile", ProfileSchema);
