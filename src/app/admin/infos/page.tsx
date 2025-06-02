"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Info = {
    _id: string;
    title: { fr: string };
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
            const data = await res.json();
            setMessage("Erreur lors de la suppression");
            alert(data.error || "Session expirée, veuillez vous reconnecter.");
            setTimeout(() => router.push("/admin/login"));
        }
    }

    return (
        <main>
            <h1>Gestion des infos</h1>
            <button
                onClick={() => router.push("/admin/infos/create")}
            >
                ➕ Ajouter une info
            </button>
            {loading ? (
                <div>Chargement…</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Titre</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {infos.map((info) => (
                            <tr key={info._id}>
                                <td>
                                    <img src={info.imageUrl} />
                                </td>
                                <td>{info.title.fr}</td>
                                <td>
                                    <button
                                        onClick={() => router.push(`/admin/infos/${info._id}/edit`)}
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDelete(info._id)}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {message && <div>{message}</div>}
        </main>
    );
}
