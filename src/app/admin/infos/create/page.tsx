"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateInfoPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        title_fr: "",
        imageUrl: "",
        link: "",
    });
    const [message, setMessage] = useState<string | null>(null);

    const adminToken = typeof window !== "undefined" ? localStorage.getItem("adminToken") : "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        const res = await fetch("/api/infos", {
            method: "POST",
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
            setMessage("Info créée avec succès !");
            setForm({ title_fr: "", imageUrl: "", link: "" });
            setTimeout(() => router.push("/admin/infos"), 1200);
        } else {
            const data = await res.json();
            setMessage(data.error || "Erreur lors de la création");
        }
    };

    return (
        <main>
            <h1>Créer une nouvelle info</h1>
            <form onSubmit={handleSubmit}>
                <input name="title_fr" placeholder="Titre (fr)" value={form.title_fr} onChange={handleChange} required />
                <input name="imageUrl" placeholder="URL de l’image" value={form.imageUrl} onChange={handleChange} required />
                <input name="link" placeholder="Lien (optionnel)" value={form.link} onChange={handleChange} />
                <button type="submit">Créer l’info</button>
                {message && <div className="text-center text-sm mt-2">{message}</div>}
            </form>
        </main>
    );
}
