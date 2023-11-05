import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import NextProvider from "@/components/NextProvider";
import ToastProvider from "@/components/ToastProvider";
import MyNavbar from "@/components/MyNavbar1";
import Navbar from "@/components/Navbar_copy";

// import Footer from "@/components/Footer";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CoffeeMaker",
    description: "CoffeeMaker",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en" data-theme="cupcake">
                <body className={inter.className}>
                    <NextProvider>
                        <ToastProvider />
                        <div className="h-screen">
                            {/* <MyNavbar /> */}
                            <Navbar />
                            {children}
                            {/* <Footer /> */}
                        </div>
                    </NextProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
