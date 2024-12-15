"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "@/components/ui/date-picker";
import api from "@/lib/api";
import { LoaderCircleIcon, Plus, X } from "lucide-react";

const ingredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  quantity: z.string().min(1, "Quantity is required"),
});

const instructionSchema = z.object({
  step: z.string().min(1, "Instruction step is required"),
});

const recipeSchema = z.object({
  title: z.string().min(1, "Recipe title is required"),
  description: z.string().min(1, "Recipe description is required"),
  image: z.string().url("Please enter a valid URL"),
  ingredients: z.array(ingredientSchema).min(1, "At least one ingredient is required"),
  instructions: z.array(instructionSchema).min(1, "At least one instruction is required"),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

const RecipeManagementPage: React.FC = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const { register, control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      ingredients: [{ name: "", quantity: "" }],
      instructions: [{ step: "" }],
    },
  });

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control,
    name: "ingredients",
  });

  const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
    control,
    name: "instructions",
  });

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/users/${session?.user?.id}/recipes`);
      setRecipes(res?.data?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchRecipes();
    }
  }, [session]);

  const onSubmit = async (data: RecipeFormData) => {
    try {
      const payload = {
        title: data?.title,
        description: data?.description,
        image: data?.image,
        ingredients: data?.ingredients,
        instructions: data?.instructions,
      };

      const response = await api.post(`/api/users/${session?.user?.id}/recipes`, payload);

      if (response?.data?.success) {
        toast.success("Recipe created successfully!");
        reset();
        fetchRecipes();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Manage Recipes</h2>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Create New Recipe</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Recipe Title</Label>
              <Input {...register("title")} placeholder="Enter recipe title" />
              {errors?.title && (
                <p className="text-red-500 text-sm">{errors?.title?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                {...register("description")}
                placeholder="Describe the recipe"
              />
              {errors?.description && (
                <p className="text-red-500 text-sm">
                  {errors?.description?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input {...register("image")} placeholder="Enter image URL" />
              {errors?.image && (
                <p className="text-red-500 text-sm">{errors?.image?.message}</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Ingredients</Label>
                <Button
                  type="button"
                  onClick={() => appendIngredient({ name: "", quantity: "" })}
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Ingredient
                </Button>
              </div>
              {ingredientFields?.map((field, index) => (
                <div key={field?.id} className="space-y-2 p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Ingredient {index + 1}</h4>
                    {ingredientFields?.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeIngredient(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`ingredients.${index}.name`}>Name</Label>
                    <Input
                      {...register(`ingredients.${index}.name`)}
                      placeholder="Enter ingredient name"
                    />
                    {errors?.ingredients?.[index]?.name && (
                      <p className="text-red-500 text-sm">
                        {errors?.ingredients?.[index]?.name?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`ingredients.${index}.quantity`}>
                      Quantity
                    </Label>
                    <Input
                      {...register(`ingredients.${index}.quantity`)}
                      placeholder="Enter quantity"
                    />
                    {errors?.ingredients?.[index]?.quantity && (
                      <p className="text-red-500 text-sm">
                        {errors?.ingredients?.[index]?.quantity?.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Instructions</Label>
                <Button
                  type="button"
                  onClick={() => appendInstruction({ step: "" })}
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Instruction
                </Button>
              </div>
              {instructionFields?.map((field, index) => (
                <div key={field?.id} className="space-y-2 p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Instruction {index + 1}</h4>
                    {instructionFields?.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeInstruction(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`instructions.${index}.step`}>Step</Label>
                    <Textarea
                      {...register(`instructions.${index}.step`)}
                      placeholder="Enter instruction step"
                    />
                    {errors?.instructions?.[index]?.step && (
                      <p className="text-red-500 text-sm">
                        {errors?.instructions?.[index]?.step?.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                  Creating Recipe...
                </>
              ) : (
                "Create Recipe"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <h2 className="text-2xl font-bold mt-12 mb-6">Posted Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <LoaderCircleIcon className="w-10 h-10 animate-spin mx-auto" />
        ) : (
          recipes?.map((recipe: any) => (
            <Card key={recipe?.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{recipe?.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={recipe?.image}
                  alt={recipe?.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  {recipe?.description}
                </p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button variant="outline">Edit Recipe</Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default RecipeManagementPage;