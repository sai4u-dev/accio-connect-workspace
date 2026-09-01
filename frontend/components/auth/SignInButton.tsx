"use client";

import { useSession, signIn, signOut } from "next-auth/react";

type Props = {};

function SignInButton({}: Props) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session?.user) {
    return (
      <>
        <p>Signed in as {session.user.email ?? "Unknown user"}</p>

        <button onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }

  return (
    <>
      <p>Not signed in</p>

      <button onClick={() => signIn("github")}>
        Sign in with GitHub
      </button>
    </>
  );
}

export default SignInButton;