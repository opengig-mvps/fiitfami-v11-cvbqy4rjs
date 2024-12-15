import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json({ success: false, message: 'Query parameter is required' }, { status: 400 });
    }

    const searchResults = await Promise.all([
      prisma.user.findMany({
        where: {
          OR: [
            { username: { contains: query, mode: 'insensitive' } },
            { name: { contains: query, mode: 'insensitive' } },
            { bio: { contains: query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          username: true,
          name: true,
          profilePicture: true,
          bio: true,
        },
      }),
      prisma.recipe.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { ingredients: { contains: query, mode: 'insensitive' } },
            { instructions: { contains: query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          title: true,
          description: true,
          imageUrl: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
    ]);

    const [users, recipes] = searchResults;

    return NextResponse.json({
      success: true,
      message: 'Search results fetched successfully',
      data: { users, recipes },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching search results:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}