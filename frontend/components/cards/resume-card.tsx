import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { FilePenLine } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

interface ResumeCardProps {
  imgUrl: string | null;
  title: string;
  lastUpdated: string;
  onSelect?: () => void;
}

const ResumeCard = ({ imgUrl, title, lastUpdated, onSelect }: ResumeCardProps) => {
  const isValidImageUrl = imgUrl && (imgUrl.startsWith("http://") || imgUrl.startsWith("https://"));

  return (
    <Card className="group rounded-2xl overflow-hidden border border-border/70 bg-card/60 backdrop-blur-md shadow-md transition-all duration-300 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-950/20 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 overflow-hidden">
          {isValidImageUrl ? (
            <Image
              src={imgUrl}
              alt={title}
              fill
              className="object-cover"
              priority={false}
            />
          ) : (
            <div className="w-full h-full p-4 flex flex-col justify-between opacity-50 group-hover:opacity-80 transition-opacity">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/30 border border-cyan-400/40 shrink-0" />
                  <div className="space-y-1 flex-1">
                    <div className="h-1.5 w-3/4 rounded bg-slate-200" />
                    <div className="h-1 w-1/2 rounded bg-cyan-400" />
                  </div>
                </div>
                <div className="h-1 w-full rounded bg-slate-400/30" />
                <div className="h-1 w-5/6 rounded bg-slate-400/20" />
                <div className="h-1 w-4/5 rounded bg-slate-400/20" />
              </div>
              <div className="text-center">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                  Preview Ready
                </span>
              </div>
            </div>
          )}

          {/* Edit button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm p-4">
            <Button
              onClick={onSelect}
              size="sm"
              className="brand-gradient-btn rounded-full text-xs font-semibold shadow-lg shadow-cyan-500/20"
            >
              <FilePenLine className="w-3.5 h-3.5 mr-1.5" />
              Edit Resume
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start justify-center p-3 space-y-1">
        <p className="text-sm text-foreground font-bold line-clamp-1 group-hover:text-cyan-400 transition-colors">
          {title}
        </p>
        <span className="text-[11px] text-muted-foreground">Updated: {lastUpdated || "Recently"}</span>
      </CardFooter>
    </Card>
  );
};

export default ResumeCard;