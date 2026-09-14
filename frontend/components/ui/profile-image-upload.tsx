import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import imgUpload from "@/assets/person.png";

interface ProfileImageUploadProps {
  form: UseFormReturn<any>;
  name?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32"
};

const ProfileImageUpload = ({ form, name = "profileImage", size = "md" }: ProfileImageUploadProps) => {
  // Get the current value from the form
  const currentValue = form.getValues(name);
  // Initialize preview with the current value if it exists
  const [preview, setPreview] = useState<string | null>(currentValue || null);

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
    const input = document.getElementById(name) as HTMLInputElement;
    if (input) input.click();
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setPreview(null);
    form.resetField(name);
    const input = document.getElementById(name) as HTMLInputElement;
    if (input) input.value = "";
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={name} className="cursor-pointer">
            <div className={`relative flex items-center justify-center ${sizeClasses[size]} mx-auto`}>
              <Image
                src={preview || field.value || imgUpload}
                alt="Profile preview"
                fill
                className={`rounded-full border border-border dark:border-border/50 dark:border-gray-200 dark:bg-gray-500 shadow-sm object-cover ${preview || field.value ? "" : "opacity-50"
                  }`}
                sizes={size}
              />
              <div className="absolute -bottom-1 -right-1 rounded-full">
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
              id={name}
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
  );
};

export default ProfileImageUpload;