import { jwtDecode } from "jwt-decode";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const NextOptions: NextAuthOptions = {
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                });

                const data = await res.json();
                console.log("data", data);

                if (data.message === "success") {
                    const decodedToken: { id: string } = jwtDecode(data.token);
                    console.log(decodedToken);


                    return {
                        id: decodedToken.id,
                        user: data.user,
                        token: data.token,
                    };



                } else {
                    throw new Error(data.message);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.token = user.token;
                token.user = user.user;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = token.user;
                session.token = token.token;
                session.id = token.id
            }

            return session;
        },
    },
};

const handler = NextAuth(NextOptions);

export { handler as GET, handler as POST };
