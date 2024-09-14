import "./globals.css";
import { getServerSession } from "next-auth/next";
import CombinedProviders from "../store/CombinedProviders";

export const metadata = {
  title: "Bridik",
  description:
    "A personalized AI learning tool that identifies skills gaps based on your current job or desired career path. It provides a tailored learning plan, recommends courses, and tracks progress over time.",
    icons: {
      icon: "/logo.png",
    },
    openGraph: {
      title: "Bridik",
      description: "Bridik.in is an AI-driven platform designed to help individuals enhance their skills and advance their careers.",
      images: [
        {
          url: "/bridik-image.png", 
          width: 1200,
          height: 630,
          alt: "Bridik",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Bridik",
      description: "Bridik.in is an AI-driven platform designed to help individuals enhance their skills and advance their careers. ",
      images: ["/bridik-image.png"], 
  },
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
