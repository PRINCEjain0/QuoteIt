
import { db } from "../../../lib/db"
export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "DELETE") {
        try {
            await db.post.delete({
                where: { id },
            });
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: "Error deleting post" });
        }
    } else {
        res.setHeader("Allow", ["DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
