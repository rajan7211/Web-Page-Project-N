export const IMAGE_CONFIG = {
  ALLOWED_FORMATS: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  MIN_FILE_SIZE: 1024,
};
export interface ValidationResult {
  isValid: boolean;
  error?: string;
  file?: File;
}


//  Validate image file format
export const validateImageFormat = (file: File): boolean => {
  return IMAGE_CONFIG.ALLOWED_FORMATS.includes(file.type);
};


//  Validate image file size
export const validateImageSize = (file: File): boolean => {
  return file.size <= IMAGE_CONFIG.MAX_FILE_SIZE && file.size >= IMAGE_CONFIG.MIN_FILE_SIZE;
};


//   Get file extension
export const getFileExtension = (filename: string): string => {
  return filename.substring(filename.lastIndexOf('.')).toLowerCase();
};


// Format bytes to readable size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const validateImage = (file: File): ValidationResult => {
  if (!file) {
    return {
      isValid: false,
      error: 'No file selected. Please choose an image file.',
    };
  }

  // Validate format
  if (!validateImageFormat(file)) {
    return {
      isValid: false,
      error: 'Please select a valid image file (JPG, JPEG, PNG, or WEBP).',
    };
  }

  // Validate size
  if (!validateImageSize(file)) {
    if (file.size > IMAGE_CONFIG.MAX_FILE_SIZE) {
      return {
        isValid: false,
        error: `Image size must not exceed ${formatFileSize(IMAGE_CONFIG.MAX_FILE_SIZE)}.`,
      };
    }
    return {
      isValid: false,
      error: 'Image file is too small.',
    };
  }

  return {
    isValid: true,
    file,
  };
};


export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to Base64'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };

    reader.onabort = () => {
      reject(new Error('File reading was aborted'));
    };

    reader.readAsDataURL(file);
  });
};


export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
        });
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };

    reader.readAsDataURL(file);
  });
};


export const isValidBase64Image = (base64String: string): boolean => {
  if (!base64String || typeof base64String !== 'string') {
    return false;
  }

  // Check if it's a valid data URL
  if (!base64String.startsWith('data:image/')) {
    return false;
  }

  try {
    // Try to create an image from the base64 string
    const img = new Image();
    img.src = base64String;
    return true;
  } catch (error) {
    return false;
  }
};







