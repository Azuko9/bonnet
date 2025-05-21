// src/models/Marque.ts

import mongoose, { Schema } from "mongoose";

// Interface TypeScript pour un document Marque
export interface IMarque extends mongoose.Document {
  name: {
    fr: string; // Nom de la marque en français
    en: string; // ...en anglais
    es: string; // ...en espagnol
  };
  description: {
    fr: string;
    en: string;
    es: string;
  };
  logoUrl: string;    // URL du logo
  siteUrl: string;    // Lien externe (facultatif)
  createdAt: Date;
}

const MarqueSchema = new Schema<IMarque>(
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
    logoUrl: { type: String, required: true },
    siteUrl: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Marque || mongoose.model<IMarque>("Marque", MarqueSchema);
