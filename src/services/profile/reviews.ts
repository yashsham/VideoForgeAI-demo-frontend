import { collection, addDoc, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Review } from '../../types/profile';

export const submitReview = async (review: Omit<Review, 'id' | 'status' | 'createdAt'>): Promise<void> => {
  try {
    const reviewData = {
      ...review,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    await addDoc(collection(db, 'reviews'), reviewData);
  } catch (error) {
    throw new Error('Failed to submit review: ' + error);
  }
};

export const getReviews = async (
  page: number = 1,
  perPage: number = 10,
  filters: { rating?: number; status?: string } = {}
): Promise<{ reviews: Review[]; total: number }> => {
  try {
    let reviewQuery = query(
      collection(db, 'reviews'),
      where('status', '==', 'approved')
    );

    if (filters.rating) {
      reviewQuery = query(reviewQuery, where('rating', '==', filters.rating));
    }

    reviewQuery = query(
      reviewQuery,
      orderBy('createdAt', 'desc'),
      limit(perPage)
    );

    const snapshot = await getDocs(reviewQuery);
    const reviews = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Review[];

    // Get total count (in a real app, you'd want to implement proper pagination)
    const total = reviews.length;

    return { reviews, total };
  } catch (error) {
    throw new Error('Failed to fetch reviews: ' + error);
  }
};