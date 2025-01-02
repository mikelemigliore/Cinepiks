import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connect from "@/utils/db";

interface OAuthProfile {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  // Add provider-specific fields as needed
  [key: string]: any;
}

export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        //username:{label:"Username", type:"text"},
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        console.log("Authorize");

        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
          return null; // Explicitly return null if user is not found or password is incorrect
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      })
    // ...add more providers here
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: AuthUser;
      account: Account;
      profile: OAuthProfile;
    }) {
      if (account?.provider == "credentials") {
        return true;
      }

      if (account?.provider == "github" || account?.provider == "google") {
        await connect();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              username: profile.name, // Default to email prefix if name is missing
              email: user.email,
            });

            await newUser.save();
            return true;
          }
          return true;
        } catch (err) {
          console.log("Error:", err);
        }
      }

    //   if (account?.provider == "google") {
    //     await connect();
    //     try {
    //       const existingUser = await User.findOne({ email: user.email });
    //       if (!existingUser) {
    //         const newUser = new User({
    //           username: profile.name, // Default to email prefix if name is missing
    //           email: user.email,
    //         });

    //         await newUser.save();
    //         return true;
    //       }
    //       return true;
    //     } catch (err) {
    //       console.log("Error:", err);
    //     }
    //   }
    },
  },
};

export const handler = NextAuth(authOptions);
//console.log("API Route reached");
export { handler as GET, handler as POST };
