"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authenticationThumnail from "@/assets/sign-in.png";
import Image from "next/image";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { signInFormSchema } from "@/types/userSchema";
import { useContext } from "react";
import { UserContext } from "@/contexts/useContext";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPath";
import { toast } from "@/hooks/use-toast";
import { GoogleAuthButton } from "../auth/google-auth-button";

const SignInCard = () => {
  const { updateUser } = useContext(UserContext);
  const router = useRouter();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInFormSchema>) => {
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: data.email,
        password: data.password,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        toast({
          title: "Login Successful",
          description: `Welcome back, ${response.data.name}!`,
        });
        router.push("/dashboard");
      }
    } catch (error) {
      const errorResponse = error as {
        response: { data: { message: string } };
      };
      if (errorResponse.response && errorResponse.response.data) {
        const errorMessage = errorResponse.response.data.message;
        toast({
          title: "Sign in Failed",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sign in Failed",
          description: "Something went wrong. Please check your credentials.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden rounded-2xl border border-border/80 shadow-2xl bg-card/80 backdrop-blur-md">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 md:p-8"
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center space-y-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-sm shadow-cyan-500/30">
                      <Image
                        src="/rb-logo.png"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-xl font-extrabold brand-gradient-text">
                      ResumeRise
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
                  <p className="text-balance text-sm text-muted-foreground">
                    Sign in to manage and download your resumes
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            className="rounded-xl border-border/80"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            id="password"
                            type="password"
                            placeholder="Password"
                            className="rounded-xl border-border/80"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full brand-gradient-btn rounded-xl py-5 font-semibold shadow-md shadow-cyan-500/20"
                >
                  Sign In
                </Button>

                <div className="relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-card px-2 text-muted-foreground font-medium">
                    Or continue with
                  </span>
                </div>

                {/* Real Google Sign-In */}
                <GoogleAuthButton text="Sign in with Google" />

                <div className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-4"
                  >
                    Register free
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div className="relative hidden md:block">
            <Image
              src={authenticationThumnail}
              alt="Authentication Thumbnail"
              className="absolute h-full w-full object-cover border-l border-border/40"
              width={500}
              height={500}
              priority
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our Terms of Service and Privacy Policy.
      </div>
    </div>
  );
};

export default SignInCard;
