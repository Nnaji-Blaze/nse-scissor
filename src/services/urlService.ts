import {
  addDoc,
  collection,
  doc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface UrlData {
  originalUrl: string;
  shortUrl: string;
  userId: string;
  createdAt: Date;
  clickCount: number;
}

export const createShortenedUrl = async (
  originalUrl: string,
  userId: string,
) => {
  const shortUrl = generateShortUrl(); // Generate short URL
  const urlData: UrlData = {
    originalUrl,
    shortUrl,
    userId,
    createdAt: new Date(),
    clickCount: 0,
  };

  const docRef = await addDoc(collection(db, 'urls'), urlData);
  return docRef.id; // Return the document ID for tracking
};

// Example URL shortener function (simple hash or random string)
const generateShortUrl = () => {
  return Math.random().toString(36).substring(2, 8);
};

export const trackUrlClick = async (urlId: string) => {
  const urlRef = doc(db, 'urls', urlId);
  await updateDoc(urlRef, {
    clickCount: increment(1),
  });
};
