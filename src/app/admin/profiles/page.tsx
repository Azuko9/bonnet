"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Type minimal profil (adapte si besoin)
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

    // Charge tous les profils à l’arrivée
    useEffect(() => {
        async function fetchProfiles() {
            const adminToken = localStorage.getItem("adminToken");
            const res = await fetch("/api/profiles", {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });
            if (res.ok) {
                setProfiles(await res.json());
            }
            setLoading(false);
        }
        fetchProfiles();
    }, []);

    // Suppression d’un profil
    async function handleDelete(id: string) {
        if (!confirm("Supprimer ce profil ?")) return;
        setMessage(null);
        const adminToken = localStorage.getItem("adminToken");
        const res = await fetch(`/api/profiles/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${adminToken}` },
        });
        if (res.ok) {
            setProfiles(profiles.filter((p) => p._id !== id));
            setMessage("Profil supprimé.");
        } else {
            setMessage("Erreur lors de la suppression");
        }
    }

    return (
        <main className="max-w-3xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Gestion des profils</h1>
            <button
                onClick={() => router.push("/admin/profiles/create")}
                className="mb-6 bg-black text-white px-4 py-2 rounded hover:bg-yellow-400 hover:text-black transition"
            >
                ➕ Ajouter un profil
            </button>
            {loading ? (
                <div>Chargement…</div>
            ) : (
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">Photo</th>
                            <th className="p-2">Nom</th>
                            <th className="p-2">Profession</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles.map((prof) => (
                            <tr key={prof._id} className="border-b">
                                <td className="p-2">
                                    {prof.photoUrl ? (
                                        <img src={prof.photoUrl} className="w-10 h-10 rounded-full" />
                                    ) : (
                                        "-"
                                    )}
                                </td>
                                <td className="p-2">{prof.firstName} {prof.lastName}</td>
                                <td className="p-2">{prof.profession.fr}</td>
                                <td className="p-2 flex gap-2">
                                    <button
                                        onClick={() => router.push(`/admin/profiles/${prof._id}/edit`)}
                                        className="bg-yellow-400 text-black px-2 py-1 rounded"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDelete(prof._id)}
                                        className="bg-red-600 text-white px-2 py-1 rounded"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {message && <div className="mt-4 text-center text-sm">{message}</div>}
        </main>
    );
}
