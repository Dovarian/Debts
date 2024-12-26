import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import clsx from "clsx";

const roboto = Roboto({
    weight: ["400", "500"],
    subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
    title: "Debts",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body className={clsx(roboto.className)} style={{ scrollbarGutter: "both-edges" }}>
                {children}
            </body>
        </html>
    );
}
