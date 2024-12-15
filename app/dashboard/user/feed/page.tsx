"use client";

import { useState, useEffect } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Heart, MessageCircle, LoaderCircleIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";

const RecipeFeedPage = () => {
  const { data: session } = useSession();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!session) {
      return;
    }
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/recipes');
        setRecipes(res?.data?.data); // res.data will be this format : {success:boolean, message:string, data:any}
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [session]);

  const handleLike = async (recipeId: string) => {
    try {
      const res = await api.post(`/api/recipes/${recipeId}/like`, {
        userId: session?.user?.id,
      });
      if (res?.data?.success) {
        setRecipes((prevRecipes) =>
          prevRecipes?.map((recipe) =>
            recipe?.id === recipeId ? { ...recipe, likes: res?.data?.data?.likes } : recipe
          )
        );
        toast.success("Liked the recipe!");
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleComment = async (recipeId: string, comment: string) => {
    try {
      const res = await api.post(`/api/recipes/${recipeId}/comment`, {
        userId: session?.user?.id,
        text: comment,
      });
      if (res?.data?.success) {
        setRecipes((prevRecipes) =>
          prevRecipes?.map((recipe) =>
            recipe?.id === recipeId
              ? { ...recipe, comments: res?.data?.data?.comments }
              : recipe
          )
        );
        toast.success("Commented on the recipe!");
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="container px-4 md:px-6 py-6 space-y-6">
          {loading ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            recipes?.map((recipe: any) => (
              <Card key={recipe?.id}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar>
                    <AvatarImage src={recipe?.user?.avatarUrl} alt={recipe?.user?.name} />
                    <AvatarFallback>{recipe?.user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">{recipe?.user?.name}</p>
                    <p className="text-xs text-muted-foreground">Posted {recipe?.createdAt}</p>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <img
                    src={recipe?.imageUrl}
                    alt={recipe?.title}
                    className="w-full h-auto aspect-square object-cover"
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                  <div className="flex items-center gap-4 w-full">
                    <Button variant="ghost" size="icon" onClick={() => handleLike(recipe?.id)}>
                      <Heart className="h-5 w-5" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MessageCircle className="h-5 w-5" />
                      <span className="sr-only">Comment</span>
                    </Button>
                  </div>
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">{recipe?.user?.name}</span> {recipe?.description}
                    </p>
                    <p className="text-muted-foreground mt-1">View all {recipe?.comments?.length} comments</p>
                  </div>
                  <div className="w-full">
                    <Input
                      placeholder="Add a comment..."
                      onKeyDown={(e: any) => {
                        if (e?.key === "Enter" && e?.target?.value?.trim()) {
                          handleComment(recipe?.id, e?.target?.value?.trim());
                          e.target.value = "";
                        }
                      }}
                    />
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default RecipeFeedPage;