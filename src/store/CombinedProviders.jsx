"use client";

import { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import {
  SessionProvider as NextAuthSessionProvider,
  useSession,
} from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import store from "../store/index";
import { setUser } from "../store/userSlice";

function SessionHandler({ children }) {
  const { data: sessionData } = useSession();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (sessionData?.user?.email && !user.fullName) {
      fetchUser();
    }
  }, []);

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
     
      <main className="flex-grow">{children}</main>
    
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
