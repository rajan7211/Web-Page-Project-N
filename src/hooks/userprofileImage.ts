import { useState, useCallback, useEffect } from 'react';
import {
  validateImage,
  fileToBase64,
  getImageDimensions,
  isValidBase64Image,
} from '@/utils/imageValidator';
import {
  getProfileImageFromStorage,
  saveProfileImageToStorage,
  removeProfileImageFromStorage,
  getProfileImageMetadata,
  ProfileImageMetadata,
} from '@/utils/storageManager';

export interface UseProfileImageReturn {
  currentImage: string | null;
  previewImage: string | null;
  isLoading: boolean;
  error: string | null;
  metadata: ProfileImageMetadata | null;
  handleFileSelect: (file: File) => Promise<void>;
  handleSaveImage: (file: File, previewBase64: string) => Promise<boolean>;
  handleRemoveImage: () => Promise<boolean>;
  resetPreview: () => void;
}


//   Custom hook for managing profile image

export const useProfileImage = (): UseProfileImageReturn => {
  const [currentImage, setCurrentImage] = useState<string | null>(
    () => getProfileImageFromStorage()
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<ProfileImageMetadata | null>(
    () => getProfileImageMetadata()
  );

  // Load image on mount
  useEffect(() => {
    setCurrentImage(getProfileImageFromStorage());
    setMetadata(getProfileImageMetadata());
  }, []);

//    Handle file selection
 
  const handleFileSelect = useCallback(async (file: File) => {
    setError(null);

    const validation = validateImage(file);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid image');
      return;
    }

    try {
      setIsLoading(true);
      const base64 = await fileToBase64(file);

      if (!isValidBase64Image(base64)) {
        setError('Failed to process image');
        return;
      }

      setPreviewImage(base64);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process image');
    } finally {
      setIsLoading(false);
    }
  }, []);


//    Handle save image

  const handleSaveImage = useCallback(
    async (file: File, previewBase64: string): Promise<boolean> => {
      try {
        setIsLoading(true);

        const dimensions = await getImageDimensions(file);
        const newMetadata: ProfileImageMetadata = {
          filename: file.name,
          uploadedAt: new Date().toISOString(),
          size: file.size,
          dimensions,
        };

        const saved = saveProfileImageToStorage(previewBase64, newMetadata);

        if (saved) {
          setCurrentImage(previewBase64);
          setPreviewImage(null);
          setMetadata(newMetadata);
          setError(null);
          return true;
        }

        return false;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save image');
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );


    // Handle remove image
 
  const handleRemoveImage = useCallback(async (): Promise<boolean> => {
    try {
      setIsLoading(true);

      const removed = removeProfileImageFromStorage();

      if (removed) {
        setCurrentImage(null);
        setPreviewImage(null);
        setMetadata(null);
        setError(null);
        return true;
      }

      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove image');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);


    // Reset preview
 
  const resetPreview = useCallback(() => {
    setPreviewImage(null);
    setError(null);
  }, []);

  return {
    currentImage,
    previewImage,
    isLoading,
    error,
    metadata,
    handleFileSelect,
    handleSaveImage,
    handleRemoveImage,
    resetPreview,
  };
};








