import Image from "next/image";
import Header from "../components/homepage/Header";
import HowToUse from "../components/homepage/HowToUse";
import Navbar from "../components/common/Navbar";
import HowItWorks from "../components/homepage/HowItWorks";
import Features from "../components/homepage/Features";
import Newsletter from "../components/homepage/Newsletter";
export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <HowItWorks />
      <Features />
      <Newsletter />
      <footer className="bg-black text-white py-4 text-center">
        © 2024 bridik.in
      </footer>
    </>
  );
}
