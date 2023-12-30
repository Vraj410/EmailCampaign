import clientPromise from '../../../Lib/mongodb';
import { ObjectId } from 'mongodb';
export default async (req,res) => {
    try {
        if (req.method !== 'GET') {
            res.status(405).json({ message: 'Method Not Allowed' });
            return;
        }

        const dbName = process.env.DB_NAME
        const client = await clientPromise
        const db = client.db(dbName)

        const {postId} = req.query

        const post = await db.collection('Posts').findOne({ _id: new ObjectId(postId) });
        
        if (!post) {
            res.status(404).json({ message: 'Post not found here: ' ,postId });
            return;
        }

        // Send the response back with the retrieved post
        res.status(200).json(post);
        
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
        
    }
}