import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const ALLOWED_ADMINS = ["saidhanush@scrs.com", "saijaswanth@scrs.com"];
const ADMIN_PASSWORD = "scrs2026rr";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
          }),
        ]
      : []),
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

        if (email.includes("panel") && password === ADMIN_PASSWORD) {
          return {
            id: email,
            email,
            name: "Interview Panelist",
            role: "PANEL",
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || "ADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role || "ADMIN";
      }
      return session;
    },
  },
  pages: {
    signIn: "/scrsadmin",
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "f63c8702319efb36e890c4d1dae8a719d363b9f31db4b868",
});
