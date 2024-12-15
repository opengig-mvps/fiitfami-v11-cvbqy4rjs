import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        user: {
          select: {
            username: true,
            profilePicture: true,
          },
        },
        comments: true,
        likes: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Recipes fetched successfully',
      data: recipes.map((recipe) => ({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        imageUrl: recipe.imageUrl,
        createdAt: recipe.createdAt.toISOString(),
        updatedAt: recipe.updatedAt.toISOString(),
        user: {
          username: recipe.user.username,
          profilePicture: recipe.user.profilePicture,
        },
        commentsCount: recipe.comments.length,
        likesCount: recipe.likes.length,
      })),
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      data: error,
    }, { status: 500 });
  }
}