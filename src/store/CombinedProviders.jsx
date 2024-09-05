"use client";

import { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import {
  SessionProvider as NextAuthSessionProvider,
  useSession,
} from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import store from "../store/index";
import Navbar from "../components/common/Navbar";
import { setUser } from "../store/userSlice";

function SessionHandler({ children }) {
  const { data: sessionData } = useSession();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user.isLoggedIn && !sessionData?.user?.name) {
      fetchUser();
    }
  }, [sessionData, user, dispatch]);

  async function fetchUser() {
    try {
      const res = await fetch("/api/user");
      if (res.ok) {
        const userData = await res.json();
        dispatch(setUser(userData));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        © 2024 bridik.in
      </footer>
    </>
  );
}

function CombinedProviders({ children, session }) {
  return (
    <ReduxProvider store={store}>
      <NextAuthSessionProvider session={session}>
        <SessionHandler>{children}</SessionHandler>
      </NextAuthSessionProvider>
    </ReduxProvider>
  );
}

export default CombinedProviders;
