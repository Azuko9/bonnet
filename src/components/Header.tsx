// src/components/Header.tsx

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/contact", label: "Contact" },
    { href: "/marques", label: "Marques" },
    // { href: "/cinema", label: "Cinéma" }, // à ajouter plus tard
    // { href: "/visio", label: "Visio-conférence" },
];

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="bg-black text-white shadow">
            <nav className="max-w-6xl mx-auto px-4 flex items-center h-16">
                <div className="font-bold text-lg tracking-tight flex-1">
                    <Link href="/">BONNET BIARRITZ</Link>
                </div>
                <ul className="flex space-x-6">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`hover:text-yellow-400 transition ${pathname === link.href ? "underline text-yellow-400" : ""
                                    }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
