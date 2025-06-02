"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditInfoPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [form, setForm] = useState({
        title_fr: "",
        imageUrl: "",
        link: "",
    });
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        async function fetchInfo() {
            const adminToken = localStorage.getItem("adminToken");
            const res = await fetch(`/api/infos/${id}`, {
                headers: { Authorization: `Bearer ${adminToken}` },
            });
            if (res.ok) {
                const info = await res.json();
                setForm({
                    title_fr: info.title?.fr || "",
                    imageUrl: info.imageUrl || "",
                    link: info.link || "",

                });
            }
            setLoading(false);
        }
        fetchInfo();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        const adminToken = localStorage.getItem("adminToken");
        const res = await fetch(`/api/infos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify({
                title: {
                    fr: form.title_fr,
                },
                imageUrl: form.imageUrl,
                link: form.link,

            }),
        });

        if (res.ok) {
            setMessage("Info modifiée avec succès !");
            setTimeout(() => router.push("/admin/infos"), 1200);
        } else {
            const data = await res.json();
            alert(data.error || "Session expirée, veuillez vous reconnecter.");
            setTimeout(() => router.push("/admin/login"));
        }
    };

    if (loading) return <div className="text-center mt-20">Chargement…</div>;

    return (
        <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
            <h1 className="text-xl font-bold mb-6">Modifier l’info</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <input name="title_fr" placeholder="Titre (fr)" className="w-full p-2 border rounded" value={form.title_fr} onChange={handleChange} required />
                <input name="imageUrl" placeholder="URL de l’image" className="w-full p-2 border rounded" value={form.imageUrl} onChange={handleChange} required />
                <input name="link" placeholder="Lien (optionnel)" className="w-full p-2 border rounded" value={form.link} onChange={handleChange} />
                <button type="submit" className="bg-black text-white rounded px-4 py-2 hover:bg-yellow-400 hover:text-black transition">Enregistrer les modifications</button>
                {message && <div className="text-center text-sm mt-2">{message}</div>}
            </form>
        </main>
    );
}
