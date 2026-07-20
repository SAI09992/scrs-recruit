import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const ALLOWED_ADMINS = ["saidhanush@scrs.com", "saijaswanth@scrs.com"];
const ADMIN_PASSWORD = "scrs2026rr";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = String(credentials.email).toLowerCase().trim();
        const password = String(credentials.password);

        if (ALLOWED_ADMINS.includes(email) && password === ADMIN_PASSWORD) {
          const name = email.startsWith("saidhanush") ? "Sai Dhanush" : "Sai Jaswanth";
          return {
            id: email,
            email,
            name,
            role: "ADMIN",
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = "ADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = "ADMIN";
      }
      return session;
    },
  },
  pages: {
    signIn: "/scrsadmin",
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "f63c8702319efb36e890c4d1dae8a719d363b9f31db4b868",
});
