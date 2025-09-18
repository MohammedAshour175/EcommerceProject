import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            name: string
            email: string
            role?: string
        }
        token: string
        id: string
    }

    interface User extends DefaultUser {
        id: string
        token: string
        user: {
            id: string
            name: string
            email: string
            role?: string
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        token: string
        user: {
            id: string
            name: string
            email: string
            role?: string
        }
    }
}
