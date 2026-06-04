// src/components/ui/ImageUpload.tsx

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { FiUpload, FiX, FiImage, FiCheck } from 'react-icons/fi';
import { Button } from './button';
import { validateImage, fileToBase64, formatFileSize } from '@/utils/imageHelpers';
import { toast } from 'react-toastify';

interface ImageUploadProps {
  currentImage?: string | null;
  onImageChange: (base64Image: string | null) => void;
  disabled?: boolean;
}

export default function ImageUpload({
  currentImage,
  onImageChange,
  disabled = false,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(currentImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await processFile(files[0]);
    }
  };

  const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await processFile(files[0]);
    }
  };

  const processFile = async (file: File) => {
    // Validate image
    const validation = validateImage(file);
    if (!validation.isValid) {
      toast.error(validation.error || 'Invalid image');
      return;
    }

    try {
      setIsUploading(true);

      // Convert to base64
      const base64 = await fileToBase64(file);

      // Set preview
      setPreviewImage(base64);

      // Notify parent component
      onImageChange(base64);

      toast.success(`Image uploaded successfully! (${formatFileSize(file.size)})`);
    } catch (error) {
      toast.error('Failed to upload image. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info('Image removed');
  };

  const handleBrowseClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-4">
      {/* Preview Section */}
      {previewImage && (
        <div className="relative w-32 h-32 mx-auto">
          <img
            src={previewImage}
            alt="Preview"
            className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg ring-2 ring-slate-200"
          />
          {!disabled && (
            <Button
              type="button"
              size="icon"
              variant="destructive"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 h-8 w-8 rounded-full shadow-lg"
            >
              <FiX className="h-4 w-4" />
            </Button>
          )}
          <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
            <FiCheck className="h-4 w-4 text-white" />
          </div>
        </div>
      )}

      {/* Upload Zone */}
      {!previewImage && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-blue-500 bg-blue-50 scale-105'
              : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${
            isUploading ? 'pointer-events-none' : ''
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            onChange={handleFileInput}
            disabled={disabled || isUploading}
            className="hidden"
          />

          <div className="space-y-4">
            {/* Icon */}
            <div className="flex justify-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  isDragging
                    ? 'bg-blue-100 scale-110'
                    : 'bg-slate-100'
                }`}
              >
                {isUploading ? (
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FiImage className={`h-8 w-8 ${isDragging ? 'text-blue-600' : 'text-slate-400'}`} />
                )}
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="text-sm font-semibold text-slate-900 mb-1">
                {isUploading ? 'Uploading...' : isDragging ? 'Drop image here' : 'Upload Profile Picture'}
              </p>
              <p className="text-xs text-slate-500">
                Drag & drop or click to browse
              </p>
            </div>

            {/* Upload Button */}
            {!isUploading && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2 pointer-events-none"
              >
                <FiUpload className="h-4 w-4" />
                Choose File
              </Button>
            )}

            {/* Requirements */}
            <div className="pt-3 border-t border-slate-200">
              <p className="text-xs text-slate-400">
                JPG, PNG, GIF or WEBP • 10KB - 5MB
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Change Image Button (when preview exists) */}
      {previewImage && !disabled && (
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleBrowseClick}
            disabled={isUploading}
            className="gap-2"
          >
            <FiUpload className="h-4 w-4" />
            Change Picture
          </Button>
        </div>
      )}
    </div>
  );
}





