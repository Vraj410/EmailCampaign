import clientPromise from "../../../Lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req,res) => {
    try {
        if(req.method !== 'DELETE'){
            res.status(500).json({message: "Method should be a get"})
        }

        const client = await clientPromise
        const dbName = process.env.DB_NAME
        const db = client.db(dbName)

        const {postId} = req.query

        const result = await db.collection("Posts").deleteOne({_id: new ObjectId(postId)})
        if (result == 0){
            res.status(404).json({message: "No Post was found"})
        }

        res.status(200).json({message: "Post was deleted", postId})
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });   
    }

}