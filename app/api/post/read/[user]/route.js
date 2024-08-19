
import { db } from "../../../lib/db"

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const posts = await db.post.findMany({
                orderBy: { createdAt: "desc" },
            });
            // Parse the JSON images field
            const parsedPosts = posts.map((post) => ({
                ...post,
                images: JSON.parse(post.images),
            }));
            res.status(200).json(parsedPosts);
        } catch (error) {
            res.status(500).json({ error: "Error fetching posts" });
        }
    } else if (req.method === "POST") {
        try {
            const { images } = req.body;
            const post = await db.post.create({
                data: {
                    images: JSON.stringify(images), // Store as JSON string
                },
            });
            res.status(201).json({
                ...post,
                images: JSON.parse(post.images), // Parse back to array before sending
            });
        } catch (error) {
            res.status(500).json({ error: "Error creating post" });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
