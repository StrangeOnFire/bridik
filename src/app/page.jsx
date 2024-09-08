import Image from "next/image";
import Header from "../components/homepage/Header";
import HowToUse from "../components/homepage/HowToUse";
import Navbar from "../components/common/Navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <HowToUse />
      <footer className="bg-black text-white py-4 text-center">
        © 2024 bridik.in
      </footer>
    </>
  );
}
