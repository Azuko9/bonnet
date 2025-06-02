"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        if (res.ok) {
            const { token } = await res.json();
            // Stocke le token dans localStorage (ou cookie si tu préfères)
            localStorage.setItem("adminToken", token);
            setTimeout(() => router.push("/admin")); // Redirige vers dashboard admin
        } else {
            alert("Identifiants invalides !");
            setTimeout(() => {
                window.location.href = "/admin/login";
            });

        }
    };

    return (
        <main>
            <h1>Connexion admin</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                >
                    Connexion
                </button>
                {message && <div>{message}</div>}
            </form>
        </main>
    );
}
