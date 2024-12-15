import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { recipeId: string } }
) {
  try {
    const recipeId = parseInt(params.recipeId, 10);
    if (isNaN(recipeId)) {
      return NextResponse.json({ success: false, message: 'Invalid recipe ID' }, { status: 400 });
    }

    await prisma.like.deleteMany({
      where: {
        recipeId: recipeId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Like removed successfully',
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error removing like:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { recipeId: string } }
) {
  try {
    const recipeId = parseInt(params.recipeId, 10);
    if (isNaN(recipeId)) {
      return NextResponse.json({ success: false, message: 'Invalid recipe ID' }, { status: 400 });
    }

    const userId = 1; // Replace with actual user ID from authentication context

    const recipe = await prisma.recipe.findFirst({
      where: { id: recipeId },
    });

    if (!recipe) {
      return NextResponse.json({ success: false, message: 'Recipe not found' }, { status: 404 });
    }

    const like = await prisma.like.create({
      data: {
        userId,
        recipeId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Like created successfully',
      data: like,
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating like:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}