import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "../../../../lib/mongodb";
import bcrypt from "bcryptjs";
import User from "../../../../models/user";

export const authOptions = {
  providers: [
    // Credentials (Email/Password)
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectToDatabase();
          const user = await User.findOne({ email });
          if (!user) {
            console.log("No user found with the given email");
            return null;
          }

          if (!user.verified) {
            throw new Error("Please verify your email before logging in.");
          }


          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            console.log("Incorrect password");
            return null;
          }

          return user;
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
    

    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/", 
    },

  callbacks: {
    async signIn({ user, account }) {
      await connectToDatabase();
      let existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        const newUser = {
          name: user.name,
          email: user.email,
          providers: [account.provider],
          verified: account.provider !== "credentials", // auto-verify Google users
        };
        if (account.provider === "credentials") newUser.password = user.password;
        await User.create(newUser);
      } else if (!existingUser.providers.includes(account.provider)) {
        existingUser.providers.push(account.provider);
        await existingUser.save();
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.name = user.name;
        token.verified = user.verified ?? false;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        verified: token.verified, 
      };
      return session;
    },
  },

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
