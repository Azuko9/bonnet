// src/models/Info.ts

import mongoose, { Schema } from "mongoose";

// Interface TypeScript pour typer un document Info
export interface IInfo extends mongoose.Document {
  title: {
    fr: string; // Titre en français
    en: string; // Titre en anglais
    es: string; // Titre en espagnol
  };
  imageUrl: string;   // URL de l'image de la bannière/info
  link: string;       // Lien externe (optionnel)
  createdAt: Date;    // Date de création (auto)
}

// Définition du schéma Mongoose pour Info
const InfoSchema = new Schema<IInfo>(
  {
    title: {
      fr: { type: String, required: true }, // Titre en français obligatoire
      en: { type: String, required: true }, // Titre en anglais obligatoire
      es: { type: String, required: true }, // Titre en espagnol obligatoire
    },
    imageUrl: { type: String, required: true },  // Image obligatoire (affichée sur le site)
    link: { type: String, required: false },     // Lien (optionnel, ex: vers une offre)
    createdAt: { type: Date, default: Date.now },// Date de création (défaut : maintenant)
  },
  { timestamps: true } // Ajoute createdAt et updatedAt automatiquement
);

// Export du modèle, ou réutilisation si déjà chargé (hot reload Next.js)
export default mongoose.models.Info || mongoose.model<IInfo>("Info", InfoSchema);

