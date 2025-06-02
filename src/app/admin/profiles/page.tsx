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
        <main className="max-w-4xl mx-auto p-6">
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
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white rounded-xl shadow">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 text-center">Photo</th>
                                <th className="p-3">Nom</th>
                                <th className="p-3">Profession</th>
                                <th className="p-3">Téléphone</th>
                                <th className="p-3">Email</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profiles.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-4 text-center text-gray-500">
                                        Aucun profil pour le moment.
                                    </td>
                                </tr>
                            ) : (
                                profiles.map((prof) => (
                                    <tr key={prof._id} className="border-b hover:bg-gray-50 transition">
                                        <td className="p-3 text-center">
                                            {prof.photoUrl ? (
                                                <img
                                                    src={prof.photoUrl}
                                                    alt={prof.firstName}
                                                    className="mx-auto rounded-full object-cover shadow"
                                                    style={{ width: 100, height: 100 }}
                                                />
                                            ) : (
                                                <div className="w-16 h-16 mx-auto flex items-center justify-center bg-gray-200 rounded-full text-gray-400">
                                                    <span className="text-xl">?</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-3 font-semibold">
                                            {prof.firstName} {prof.lastName}
                                        </td>
                                        <td className="p-3">{prof.profession.fr}</td>
                                        <td className="p-3">{prof.phone || <span className="text-gray-400">–</span>}</td>
                                        <td className="p-3">{prof.email || <span className="text-gray-400">–</span>}</td>
                                        <td className="p-3 flex gap-2 justify-center">
                                            <button
                                                onClick={() => router.push(`/admin/profiles/${prof._id}/edit`)}
                                                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300 transition"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => handleDelete(prof._id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
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
                <div
                    className={`mt-4 text-center text-sm rounded p-2 ${message.toLowerCase().includes("erreur")
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                >
                    {message}
                </div>
            )}
        </main>
    );
}
