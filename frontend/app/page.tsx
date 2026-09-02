"use client";

import { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import type { Session } from "next-auth";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);

  async function getSessionFromAuth() {
    const session = await getSession();
    setSession(session);
  }

  console.log(session)

  async function handleLogout(){
    const res = await signOut({
      redirectTo:"/login"
    })
  }

  useEffect(() => {
    getSessionFromAuth();
  }, []);


  return (
    <main>
      <h1>Sign In</h1>

      {session?.user ? (
        <div>
          <p>Welcome {session.user.name}</p>
          <p>{session.user.email}</p>
          <img src={session.user.image ?? "/default-avatar.png"} alt="" />

          <button onClick={handleLogout}>Sign Out</button>
        </div>


      ) : (
        <p>You are not logged in.</p>
      )}
    </main>
  );
}