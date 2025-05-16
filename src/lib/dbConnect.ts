// src/lib/dbConnect.ts

import mongoose from "mongoose";

// On récupère l’URI de connexion dans les variables d’environnement (.env.local)
const MONGODB_URI = process.env.MONGODB_URI as string;

// Si l'URI n'est pas définie, on bloque l'exécution avec une erreur explicite
if (!MONGODB_URI) {
  throw new Error(
    "Veuillez définir MONGODB_URI dans vos variables d'environnement"
  );
}

// On définit une interface TypeScript pour le cache mongoose sur l'objet global
interface MongooseGlobal {
  mongoose?: {
    conn: typeof mongoose | null; // La connexion mongoose active
    promise: Promise<typeof mongoose> | null; // La promesse de connexion en cours
  };
}

// On cast l'objet global pour ajouter la propriété mongoose typée
const globalWithMongoose = global as typeof global & MongooseGlobal;

// On prépare le cache : on prend le cache existant ou on l'initialise
const cached = globalWithMongoose.mongoose || { conn: null, promise: null };

// Si jamais mongoose n'est pas encore ajouté à global, on l'y ajoute
if (!globalWithMongoose.mongoose) globalWithMongoose.mongoose = cached;

// Fonction asynchrone pour établir la connexion (ou réutiliser le cache)
export default async function dbConnect() {
  // Si la connexion existe déjà, on la réutilise
  if (cached.conn) return cached.conn;
  // Sinon, si une promesse de connexion est en cours, on attend qu'elle soit terminée
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }
  cached.conn = await cached.promise; // On attend la fin de la connexion (ou de la promesse déjà lancée)
  return cached.conn; // On retourne la connexion
}
