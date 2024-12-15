"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { LoaderCircleIcon, Camera } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DateTimePicker } from "@/components/ui/date-picker";
import api from "@/lib/api";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  bio: z.string().optional(),
  birthdate: z.date().optional(),
  profilePicture: z.any().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/users/${session?.user?.id}/profile`);
        const profile = res?.data?.data;
        setValue("name", profile?.name);
        setValue("email", profile?.email);
        setValue("bio", profile?.bio);
        setValue("birthdate", profile?.birthdate ? new Date(profile?.birthdate) : undefined);
        setProfilePic(profile?.profilePicture);
      } catch (error: any) {
        if (isAxiosError(error)) {
          console.error(error?.response?.data?.message ?? "Something went wrong");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session, setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data?.name);
      formData.append("email", data?.email);
      formData.append("bio", data?.bio || "");
      formData.append("birthdate", data?.birthdate ? data?.birthdate.toISOString() : "");
      if (data?.profilePicture && data?.profilePicture[0]) {
        formData.append("profilePicture", data?.profilePicture[0]);
      }

      const response = await api.put(`/api/users/${session?.user?.id}/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.success) {
        toast.success("Profile updated successfully!");
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

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Profile Management</h2>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input {...register("name")} placeholder="Enter your name" />
              {errors?.name && (
                <p className="text-red-500 text-sm">{errors?.name?.message as any}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input {...register("email")} placeholder="Enter your email" />
              {errors?.email && (
                <p className="text-red-500 text-sm">{errors?.email?.message as any}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea {...register("bio")} placeholder="Tell us about yourself" />
              {errors?.bio && (
                <p className="text-red-500 text-sm">{errors?.bio?.message as any}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthdate">Birthdate</Label>
              <Controller
                control={control}
                name="birthdate"
                render={({ field }) => (
                  <DateTimePicker
                    date={field?.value}
                    setDate={field?.onChange}
                  />
                )}
              />
              {errors?.birthdate && (
                <p className="text-red-500 text-sm">{errors?.birthdate?.message as any}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="profilePicture">Profile Picture</Label>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={profilePic} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <input
                  type="file"
                  {...register("profilePicture")}
                  accept="image/*"
                  className="hidden"
                  id="profilePicture"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("profilePicture")?.click()}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
              {errors?.profilePicture && (
                <p className="text-red-500 text-sm">
                  {errors?.profilePicture?.message as any}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                  Updating Profile...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ProfilePage;