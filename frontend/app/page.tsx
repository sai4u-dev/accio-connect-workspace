import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextAuth]/options";


export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <h1>Home</h1>

      {session?.user ? (
        <div>
          <p>Welcome {session.user.name}</p>
          <p>{session.user.email}</p>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </main>
  );
}