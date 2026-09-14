"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ZoomIn, ZoomOut, Move, RotateCcw, Trash2, Check, Sparkles } from "lucide-react";

interface ImageCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  initialCrop?: { x: number; y: number; zoom: number };
  onApply: (
    croppedDataUrl: string,
    cropData: { x: number; y: number; zoom: number }
  ) => void;
  onRemovePhoto?: () => void;
}

export default function ImageCropModal({
  isOpen,
  onClose,
  imageSrc,
  initialCrop,
  onApply,
  onRemovePhoto,
}: ImageCropModalProps) {
  const [zoom, setZoom] = useState(initialCrop?.zoom || 1);
  const [position, setPosition] = useState({
    x: initialCrop?.x || 0,
    y: initialCrop?.y || 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Load image
  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      imgRef.current = img;
      renderPreview();
    };
  }, [imageSrc]);

  // Reset when opening with initial crop
  useEffect(() => {
    if (isOpen) {
      setZoom(initialCrop?.zoom || 1);
      setPosition({
        x: initialCrop?.x || 0,
        y: initialCrop?.y || 0,
      });
    }
  }, [isOpen, initialCrop]);

  const renderPreview = useCallback(() => {
    const canvas = previewCanvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width; // 240
    ctx.clearRect(0, 0, size, size);

    // Save state
    ctx.save();

    // Clip to circle for preview
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Calculate aspect ratio fit
    const imgAspect = img.width / img.height;
    let drawWidth: number;
    let drawHeight: number;

    if (imgAspect > 1) {
      // Landscape
      drawHeight = size * zoom;
      drawWidth = drawHeight * imgAspect;
    } else {
      // Portrait or square
      drawWidth = size * zoom;
      drawHeight = drawWidth / imgAspect;
    }

    // Centered base position + offset
    const drawX = (size - drawWidth) / 2 + position.x;
    const drawY = (size - drawHeight) / 2 + position.y;

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    ctx.restore();
  }, [zoom, position]);

  useEffect(() => {
    renderPreview();
  }, [renderPreview]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  // Generate clean export crop
  const handleSaveCrop = () => {
    const img = imgRef.current;
    if (!img) return;

    // High resolution output canvas (400x400 for crisp printable quality)
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = 400;
    exportCanvas.height = 400;
    const ctx = exportCanvas.getContext("2d");
    if (!ctx) return;

    const size = 400;
    const scaleFactor = size / 240; // Relative to preview canvas

    ctx.save();
    // Circular clip for clean avatar
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    const imgAspect = img.width / img.height;
    let drawWidth: number;
    let drawHeight: number;

    if (imgAspect > 1) {
      drawHeight = size * zoom;
      drawWidth = drawHeight * imgAspect;
    } else {
      drawWidth = size * zoom;
      drawHeight = drawWidth / imgAspect;
    }

    const drawX = (size - drawWidth) / 2 + position.x * scaleFactor;
    const drawY = (size - drawHeight) / 2 + position.y * scaleFactor;

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    ctx.restore();

    const croppedDataUrl = exportCanvas.toDataURL("image/png");
    onApply(croppedDataUrl, { x: position.x, y: position.y, zoom });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-border/80 text-slate-100 shadow-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-bold text-cyan-400">
            <Move className="w-4 h-4" /> Position & Crop Profile Photo
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Drag photo inside the circle to center your face. Use the zoom slider to adjust frame.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-4 space-y-5">
          {/* Interactive Crop Viewport */}
          <div
            className="relative w-[240px] h-[240px] rounded-full overflow-hidden border-4 border-cyan-400/80 shadow-2xl shadow-cyan-500/20 bg-slate-950 cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            <canvas
              ref={previewCanvasRef}
              width={240}
              height={240}
              className="w-full h-full pointer-events-none"
            />
            {/* Overlay guideline grid */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
              <div className="w-full h-0.5 border-t border-dashed border-cyan-300" />
              <div className="absolute h-full w-0.5 border-l border-dashed border-cyan-300" />
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
            <Move className="w-3 h-3 text-cyan-400" /> Click and drag to reposition face
          </p>

          {/* Zoom Slider */}
          <div className="w-full px-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <ZoomIn className="w-3.5 h-3.5 text-cyan-400" /> Zoom Level
              </span>
              <span className="font-mono text-cyan-300 font-semibold">{Math.round(zoom * 100)}%</span>
            </div>
            <div className="flex items-center gap-3">
              <ZoomOut className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type="range"
                min="1"
                max="3"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <ZoomIn className="w-4 h-4 text-muted-foreground shrink-0" />
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-border/60 pt-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
            </Button>
            {onRemovePhoto && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  onRemovePhoto();
                  onClose();
                }}
                className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleSaveCrop}
              className="brand-gradient-btn text-xs rounded-xl font-semibold shadow-md shadow-cyan-500/20"
            >
              <Check className="w-3.5 h-3.5 mr-1" /> Apply Crop
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

