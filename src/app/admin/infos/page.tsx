"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Info = {
    _id: string;
    title: { fr: string; en: string; es: string };
    imageUrl: string;
    link?: string;
};

export default function AdminInfosPage() {
    const [infos, setInfos] = useState<Info[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchInfos() {
            const adminToken = localStorage.getItem("adminToken");
            const res = await fetch("/api/infos", {
                headers: { Authorization: `Bearer ${adminToken}` },
            });
            if (res.ok) setInfos(await res.json());
            setLoading(false);
        }
        fetchInfos();
    }, []);

    async function handleDelete(id: string) {
        if (!confirm("Supprimer cette info ?")) return;
        setMessage(null);
        const adminToken = localStorage.getItem("adminToken");
        const res = await fetch(`/api/infos/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${adminToken}` },
        });
        if (res.ok) {
            setInfos(infos.filter((i) => i._id !== id));
            setMessage("Info supprimée.");
        } else {
            setMessage("Erreur lors de la suppression");
        }
    }

    return (
        <main className="max-w-3xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Gestion des infos</h1>
            <button
                onClick={() => router.push("/admin/infos/create")}
                className="mb-6 bg-black text-white px-4 py-2 rounded hover:bg-yellow-400 hover:text-black transition"
            >
                ➕ Ajouter une info
            </button>
            {loading ? (
                <div>Chargement…</div>
            ) : (
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">Image</th>
                            <th className="p-2">Titre</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {infos.map((info) => (
                            <tr key={info._id} className="border-b">
                                <td className="p-2">
                                    <img src={info.imageUrl} className="w-16 h-10 rounded object-cover" />
                                </td>
                                <td className="p-2">{info.title.fr}</td>
                                <td className="p-2 flex gap-2">
                                    <button
                                        onClick={() => router.push(`/admin/infos/${info._id}/edit`)}
                                        className="bg-yellow-400 text-black px-2 py-1 rounded"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDelete(info._id)}
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
