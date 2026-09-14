"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { CircleCheck, CircleCheckBig, PencilLine, PenLine } from "lucide-react";
import { Button } from "../ui/button";

interface InputTitleProps {
  title: string;
  setTitle: (title: string) => void;
}

const InputTitle: React.FC<InputTitleProps> = ({ title, setTitle }) => {
  const [showInput, setShowInput] = useState(false);
  return (
    <div>
      {showInput ? (
        <div className="flex items-center gap-5">
          <Input
            type="text"
            placeholder="Enter your title here"
            className="w-full text-sm rounded-sm shadow-none dark:border-gray-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            onClick={() => setShowInput(false)}
            variant={"secondary"}
            size={"icon"}
            className="flex items-center justify-center bg-transparent hover:bg-transparent shadow-none p-0 rounded-full transition duration-200 ease-in-out"
            aria-label="Save"
            title="Save"
          >
            <CircleCheckBig className="mr-2 size-8 text-lime-700 dark:text-lime-400" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-5">
          <h2 className="text-sm md:text-[18px] font-semibold"> {title} </h2>
          <Button
            variant={"secondary"}
            onClick={() => setShowInput(true)}
            size={"icon"}
            className="flex items-center justify-center bg-transparent hover:bg-transparent shadow-none p-0 rounded-full transition duration-200 ease-in-out"
            aria-label="Edit title"
            title="Edit title"
          >
            <PencilLine className="mr-2 size-5 text-sky-700 dark:text-sky-400" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default InputTitle;
