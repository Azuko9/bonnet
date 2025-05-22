// src/models/Produit.ts

import mongoose, { Schema } from "mongoose";

// Interface TypeScript pour un document Produit
export interface IProduit extends mongoose.Document {
  name: {
    fr: string;
    en: string;
    es: string;
  };
  description: {
    fr: string;
    en: string;
    es: string;
  };
  marque: string;       // nom ou ID de la marque associée (adaptable selon ta logique)
  imageUrl: string;     // image du produit
  features: string[];   // liste de caractéristiques (optionnel)
  createdAt: Date;
}

const ProduitSchema = new Schema<IProduit>(
  {
    name: {
      fr: { type: String, required: true },
      en: { type: String, required: true },
      es: { type: String, required: true },
    },
    description: {
      fr: { type: String, required: true },
      en: { type: String, required: true },
      es: { type: String, required: true },
    },
    marque: { type: String, required: true },
    imageUrl: { type: String, required: true },
    features: { type: [String], required: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Produit || mongoose.model<IProduit>("Produit", ProduitSchema);
