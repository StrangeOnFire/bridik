import "./globals.css";
import { getServerSession } from "next-auth/next";
import CombinedProviders from "../store/CombinedProviders";

export const metadata = {
  title: "Bridik",
  description:
    "Bridik.in is an AI-driven platform designed to help individuals enhance their skills and advance their careers. Discover personalized learning paths, access resources, and close skill gaps to achieve your professional goals.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = null;
  try {
    session = await getServerSession();
  } catch (error) {
    console.error("Error fetching session:", error);
  }

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <CombinedProviders session={session}>{children}</CombinedProviders>
      </body>
    </html>
  );
}
