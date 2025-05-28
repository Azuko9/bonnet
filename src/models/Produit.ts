// src/models/Produit.ts

import mongoose, { Schema } from "mongoose";

// Interface TypeScript pour un document Produit
export interface IProduit extends mongoose.Document {
  name: {
    fr: string;

  };
  description: {
    fr: string;

  };
  marque: string;       
  imageUrl: string;    
  features: string[];  
  createdAt: Date;
}

const ProduitSchema = new Schema<IProduit>(
  {
    name: {
      fr: { type: String, required: true },

    },
    description: {
      fr: { type: String, required: true },

    },
    marque: { type: String, required: true },
    imageUrl: { type: String, required: true },
    features: { type: [String], required: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Produit || mongoose.model<IProduit>("Produit", ProduitSchema);
