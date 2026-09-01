import SignInButton from "@/components/auth/SignInButton";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div>
        <h1 className="mb-4 text-2xl font-bold">
          Login
        </h1>

        <SignInButton />
      </div>
    </main>
  );
}