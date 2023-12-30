import clientPromise from '../../../Lib/mongodb';

export default async (req, res) => {
    try {
        // Ensure the method is POST
        if (req.method !== 'POST') {
            res.status(405).json({ message: 'Method Not Allowed' });
            return;
        }

        // Parse request body
        const { userName, PostContent, PostSubject, PostEmail } = req.body;

        // Check for required fields
        if (!userName || !PostContent || !PostSubject || !PostEmail) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }

        const dbName = process.env.DB_NAME;
        const client = await clientPromise;
        const db = client.db(dbName);

        // Create a new post object
        const newPost = {
            userName,
            PostContent,
            PostSubject,
            PostEmail,
            createdAt: new Date()
        };

        // Insert the new post into the 'Posts' collection
        const result = await db.collection('Posts').insertOne(newPost);

        // Send success response
        res.status(201).json({ message: 'Post created successfully', postId: result.insertedId });
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
