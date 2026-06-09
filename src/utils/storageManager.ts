export const STORAGE_KEYS = {
  PROFILE_IMAGE: 'profileImage',
  PROFILE_IMAGE_TIMESTAMP: 'profileImageTimestamp',
  PROFILE_IMAGE_METADATA: 'profileImageMetadata',
} as const;


export interface ProfileImageMetadata {
  filename?: string;
  uploadedAt?: string;
  size?: number;
  dimensions?: {
    width: number;
    height: number;
  };
}


//   Get profile image from localStorage
export const getProfileImageFromStorage = (): string | null => {
  try {
    const image = localStorage.getItem(STORAGE_KEYS.PROFILE_IMAGE);
    return image && image.trim() ? image : null;
  } catch (error) {
    console.error('Error retrieving profile image from storage:', error);
    return null;
  }
};


//   Save profile image to localStorage

export const saveProfileImageToStorage = (
  base64Image: string,
  metadata?: ProfileImageMetadata
): boolean => {
  try {
    // Validate base64 string
    if (!base64Image || typeof base64Image !== 'string') {
      console.error('Invalid base64 image data');
      return false;
    }

    // Store image
    localStorage.setItem(STORAGE_KEYS.PROFILE_IMAGE, base64Image);

    // Store timestamp
    localStorage.setItem(STORAGE_KEYS.PROFILE_IMAGE_TIMESTAMP, new Date().toISOString());

    // Store metadata if provided
    if (metadata) {
      localStorage.setItem(STORAGE_KEYS.PROFILE_IMAGE_METADATA, JSON.stringify(metadata));
    }

    return true;
  } catch (error) {
    console.error('Error saving profile image to storage:', error);
    return false;
  }
};


//   Remove profile image from localStorage
export const removeProfileImageFromStorage = (): boolean => {
  try {
    localStorage.removeItem(STORAGE_KEYS.PROFILE_IMAGE);
    localStorage.removeItem(STORAGE_KEYS.PROFILE_IMAGE_TIMESTAMP);
    localStorage.removeItem(STORAGE_KEYS.PROFILE_IMAGE_METADATA);
    return true;
  } catch (error) {
    console.error('Error removing profile image from storage:', error);
    return false;
  }
};


//   Get profile image metadata from localStorage
export const getProfileImageMetadata = (): ProfileImageMetadata | null => {
  try {
    const metadata = localStorage.getItem(STORAGE_KEYS.PROFILE_IMAGE_METADATA);
    return metadata ? JSON.parse(metadata) : null;
  } catch (error) {
    console.error('Error retrieving profile image metadata:', error);
    return null;
  }
};


//  Get storage size of profile image
export const getProfileImageStorageSize = (): number => {
  try {
    const image = localStorage.getItem(STORAGE_KEYS.PROFILE_IMAGE);
    if (!image) return 0;
    // Estimate size in bytes (rough calculation)
    return new Blob([image]).size;
  } catch (error) {
    console.error('Error calculating storage size:', error);
    return 0;
  }
};


//  Clear all profile-related storage
export const clearProfileStorage = (): boolean => {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing profile storage:', error);
    return false;
  }
};


//   Export profile image as file
export const exportProfileImage = (filename: string = 'profile-image.png'): boolean => {
  try {
    const image = getProfileImageFromStorage();
    if (!image) {
      console.error('No profile image to export');
      return false;
    }

    const link = document.createElement('a');
    link.href = image;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.error('Error exporting profile image:', error);
    return false;
  }
};













