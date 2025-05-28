// src/models/Marque.ts

import mongoose, { Schema } from "mongoose";

// Interface TypeScript pour un document Marque
export interface IMarque extends mongoose.Document {
  name: {
    fr: string; 
  };

 imageUrl: string;    
  siteUrl: string;    
  createdAt: Date;
}

const MarqueSchema = new Schema<IMarque>(
  {
    name: {
      fr: { type: String, required: true },
    },

   imageUrl: { type: String, required: true },
    siteUrl: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Marque || mongoose.model<IMarque>("Marque", MarqueSchema);
