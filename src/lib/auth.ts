// src/lib/auth.ts

import jwt from "jsonwebtoken";

// Fonction utilitaire pour vérifier la présence et la validité du JWT dans l'entête Authorization
export function verifyAuth(req: Request): { adminId: string; email: string } | null {
  const authHeader = req.headers.get("authorization"); // Ex : "Bearer <token>"
  console.log("Header reçu:", authHeader); 
  if (!authHeader) return null;
  const token = authHeader.split(" ")[1]; // On récupère juste le token (après "Bearer ")
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("Token décodé:", decoded); 
    return decoded as { adminId: string; email: string };
  } catch (e) {
    console.log("Erreur JWT:", e); 
    return null;
  }
}
