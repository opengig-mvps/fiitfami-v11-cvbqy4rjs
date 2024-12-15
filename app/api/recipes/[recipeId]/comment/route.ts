import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type CommentRequestBody = {
  content: string;
  userId: string;
};

export async function POST(
  request: Request,
  { params }: { params: { recipeId: string } }
) {
  try {
    const recipeId = parseInt(params.recipeId, 10);
    if (isNaN(recipeId)) {
      return NextResponse.json({ success: false, message: 'Invalid recipe ID' }, { status: 400 });
    }

    const body: CommentRequestBody = await request.json();
    const { content, userId } = body;

    if (!content || !userId) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: { id: parseInt(userId, 10) },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const recipe = await prisma.recipe.findFirst({
      where: { id: recipeId },
    });

    if (!recipe) {
      return NextResponse.json({ success: false, message: 'Recipe not found' }, { status: 404 });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        userId: parseInt(userId, 10),
        recipeId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Comment created successfully',
      data: { commentId: comment.id.toString() },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}