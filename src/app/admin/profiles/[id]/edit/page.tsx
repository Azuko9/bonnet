"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProfilePage() {
    const router = useRouter();
    const params = useParams(); // Permet d'accéder à l'id dynamique
    const id = params?.id as string;

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        profession_fr: "",
        profession_en: "",
        profession_es: "",
        photoUrl: "",
        phone: "",
        email: "",
    });
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Charge le profil existant
    useEffect(() => {
        if (!id) return;
        async function fetchProfile() {
            const adminToken = localStorage.getItem("adminToken");
            const res = await fetch(`/api/profiles/${id}`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });
            if (res.ok) {
                const prof = await res.json();
                setForm({
                    firstName: prof.firstName || "",
                    lastName: prof.lastName || "",
                    profession_fr: prof.profession?.fr || "",
                    profession_en: prof.profession?.en || "",
                    profession_es: prof.profession?.es || "",
                    photoUrl: prof.photoUrl || "",
                    phone: prof.phone || "",
                    email: prof.email || "",
                });
            }
            setLoading(false);
        }
        fetchProfile();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        const adminToken = localStorage.getItem("adminToken");
        const res = await fetch(`/api/profiles/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify({
                firstName: form.firstName,
                lastName: form.lastName,
                profession: {
                    fr: form.profession_fr,
                },
                photoUrl: form.photoUrl,
                phone: form.phone,
                email: form.email,
            }),
        });

        if (res.ok) {
            setMessage("Profil modifié avec succès !");
            setTimeout(() => router.push("/admin/profiles"), 1200);
        } else {
            const data = await res.json();
            setMessage(data.error || "Erreur lors de la modification");
        }
    };

    if (loading) return <div className="text-center mt-20">Chargement…</div>;

    return (
        <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
            <h1 className="text-xl font-bold mb-6">Modifier le profil</h1>
            <form className="space-y-3" onSubmit={handleSubmit}>
                <input name="firstName" placeholder="Prénom" className="w-full p-2 border rounded" value={form.firstName} onChange={handleChange} required />
                <input name="lastName" placeholder="Nom" className="w-full p-2 border rounded" value={form.lastName} onChange={handleChange} required />
                <input name="profession_fr" placeholder="Profession (fr)" className="w-full p-2 border rounded" value={form.profession_fr} onChange={handleChange} required />
                <input name="photoUrl" placeholder="URL de la photo" className="w-full p-2 border rounded" value={form.photoUrl} onChange={handleChange} />
                <input name="phone" placeholder="Téléphone (optionnel)" className="w-full p-2 border rounded" value={form.phone} onChange={handleChange} />
                <input name="email" placeholder="Email (optionnel)" className="w-full p-2 border rounded" value={form.email} onChange={handleChange} />
                <button type="submit" className="bg-black text-white rounded px-4 py-2 w-full hover:bg-yellow-400 hover:text-black transition">
                    Enregistrer les modifications
                </button>
                {message && <div className="text-center text-sm mt-2">{message}</div>}
            </form>
        </main>
    );
}
