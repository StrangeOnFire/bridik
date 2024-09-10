import Image from "next/image";
import Header from "../components/homepage/Header";
import HowToUse from "../components/homepage/HowToUse";
import Navbar from "../components/common/Navbar";
import ProfilePage from "../components/user/dashboard/ProfilePage";
export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <ProfilePage />
      <HowToUse />
      <footer className="bg-black text-white py-4 text-center">
        © 2024 bridik.in
      </footer>
    </>
  );
}
