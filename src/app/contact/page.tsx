// src/app/contact/page.tsx

import React from "react";

// Définition du type pour un profil (adapter selon ta base)
type Profile = {
    _id: string;
    firstName: string;
    lastName: string;
    profession: {
        fr: string;
        en: string;
        es: string;
    };
    photoUrl?: string;
    phone?: string;
    email?: string;
};

// Fonction utilitaire pour récupérer les profils via l’API (fetch côté serveur)
async function getProfiles(): Promise<Profile[]> {
    // Utilise NEXT_PUBLIC_API_URL pour dev/prod, sinon fallback sur localhost
    const url =
        process.env.NEXT_PUBLIC_API_URL
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/profiles`
            : "http://localhost:3000/api/profiles";
    const res = await fetch(url, { cache: "no-store" });
    return res.ok ? res.json() : [];
}

// Composant principal pour la page Contact
export default async function ContactPage() {
    const profiles = await getProfiles();

    return (
        <main className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-4">Contact</h1>
            <p className="mb-6 text-gray-600">L’équipe Bonnet :</p>
            <div className="grid gap-6 sm:grid-cols-2">
                {profiles.length === 0 ? (
                    <div>Aucun contact pour le moment.</div>
                ) : (
                    profiles.map((prof) => (
                        <div key={prof._id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                            {/* Affichage de la photo si présente */}
                            {prof.photoUrl && (
                                <img
                                    src={prof.photoUrl}
                                    alt={`${prof.firstName} ${prof.lastName}`}
                                    className="w-24 h-24 rounded-full object-cover mb-2 border"
                                />
                            )}
                            <div className="font-semibold">{prof.firstName} {prof.lastName}</div>
                            <div className="text-sm text-gray-500">{prof.profession.fr}</div>
                            {/* Lien téléphone si dispo */}
                            {prof.phone && (
                                <a href={`tel:${prof.phone}`} className="text-blue-600 text-xs mt-2">{prof.phone}</a>
                            )}
                            {/* Lien email si dispo */}
                            {prof.email && (
                                <a href={`mailto:${prof.email}`} className="text-blue-600 text-xs">{prof.email}</a>
                            )}
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}
