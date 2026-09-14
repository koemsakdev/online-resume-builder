"use client";

import { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X } from "lucide-react";
import imgUpload from "@/assets/person.png";
// Define the validation schema with Zod
const ProfileSchema = z.object({
  picture: z
    .any()
    .refine((file) => file?.length === 1, "Profile picture is required.")
    .refine(
      (file) =>
        ["image/png", "image/jpeg", "image/jpg"].includes(file[0]?.type),
      "Only PNG, JPEG, or JPG files are allowed."
    )
    .refine(
      (file) => file[0]?.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB."
    ),
});

type ProfileFormValues = z.infer<typeof ProfileSchema>;

const ProfileUploadCard = () => {
  const [preview, setPreview] = useState<string | null>(null);

  // Initialize react-hook-form with Zod resolver
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      picture: [],
    },
  });

  // Handle file change and generate preview
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: FileList) => void
  ) => {
    e.preventDefault();
    const file = e.target.files;
    if (file && file.length > 0) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file[0]);
    }
  };

  const handleFileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const input = document.getElementById("picture") as HTMLInputElement;
    if (input) input.click();
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setPreview(null);
    form.resetField("picture");
    const input = document.getElementById("picture") as HTMLInputElement;
    if (input) input.value = "";
  };

  // Handle form submission
  const onSubmit = async (data: ProfileFormValues) => {
    console.log("Uploading file:", data.picture[0]);
    form.reset();
    setPreview(null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="picture"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="picture" className="cursor-pointer">
                <div className="relative flex items-center justify-center w-24 h-24 mx-auto">
                  <Image
                    src={preview || imgUpload}
                    alt="Profile preview"
                    fill
                    className={`rounded-full border border-border dark:border-border/50 shadow-sm object-cover ${
                      preview ? "" : "opacity-50"
                    }`}
                  />
                  <div className="absolute inset-0 flex items-end justify-center hover:bg-black/30 rounded-full">
                    {preview ? (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="rounded-full"
                        onClick={handleRemoveImage}
                      >
                        <X className="size-2" />
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                        onClick={handleFileClick}
                      >
                        <Upload className="size-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </FormLabel>
              <FormControl>
                <Input
                  id="picture"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={(e) => handleFileChange(e, field.onChange)}
                  className="file:bg-muted file:text-foreground file:border-none file:rounded-md file:px-3 file:py-1 hover:file:bg-muted-foreground/10 hidden"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ProfileUploadCard;
