import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { CheckCheck, LogOut, Moon, Sun } from "lucide-react";

import { useTheme } from "next-themes";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/useContext";
import { useRouter } from "next/navigation";

export function ProfileAccount() {
  const { setTheme } = useTheme();
  const { user, clearUser } = useContext(UserContext);
  const [avartaFallback, setAvartaFallback] = useState("");

  const router = useRouter();

  useEffect(() => {
    // Check if user?.name containing a space, if so, set the first letter of the first name and last name as the fallback
    if (user?.name) {
      const nameParts = user.name.split(" ");
      if (nameParts.length > 1) {
        setAvartaFallback(`${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase());
      } else {
        setAvartaFallback(user.name[0].toUpperCase());
      }
    } else {
      setAvartaFallback("N/A");
    }
  }, [avartaFallback, user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    router.push("/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer size-9">
          <AvatarImage className="object-cover" src={user?.profileImageUrl || ""} alt="@shadcn" />
          <AvatarFallback>{avartaFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-none outline-none right-0 top-0 w-[220px] bg-white dark:bg-gray-800 shadow-lg rounded-md"
        sideOffset={5}
        collisionPadding={5}
      >
        <DropdownMenuLabel>
          <div className="flex flex-col items-start">
            <span>{user?.name}</span>
            <span className="text-[12px] font-light">{user?.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <div className="flex flex-col items-start">
            <span className="mb-2">Theme</span>
            <Button
              variant={"secondary"}
              className="w-full flex justify-between items-center p-0 bg-transparent shadow-none hover:bg-transparent"
              onClick={() => setTheme("light")}
            >
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4" />
                <span>Light</span>
              </div>
              <CheckCheck className="h-4 w-4 dark:hidden" />
            </Button>
            <Button
              variant={"secondary"}
              className="w-full flex justify-between items-center p-0 bg-transparent shadow-none hover:bg-transparent"
              onClick={() => setTheme("dark")}
            >
              <div className="flex items-center space-x-2">
                <Moon className="h-4 w-4" />
                <span>Dark</span>
              </div>
              <CheckCheck className="h-4 w-4 dark:block hidden" />
            </Button>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-500 dark:text-red-400"
          onClick={handleLogout}
        >
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
