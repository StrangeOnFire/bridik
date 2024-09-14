"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/store/userSlice";

const NavLink = ({ href, children, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className="group relative scale-100 overflow-hidden rounded-lg px-4 py-2 transition-transform hover:scale-105 active:scale-95"
  >
    <span className="relative z-10 text-black/90 transition-colors group-hover:text-black">
      {children}
    </span>
    <span className="absolute inset-0 z-0 bg-gradient-to-br from-black/20 to-black/5 opacity-0 transition-opacity group-hover:opacity-100"></span>
  </Link>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    dispatch(clearUser());
    router.push("/"); // Redirect to home page after logout
  };

  return (
    <nav className="glass-nav fixed left-0 right-0 top-0 z-[9999] mx-auto max-w-6xl overflow-hidden bg-[#ecefec] backdrop-blur md:left-6 md:right-6 md:top-6 md:rounded-2xl">
      <div className="glass-nav flex items-center justify-between px-5 py-2 sm:py-4">
        <div className="hidden items-center gap-2 md:flex">
          {/* <NavLink href="#">Products</NavLink> */}
          {/* <NavLink href="#">About</NavLink> */}
          <NavLink href="#newsletter">Newsletter</NavLink>
        </div>
        <span className="pointer-events-none relative left-0 top-[50%] z-10 text-3xl sm:text-4xl font-[700] sm:font-black text-black  md:absolute md:left-[50%] md:-translate-x-[50%] md:-translate-y-[50%]">
          Bridik
        </span>
        <div className="flex items-center gap-4">
          {status === "authenticated" ? (
            <>
              <span className="hidden md:inline">
                Welcome, {user?.fullName}!
              </span>
              <button
                onClick={handleLogout}
                className="relative scale-100 overflow-hidden rounded-lg bg-gradient-to-br from-red-600 from-40% to-red-400 px-4 py-2 font-medium text-white transition-transform hover:scale-105 active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <div className="hidden md:block">
                <NavLink href="/login">Login</NavLink>
              </div>
              <button
                onClick={() => router.push("/register")}
                className="relative scale-100 overflow-hidden rounded-lg bg-gradient-to-br from-indigo-600 from-40% to-indigo-400 px-4 py-2 font-medium text-white transition-transform hover:scale-105 active:scale-95"
              >
                Sign up
              </button>
            </>
          )}
          <button
            onClick={toggleMenu}
            className="ml-2 block scale-100 text-3xl text-black/90 transition-all hover:scale-105 hover:text-black active:scale-95 md:hidden"
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`block overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "max-h-60" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-start gap-4 px-4 pb-4">
            {/* <NavLink href="#" onClick={closeMenu}>
              Products
            </NavLink>
            <NavLink href="#" onClick={closeMenu}>
              History
            </NavLink> */}
          {/* <NavLink href="#" onClick={closeMenu}>
            Contact
          </NavLink> */}
          <NavLink href="#newsletter" onClick={closeMenu}>
            Newsletter
          </NavLink>
          {status === "authenticated" ? (
            <button onClick={handleLogout} className="text-red-600 ml-4">
              Logout
            </button>
          ) : (
            <NavLink href="/login" onClick={closeMenu}>
              Sign in
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
