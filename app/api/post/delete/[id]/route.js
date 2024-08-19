import { db } from '../../../../../lib/db';

export async function DELETE(req, res) {
    const { id } = req.query;

    try {
        await db.post.delete({
            where: { id: parseInt(id) }, // Ensure the id is parsed to an integer if it's stored as an integer in your database
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: "Error deleting post" });
    }
}
