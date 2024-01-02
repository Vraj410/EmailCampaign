import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from '../../../Lib/mongodb';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const authOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (!profile?.email) {
                throw new Error('No profile email found');
            }

            const client = await clientPromise;
            const db = client.db(process.env.DB_NAME);
            const usersCollection = db.collection('users');

            await usersCollection.updateOne(
                { email: profile.email },
                {
                    $set: {
                        name: profile.name,
                        email: profile.email,
                    },
                },
                { upsert: true }
            );

            return true; // Return true to allow the sign-in
        },
    },
};

export default NextAuth(authOptions);
