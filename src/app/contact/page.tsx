// src/app/contact/page.tsx

import React from "react";

// Définition du type pour un profil (adapter selon ta base)
type Profile = {
    _id: string;
    firstName: string;
    lastName: string;
    profession: {
        fr: string;
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
        <main>
            <h1>Contact</h1>
            <p>L’équipe Bonnet :</p>
            <div>
                {profiles.length === 0 ? (
                    <div>Aucun contact pour le moment.</div>
                ) : (
                    profiles.map((prof) => (
                        <div key={prof._id}>
                            {/* Affichage de la photo si présente */}
                            {prof.photoUrl && (
                                <img
                                    src={prof.photoUrl}
                                    alt={`${prof.firstName} ${prof.lastName}`}
                                    style={{ width: 100, height: 100, objectFit: "cover" }}

                                />
                            )}
                            <div>{prof.firstName} {prof.lastName}</div>
                            <div>{prof.profession.fr}</div>
                            {/* Lien téléphone si dispo */}
                            {prof.phone && (
                                <div>
                                    <a href={`tel:${prof.phone}`} >{prof.phone}</a>
                                </div>

                            )}
                            {/* Lien email si dispo */}
                            {prof.email && (
                                <div>
                                    <a href={`mailto:${prof.email}`}>{prof.email}</a>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}
