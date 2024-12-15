"use client";
import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { toast } from "sonner";
import { LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const RegisterPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signIn("google");
    } catch (error: any) {
      toast.error("Failed to sign in with Google. Please try again.");
      setLoading(false);
    }
  };

  if (status === "authenticated") {
    toast.success("Successfully authenticated!");
    router.push("/dashboard/user");
  }

  return (
    <div className="flex-1 p-8 flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">Sign in with Google to register.</p>
          <Button
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            {loading ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              "Sign in with Google"
            )}
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-muted-foreground">
            By signing in, you agree to our terms and conditions.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;