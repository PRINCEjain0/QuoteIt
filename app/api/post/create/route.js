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

        // Create a response object with both the new post data and a success message
        const responseData = {
            post: newPost,
            message: 'Post successfully created!'
        };
        console.log('Raw server response:', responseData);

        return new Response(JSON.stringify(responseData), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error creating post:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}