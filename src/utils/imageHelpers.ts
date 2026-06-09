export function validateImage(file: File) {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  const minSize = 10 * 1024; // 10KB

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Only JPG, PNG, GIF, or WEBP images are allowed.' };
  }

  if (file.size < minSize) {
    return { isValid: false, error: 'Image is too small. Minimum size is 10KB.' };
  }

  if (file.size > maxSize) {
    return { isValid: false, error: 'Image is too large. Maximum size is 5MB.' };
  }

  return { isValid: true };
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Unable to read file as base64.'));
      }
    };

    reader.onerror = () => reject(new Error('File reading failed'));
    reader.readAsDataURL(file);
  });
}

export function formatFileSize(size: number) {
  if (size < 1024) return `${size} bytes`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}











