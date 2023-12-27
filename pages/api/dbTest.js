import clientPromise from '../../Lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("EmailCampaign");
    const response = await db.command({ ping: 1 });
    res.json({ message: "Successfully connected to MongoDB", response });
  } catch (e) {
    console.error('API error:', e);
    res.status(500).json({ error: "Failed to connect to MongoDB", reason: e.message });
  }
}

