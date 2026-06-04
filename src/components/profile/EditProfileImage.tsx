import { useState, useRef, useCallback } from 'react';
import { FiCamera, FiX, FiCheck, FiUpload, FiTrash2, FiAlertCircle } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'react-toastify';
import ConfirmModal from '@/components/ui/ConfirmModal';
import {
  validateImage,
  fileToBase64,
  getImageDimensions,
  formatFileSize,
  isValidBase64Image,
} from '@/utils/imageValidator';
import {
  getProfileImageFromStorage,
  saveProfileImageToStorage,
  removeProfileImageFromStorage,
} from '@/utils/storageManager';

interface EditProfileImageProps {
  userName: string;
  userInitial: string;
  onImageUpdate?: (base64Image: string | null) => void;
}

export default function EditProfileImage({
  userName,
  userInitial,
  onImageUpdate,
}: EditProfileImageProps) {
  // State management
  const [currentImage, setCurrentImage] = useState<string | null>(
    () => getProfileImageFromStorage()
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Modal state
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

 
//    Handle file selection from input

  const handleFileSelect = useCallback(async (file: File) => {
    setError(null);

    // Validate image
    const validation = validateImage(file);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid image file');
      toast.error(validation.error || 'Invalid image file');
      return;
    }

    try {
      setIsLoading(true);

      // Convert to base64
      const base64 = await fileToBase64(file);

      // Validate base64
      if (!isValidBase64Image(base64)) {
        setError('Failed to process image. Please try another file.');
        toast.error('Failed to process image. Please try another file.');
        return;
      }

      // Get image dimensions
      const dimensions = await getImageDimensions(file);

      // Set preview
      setPreviewImage(base64);
      setSelectedFile(file);
      setIsEditing(true);

      // Log info
      console.log(
        `Image selected: ${file.name} (${formatFileSize(file.size)}) - ${dimensions.width}x${dimensions.height}px`
      );

      toast.info(`Image preview ready (${formatFileSize(file.size)})`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to process image';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Image processing error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

    // Handle input change event

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

    // Handle drag and drop

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };


//    Save profile image
  const handleSaveImage = useCallback(async () => {
    if (!previewImage || !selectedFile) {
      setError('No image selected');
      return;
    }

    try {
      setIsLoading(true);

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Prepare metadata
      const metadata = {
        filename: selectedFile.name,
        uploadedAt: new Date().toISOString(),
        size: selectedFile.size,
        dimensions: await getImageDimensions(selectedFile),
      };

      // Save to localStorage
      const saved = saveProfileImageToStorage(previewImage, metadata);

      if (saved) {
        setCurrentImage(previewImage);
        setPreviewImage(null);
        setIsEditing(false);
        setSelectedFile(null);
        setError(null);

        // Notify parent
        onImageUpdate?.(previewImage);

        toast.success('Profile image updated successfully.', {
          position: 'top-right',
          autoClose: 2000,
        });
      } else {
        throw new Error('Failed to save image to storage');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save image';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Save error:', error);
    } finally {
      setIsLoading(false);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [previewImage, selectedFile, onImageUpdate]);

    //   Cancel editing

  const handleCancelEdit = useCallback(() => {
    setPreviewImage(null);
    setIsEditing(false);
    setSelectedFile(null);
    setError(null);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    toast.info('Image selection cancelled');
  }, []);

 
    // Confirm remove image
  const handleConfirmRemove = useCallback(async () => {
    try {
      setIsLoading(true);

      // Remove from localStorage
      const removed = removeProfileImageFromStorage();

      if (removed) {
        setCurrentImage(null);
        setPreviewImage(null);
        setIsEditing(false);
        setSelectedFile(null);
        setError(null);
        setShowRemoveConfirm(false);

        // Notify parent
        onImageUpdate?.(null);

        toast.success('Profile image removed successfully.', {
          position: 'top-right',
          autoClose: 2000,
        });
      } else {
        throw new Error('Failed to remove image from storage');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove image';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Remove error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [onImageUpdate]);

  
//    Trigger file input click
  const handleCameraClick = useCallback(() => {
    if (!isLoading) {
      fileInputRef.current?.click();
    }
  }, [isLoading]);

  return (
    <>
      <div className="w-full max-w-sm mx-auto space-y-6">
        {/* Avatar Container */}
        <div className="relative flex justify-center">
          {/* Avatar */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="relative group cursor-pointer"
          >
            <Avatar className="h-40 w-40 border-4 border-white shadow-2xl ring-4 ring-blue-400/50">
              {currentImage || previewImage ? (
                <AvatarImage
                  src={previewImage || currentImage || ''}
                  alt={userName}
                  className="object-cover"
                />
              ) : null}
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-5xl font-bold">
                {userInitial}
              </AvatarFallback>
            </Avatar>

            {/* Camera Icon Overlay */}
            <button
              onClick={handleCameraClick}
              disabled={isLoading}
              className={`absolute bottom-0 right-0 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg flex items-center justify-center transition-all duration-200 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'group-hover:scale-110'
              }`}
              title="Click to change profile image"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FiCamera className="h-6 w-6 text-white" />
              )}
            </button>

            {/* Current Image Indicator */}
            {currentImage && !previewImage && (
              <div className="absolute top-0 right-0 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <FiCheck className="h-3 w-3 text-white" />
              </div>
            )}

            {/* Preview Indicator */}
            {previewImage && (
              <div className="absolute top-0 right-0 w-5 h-5 bg-orange-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse">
                <FiUpload className="h-3 w-3 text-white" />
              </div>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleInputChange}
            disabled={isLoading}
            className="hidden"
            aria-label="Upload profile image"
          />
        </div>

        {/* User Info */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-slate-900">{userName}</h3>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 flex gap-3">
            <FiAlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Edit Mode - Preview */}
        {isEditing && previewImage && (
          <div className="space-y-4">
            {/* Preview Label */}
            <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
              <p className="text-sm font-semibold text-blue-900 flex items-center gap-2">
                <FiUpload className="h-4 w-4" />
                New Image Preview
              </p>
              <p className="text-xs text-blue-700 mt-1">
                {selectedFile
                  ? `${selectedFile.name} (${formatFileSize(selectedFile.size)})`
                  : 'Preview ready'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleSaveImage}
                disabled={isLoading}
                className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
              >
                <FiCheck className="h-4 w-4" />
                {isLoading ? 'Saving...' : 'Save Image'}
              </Button>
              <Button
                onClick={handleCancelEdit}
                disabled={isLoading}
                variant="outline"
                className="flex-1 gap-2 rounded-xl"
              >
                <FiX className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* View Mode - Actions */}
        {!isEditing && (
          <div className="space-y-3">
            {/* Change Image Button */}
            <Button
              onClick={handleCameraClick}
              disabled={isLoading}
              className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
            >
              <FiCamera className="h-4 w-4" />
              {currentImage ? 'Change Picture' : 'Upload Picture'}
            </Button>

            {/* Remove Image Button (only if image exists) */}
            {currentImage && (
              <Button
                onClick={() => setShowRemoveConfirm(true)}
                disabled={isLoading}
                className="w-full gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl"
              >
                <FiTrash2 className="h-4 w-4" />
                Remove Picture
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Confirmation Modal for Remove */}
      <ConfirmModal
        isOpen={showRemoveConfirm}
        title="Remove Profile Image?"
        message="Are you sure you want to remove your profile image? This action cannot be undone and your profile will show the default avatar instead."
        confirmText="Remove"
        cancelText="Keep It"
        isDangerous={true}
        isLoading={isLoading}
        onConfirm={handleConfirmRemove}
        onCancel={() => setShowRemoveConfirm(false)}
      />
    </>
  );
}









