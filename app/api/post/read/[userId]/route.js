import { db } from '../../../../../lib/db';

export async function GET({ params }) {



    console.log("newuser" + params)
    const userId = params.userId;
    try {

        const posts = await db.post.findMany({
            where: {
                userId,
            },

            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true
                    }
                }
            }
        });

        return new Response(JSON.stringify(posts), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}