import { db } from '../../../../lib/db';



export async function POST(req) {




    const { text: description, bgImageUrl: imageUrl, userId: userId } = await req.json();

    if (!description || !imageUrl) {
        return new Response(JSON.stringify({ error: 'Description and image URL are required' }), { status: 400 });
    }

    try {
        const newPost = await db.post.create({
            data: {
                desc: description,
                img: imageUrl,
                userId: userId
            },
        });

        return new Response(JSON.stringify(newPost), { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
