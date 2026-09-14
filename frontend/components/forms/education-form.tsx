import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CVData } from '@/types/cv'
import React, { useEffect, useState } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import ProfileImageUpload from '../ui/profile-image-upload';
import { Control, useForm } from "react-hook-form";
import { educationSchema } from "@/types/userSchema";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Separator } from "../ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Check, Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

interface EducationFormProps {
    educationData: CVData["education"];
    updateArrayItem: (index: number, key: string, value: any) => void;
    addArrayItem: (newItem: any) => void;
    removeArrayItem: (index: number) => void;
}
const EducationForm = ({ educationData, updateArrayItem, addArrayItem, removeArrayItem }: EducationFormProps) => {
    const [openEndDates, setOpenEndDates] = useState<{ [key: number]: boolean }>({});
    const [openStartDates, setOpenStartDates] = useState<{ [key: number]: boolean }>({});

    const [startYearInputValues, setStartYearInputValues] = useState<{ [key: number]: string }>({});
    const [endYearInputValues, setEndYearInputValues] = useState<{ [key: number]: string }>({});

    const form = useForm<{ education: z.infer<typeof educationSchema>[] }>({
        resolver: zodResolver(z.object({ education: z.array(educationSchema) })),
        defaultValues: {
            education: educationData.map(education => ({
                degree: education.degree ?? "",
                institution: education.university ?? "",
                startDate: education.startDate ? new Date(education.startDate) : undefined,
                endDate: education.endDate ? new Date(education.endDate) : undefined,
            }))
        },
    });

    const handleStartYearInputChange = (index: number, value: string) => {
        setStartYearInputValues(prev => ({ ...prev, [index]: value }));
    };
    const handleEndYearInputChange = (index: number, value: string) => {
        setEndYearInputValues(prev => ({ ...prev, [index]: value }));
    };

    const handleStartDateOpenChange = (index: number, open: boolean) => {
        setOpenStartDates(prev => ({ ...prev, [index]: open }));
    };
    const handleEndDateOpenChange = (index: number, open: boolean) => {
        setOpenEndDates(prev => ({ ...prev, [index]: open }));
    };

    useEffect(() => {
        if (educationData) {
            form.reset({
                education: educationData.map(education => ({
                    degree: education.degree ?? "",
                    institution: education.university ?? "",
                    startDate: education.startDate ? new Date(education.startDate) : undefined,
                    endDate: education.endDate ? new Date(education.endDate) : undefined,
                }))
            });
        }
    }, [educationData]);

    return (
        <div className="px-5 pt-5">
            <h2 className="text-lg lg:text-2xl font-semibold">Education</h2>
            <Separator className="my-4" />
            <div className="mb-6">
                <Form {...form}>
                    <form>
                        {educationData.map((_education, index) => (
                            <div key={index}>
                                <div className="flex flex-col gap-3 p-4 border border-slate-200 rounded-sm relative">
                                    {/* Rest of your form fields */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor={`education.${index}.degree`}>Degree</Label>
                                            <FormField
                                                control={form.control}
                                                name={`education.${index}.degree`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                type="text"
                                                                placeholder={`Degree name ${index + 1}`}
                                                                className="shadow-none"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor={`education.${index}.institution`}>Institution</Label>
                                            <FormField
                                                control={form.control}
                                                name={`education.${index}.institution`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                type="text"
                                                                placeholder={`Institution name ${index + 1}`}
                                                                className="shadow-none"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor={`education.${index}.startDate`}>Start Date</Label>
                                            <FormField
                                                control={form.control}
                                                name={`education.${index}.startDate`}
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <Popover
                                                            open={openStartDates[index]}
                                                            onOpenChange={(open) => handleStartDateOpenChange(index, open)}
                                                        >
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant={"secondary"}
                                                                        role="combobox"
                                                                        aria-expanded={openStartDates[index]}
                                                                        className={cn(
                                                                            "w-full justify-between",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                    >
                                                                        {field.value ? formatDate(field.value) : <span>Pick a date</span>}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-full p-0" align="start">
                                                                <div className="flex items-center border-b p-2">
                                                                    <Popover>
                                                                        <PopoverTrigger asChild>
                                                                            <Button
                                                                                variant="secondary"
                                                                                className={cn(
                                                                                    "w-full justify-start text-left font-normal",
                                                                                    !field.value && "text-muted-foreground"
                                                                                )}
                                                                            >
                                                                                <span>
                                                                                    {field.value
                                                                                        ? new Date(field.value).getFullYear()
                                                                                        : "Select year"}
                                                                                </span>
                                                                            </Button>
                                                                        </PopoverTrigger>
                                                                        <PopoverContent className="w-full p-0">
                                                                            <Command>
                                                                                <CommandInput
                                                                                    placeholder="Search year..."
                                                                                    className="h-9"
                                                                                    value={startYearInputValues[index] || (field.value ? new Date(field.value).getFullYear().toString() : "")}
                                                                                    onValueChange={(value) => {
                                                                                        handleStartYearInputChange(index, value);
                                                                                        if (value && !isNaN(parseInt(value))) {
                                                                                            const currentDate = field.value ? new Date(field.value) : new Date();
                                                                                            const newDate = new Date(
                                                                                                parseInt(value),
                                                                                                currentDate.getMonth(),
                                                                                                1
                                                                                            );
                                                                                            field.onChange(newDate);
                                                                                            updateArrayItem(index, "startDate", newDate);
                                                                                        }
                                                                                    }}
                                                                                />
                                                                                <CommandList>
                                                                                    <CommandEmpty>No year found.</CommandEmpty>
                                                                                    <CommandGroup>
                                                                                        {generateYearOptions().map((year) => (
                                                                                            <CommandItem
                                                                                                key={year}
                                                                                                value={year.toString()}
                                                                                                onSelect={(value) => {
                                                                                                    const currentDate = field.value ? new Date(field.value) : new Date();
                                                                                                    const newDate = new Date(
                                                                                                        parseInt(value),
                                                                                                        currentDate.getMonth(),
                                                                                                        1
                                                                                                    );
                                                                                                    field.onChange(newDate);
                                                                                                    updateArrayItem(index, "startDate", newDate);
                                                                                                    handleStartDateOpenChange(index, false);
                                                                                                }}
                                                                                            >
                                                                                                {year}
                                                                                            </CommandItem>
                                                                                        ))}
                                                                                    </CommandGroup>
                                                                                </CommandList>
                                                                            </Command>
                                                                        </PopoverContent>
                                                                    </Popover>
                                                                </div>
                                                                <div className="grid grid-cols-3 gap-2 p-3">
                                                                    {months.map((month, monthIndex) => (
                                                                        <Button
                                                                            key={month}
                                                                            onClick={() => {
                                                                                const currentDate = field.value ? new Date(field.value) : new Date();
                                                                                const newDate = new Date(
                                                                                    currentDate.getFullYear(),
                                                                                    monthIndex,
                                                                                    1
                                                                                );
                                                                                field.onChange(newDate);
                                                                                updateArrayItem(index, "startDate", newDate);
                                                                                handleStartDateOpenChange(index, false);
                                                                            }}
                                                                            variant={field.value && new Date(field.value).getMonth() === monthIndex ? "secondary" : "ghost"}
                                                                            className={cn(
                                                                                "px-4 rounded-full",
                                                                                field.value && new Date(field.value).getMonth() === monthIndex &&
                                                                                "bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 dark:from-cyan-700 dark:via-sky-700 dark:to-blue-700 text-white"
                                                                            )}
                                                                            size={"sm"}
                                                                        >
                                                                            {month.slice(0, 3)}
                                                                        </Button>
                                                                    ))}
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor={`education.${index}.endDate`}>End Date</Label>
                                            <FormField
                                                control={form.control}
                                                name={`education.${index}.endDate`}
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <Popover
                                                            open={openEndDates[index]}
                                                            onOpenChange={(open) => { handleEndDateOpenChange(index, open) }}
                                                        >
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant={"secondary"}
                                                                        role="combobox"
                                                                        aria-expanded={openEndDates[index]}
                                                                        className={cn(
                                                                            "w-full justify-between",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                    >
                                                                        {field.value ? (
                                                                            new Date(field.value).getMonth() === new Date().getMonth() &&
                                                                                new Date(field.value).getFullYear() === new Date().getFullYear()
                                                                                ? "Present"
                                                                                : format(field.value, "MMMM yyyy")
                                                                        ) : (
                                                                            <span>Pick a date</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-full p-0" align="start">
                                                                <div className="flex items-center border-b p-2">
                                                                    <Popover>
                                                                        <PopoverTrigger asChild className="w-full">
                                                                            <Button
                                                                                type="button"
                                                                                variant="secondary"
                                                                                className={cn(
                                                                                    "w-full justify-start text-left font-normal border-none right-0 shadow-none",
                                                                                    !field.value && "text-muted-foreground"
                                                                                )}
                                                                            >
                                                                                <span>
                                                                                    {field.value
                                                                                        ? new Date(field.value).getFullYear()
                                                                                        : "Select year"}
                                                                                </span>
                                                                            </Button>
                                                                        </PopoverTrigger>
                                                                        <PopoverContent className="w-full p-0">
                                                                            <Command>
                                                                                <CommandInput
                                                                                    placeholder="Search year..."
                                                                                    className="h-9"
                                                                                    value={endYearInputValues[index] || (field.value ? new Date(field.value).getFullYear().toString() : "")}
                                                                                    onValueChange={(value) => {
                                                                                        handleEndYearInputChange(index, value);
                                                                                        if (value && !isNaN(parseInt(value))) {
                                                                                            const currentDate = field.value ? new Date(field.value) : new Date();
                                                                                            const newDate = new Date(
                                                                                                parseInt(value),
                                                                                                currentDate.getMonth(),
                                                                                                1
                                                                                            );
                                                                                            field.onChange(newDate);
                                                                                            updateArrayItem(index, "endDate", newDate);
                                                                                        }
                                                                                    }}
                                                                                />
                                                                                <CommandList>
                                                                                    <CommandEmpty>No year found.</CommandEmpty>
                                                                                    <CommandGroup>
                                                                                        {generateYearOptions().map((year) => (
                                                                                            <CommandItem
                                                                                                key={year}
                                                                                                value={year.toString()}
                                                                                                onSelect={(value) => {
                                                                                                    const currentDate = field.value ? new Date(field.value) : new Date();
                                                                                                    const newDate = new Date(
                                                                                                        parseInt(value),
                                                                                                        currentDate.getMonth() || 0,
                                                                                                        1
                                                                                                    );
                                                                                                    field.onChange(newDate);
                                                                                                    updateArrayItem(index, "endDate", newDate);
                                                                                                    handleEndDateOpenChange(index, false);
                                                                                                }}
                                                                                            >
                                                                                                {year}
                                                                                            </CommandItem>
                                                                                        ))}
                                                                                    </CommandGroup>
                                                                                </CommandList>
                                                                            </Command>
                                                                        </PopoverContent>
                                                                    </Popover>
                                                                </div>
                                                                <div className="grid grid-cols-3 gap-2 p-3">
                                                                    {months.map((month, monthIndex) => (
                                                                        <Button
                                                                            key={month}
                                                                            onClick={() => {
                                                                                const currentDate = field.value ? new Date(field.value) : new Date();
                                                                                const newDate = new Date(
                                                                                    currentDate.getFullYear(),
                                                                                    monthIndex,
                                                                                    1
                                                                                );
                                                                                field.onChange(newDate);
                                                                                updateArrayItem(index, "endDate", newDate);
                                                                                handleEndDateOpenChange(index, false);
                                                                            }}
                                                                            variant={field.value && new Date(field.value).getMonth() === monthIndex ? "secondary" : "ghost"}
                                                                            className={cn(
                                                                                "px-4 rounded-full",
                                                                                field.value && new Date(field.value).getMonth() === monthIndex && "bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 dark:from-cyan-700 dark:via-sky-700 dark:to-blue-700 text-white"
                                                                            )}
                                                                            size={"sm"}
                                                                        >
                                                                            {month.slice(0, 3)}
                                                                        </Button>
                                                                    ))}
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    {index > 0 && (
                                        <div className="block top-0 right-0 absolute translate-x-1/2 -translate-y-1/2 shadow-none">
                                            <Button
                                                type="button"
                                                variant={"destructive"}
                                                size={"icon"}
                                                className="rounded-full size-8"
                                                onClick={() => removeArrayItem(index)}
                                            >
                                                <Trash2 size={4} />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <Separator className={cn(
                                    "my-6",
                                    index === educationData.length - 1 && "hidden"
                                )} />
                            </div>
                        ))}
                    </form>
                </Form>
            </div>

            {/* Add Education Button */}
            <div className="mt-4">
                <Button
                    onClick={() => addArrayItem(
                        {
                            degree: "",
                            university: "",
                            startDate: "",
                            endDate: "",
                        }
                    )}
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-2 bg-sky-400 hover:bg-sky-500 dark:bg-sky-700 dakr:hover:bg-sky-800 text-white w-full"
                >
                    <Plus className="w-4 h-4" /> Add Education
                </Button>
            </div>
        </div>
    );
};

export default EducationForm;


const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= currentYear - 50; year--) {
        years.push(year);
    }
    return years;
};

const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return format(date, "MMMM yyyy");
};
