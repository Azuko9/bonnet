// src/models/Profile.ts

import mongoose, { Schema } from "mongoose";

// Interface TypeScript pour documenter chaque profil (pour l'autocomplétion et la sécurité du code)
export interface IProfile extends mongoose.Document {
  firstName: string; 
  lastName: string; 
  profession: {
    fr: string;
  };
  photoUrl: string; 
  phone: string; 
  email: string; 
}

// Le schéma Mongoose
const ProfileSchema = new Schema<IProfile>({
  firstName: { type: String, required: true }, 
  lastName: { type: String, required: true }, 
  profession: {
    fr: { type: String, required: true },

  },
  photoUrl: { type: String, required: true }, 
  phone: { type: String },
  email: { type: String },
});

// Export du modèle : s'il existe déjà (hot reload Next.js), on le réutilise, sinon on le crée
export default mongoose.models.Profile ||
  mongoose.model<IProfile>("Profile", ProfileSchema);
