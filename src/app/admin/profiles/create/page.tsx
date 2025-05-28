"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProfilePage() {
    const router = useRouter();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        profession_fr: "",
        photoUrl: "",
        phone: "",
        email: "",
    });
    const [message, setMessage] = useState<string | null>(null);

    const adminToken = typeof window !== "undefined" ? localStorage.getItem("adminToken") : "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        const res = await fetch("/api/profiles", {
            method: "POST",
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
            setMessage("Profil créé avec succès !");
            setForm({
                firstName: "",
                lastName: "",
                profession_fr: "",
                photoUrl: "",
                phone: "",
                email: "",
            });
            setTimeout(() => router.push("/contact"), 1500); // Redirige vers la page Contact ou admin
        } else {
            const data = await res.json();
            setMessage(data.error || "Erreur lors de la création");
        }
    };

    return (
        <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
            <h1 className="text-xl font-bold mb-6">Créer un profil</h1>
            <form className="space-y-3" onSubmit={handleSubmit}>
                <input
                    name="firstName"
                    placeholder="Prénom"
                    className="w-full p-2 border rounded"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    name="lastName"
                    placeholder="Nom"
                    className="w-full p-2 border rounded"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    name="profession_fr"
                    placeholder="Profession (fr)"
                    className="w-full p-2 border rounded"
                    value={form.profession_fr}
                    onChange={handleChange}
                    required
                />

                <input
                    name="photoUrl"
                    placeholder="URL de la photo"
                    className="w-full p-2 border rounded"
                    value={form.photoUrl}
                    onChange={handleChange}
                />
                <input
                    name="phone"
                    placeholder="Téléphone (optionnel)"
                    className="w-full p-2 border rounded"
                    value={form.phone}
                    onChange={handleChange}
                />
                <input
                    name="email"
                    placeholder="Email (optionnel)"
                    className="w-full p-2 border rounded"
                    value={form.email}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="bg-black text-white rounded px-4 py-2 w-full hover:bg-yellow-400 hover:text-black transition"
                >
                    Créer le profil
                </button>
                {message && <div className="text-center text-sm mt-2">{message}</div>}
            </form>
        </main>
    );
}
