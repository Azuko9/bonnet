"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Type minimal profil
type Profile = {
    _id: string;
    firstName: string;
    lastName: string;
    profession: { fr: string };
    photoUrl?: string;
    email?: string;
    phone?: string;
};

export default function AdminProfilesPage() {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();

    // Charger les profils au montage
    useEffect(() => {
        async function fetchProfiles() {
            const adminToken = localStorage.getItem("adminToken");
            const res = await fetch("/api/profiles", {
                headers: { Authorization: `Bearer ${adminToken}` },
            });
            if (res.ok) setProfiles(await res.json());
            setLoading(false);
        }
        fetchProfiles();
    }, []);

    // Suppression d’un profil
    async function handleDelete(id: string) {
        if (!confirm("Supprimer ce profil ?")) return;
        setMessage(null);
        const adminToken = localStorage.getItem("adminToken");
        const res = await fetch(`/api/profiles/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${adminToken}` },
        });
        if (res.ok) {
            setProfiles((prev) => prev.filter((p) => p._id !== id));
            setMessage("Profil supprimé.");
        } else {
            setMessage("Erreur lors de la suppression");
        }
    }

    return (
        <main>
            <h1>Gestion des profils</h1>
            <button
                onClick={() => router.push("/admin/profiles/create")}
            >
                ➕ Ajouter un profil
            </button>
            {loading ? (
                <div>Chargement…</div>
            ) : (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Nom</th>
                                <th>Profession</th>
                                <th>Téléphone</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profiles.length === 0 ? (
                                <tr>
                                    <td colSpan={6}>
                                        Aucun profil pour le moment.
                                    </td>
                                </tr>
                            ) : (
                                profiles.map((prof) => (
                                    <tr key={prof._id}>
                                        <td>
                                            {prof.photoUrl ? (
                                                <img
                                                    src={prof.photoUrl}
                                                    alt={prof.firstName}
                                                    style={{ width: 100, height: 100 }}
                                                />
                                            ) : (
                                                <div>
                                                    <span>?</span>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            {prof.firstName} {prof.lastName}
                                        </td>
                                        <td>{prof.profession.fr}</td>
                                        <td>{prof.phone || <span>–</span>}</td>
                                        <td>{prof.email || <span>–</span>}</td>
                                        <td className="p-3 flex gap-2 justify-center">
                                            <button
                                                onClick={() => router.push(`/admin/profiles/${prof._id}/edit`)}
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => handleDelete(prof._id)}
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            {message && (
                <div>
                    {message}
                </div>
            )}
        </main>
    );
}
