import NextAuth from "next-auth";
import { authOptions } from "./options";



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };





// import Google from "next-auth/providers/google";

// Google({
//   clientId: process.env.GOOGLE_CLIENT_ID!,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
// })