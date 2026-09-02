"use client";

import { signIn } from "next-auth/react";

function SignInButton() {
  async function handleSignIn() {
    await signIn("credentials", {
      redirectTo: "/"
    })
  }

  

  return <button onClick={handleSignIn}>Sign In</button>
}

export default SignInButton;