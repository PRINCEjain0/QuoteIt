export async function GET(request, { params }) {
    try {
        console.log('GET request params:', params);

        if (!params.id) {
            console.error('No ID provided in GET request');
            return NextResponse.json({ message: 'No ID provided' }, { status: 400 });
        }

        const profile = await db.user.findUnique({
            where: { id: params.id },
            select: { username: true, bio: true, profilePicture: true }
        });

        console.log('Retrieved profile:', profile);

        if (!profile) {
            console.log('Profile not found for ID:', params.id);
            return NextResponse.json({ message: 'Profile not found' }, { status: 404 });
        }

        return NextResponse.json(profile);
    } catch (error) {
        console.error('Error in GET /api/profile/[id]:', error);
        return NextResponse.json({ message: 'Error fetching profile', error: error.message }, { status: 500 });
    }
}