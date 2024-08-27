import { NextResponse } from 'next/server';
import { db } from '../../../../lib/db';

export async function GET(request, { params }) {
    try {
        const profile = await db.user.findUnique({
            where: { id: params.id },
            select: { username: true, bio: true, profilePicture: true }
        });
        return NextResponse.json(profile);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching profile' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const body = await request.json();
        const updatedProfile = await db.user.update({
            where: { id: params.id },
            data: {
                username: body.username,
                bio: body.bio,
                profilePicture: body.profilePicture
            }
        });
        return NextResponse.json(updatedProfile);
    } catch (error) {
        return NextResponse.json({ message: 'Error updating profile' }, { status: 500 });
    }
}