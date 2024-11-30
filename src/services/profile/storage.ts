import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { v4 as uuidv4 } from 'uuid';
import { FileUpload } from '../../types/profile';

const MAX_FILE_SIZES = {
  'image': 10 * 1024 * 1024, // 10MB
  'video': 100 * 1024 * 1024, // 100MB
  'audio': 50 * 1024 * 1024, // 50MB
  'profile': 5 * 1024 * 1024 // 5MB
};

const ALLOWED_FILE_TYPES = {
  'image': ['image/jpeg', 'image/png', 'image/gif'],
  'video': ['video/mp4', 'video/quicktime'],
  'audio': ['audio/mpeg', 'audio/wav'],
  'profile': ['image/jpeg', 'image/png']
};

export const validateFile = (file: File, type: keyof typeof MAX_FILE_SIZES) => {
  if (file.size > MAX_FILE_SIZES[type]) {
    throw new Error(`File size exceeds ${MAX_FILE_SIZES[type] / (1024 * 1024)}MB limit`);
  }

  if (!ALLOWED_FILE_TYPES[type].includes(file.type)) {
    throw new Error(`Invalid file type. Allowed types: ${ALLOWED_FILE_TYPES[type].join(', ')}`);
  }

  return true;
};

export const uploadFile = async (
  file: File,
  userId: string,
  type: keyof typeof MAX_FILE_SIZES,
  onProgress?: (progress: number) => void
): Promise<FileUpload> => {
  try {
    validateFile(file, type);

    const fileId = uuidv4();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${type}s/${userId}/${fileId}.${fileExtension}`;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(progress);
        },
        (error) => {
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          const fileUpload: FileUpload = {
            id: fileId,
            name: file.name,
            type: file.type,
            size: file.size,
            url: downloadURL,
            createdAt: new Date().toISOString(),
            userId
          };

          resolve(fileUpload);
        }
      );
    });
  } catch (error) {
    throw error;
  }
};