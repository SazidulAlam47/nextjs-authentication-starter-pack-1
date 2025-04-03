import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "./actions/registerUser";
import { jwtDecode } from "jwt-decode";
import { JwtUser } from "@/types";

export const authOptions: AuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const res = await loginUser({
                    email: credentials!.email,
                    password: credentials!.password,
                });

                if (!res?.accessToken) {
                    throw new Error(res.message || "Invalid email or password");
                }

                const decoded = jwtDecode(res.accessToken) as JwtUser;

                if (!decoded) {
                    return null;
                }

                const user = {
                    id: decoded.id,
                    name: decoded.name,
                    email: decoded.email,
                };

                if (user) {
                    return user;
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
