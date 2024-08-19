import { db } from "../../../lib/db"

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "POST") {
        try {
            const updatedPost = await db.post.update({
                where: { id },
                data: { views: { increment: 1 } },
            });
            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(500).json({ error: "Error incrementing views" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
