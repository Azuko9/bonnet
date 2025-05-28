// src/models/Info.ts

import mongoose, { Schema } from "mongoose";

// Interface TypeScript pour typer un document Info
export interface IInfo extends mongoose.Document {
  title: {
    fr: string; // Titre en français
  };
  imageUrl: string;   
  link: string;       
  createdAt: Date;   
}

// Définition du schéma Mongoose pour Info
const InfoSchema = new Schema<IInfo>(
  {
    title: {
      fr: { type: String, required: true },

    },
    imageUrl: { type: String, required: true },  
    link: { type: String, required: false },     
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Ajoute createdAt et updatedAt automatiquement
);

// Export du modèle, ou réutilisation si déjà chargé (hot reload Next.js)
export default mongoose.models.Info || mongoose.model<IInfo>("Info", InfoSchema);

