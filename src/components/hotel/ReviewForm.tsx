import React, { useState, useRef } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addReview } from '../../store/slices/hotelSlice';
import { CiCamera, CiTrash } from "react-icons/ci";

interface ReviewFormData {
  rating: number;
  title: string;
  comment: string;
  userName: string;
  userId?: string;
  photos: File[];
}

interface ReviewFormProps {
  onBack?: () => void;
  onSubmit?: (reviewData: any) => Promise<void>;
  isSubmitting?: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onBack, onSubmit, isSubmitting = false }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    title: '',
    comment: '',
    userName: 'Current User',
    userId: 'current_user_' + Date.now(),
    photos: []
  });

  const [hoverRating, setHoverRating] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localIsSubmitting, setLocalIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.rating === 0) {
      alert('Please select a rating');
      return;
    }

    if (!formData.comment.trim()) {
      alert('Please fill in your review');
      return;
    }

    setLocalIsSubmitting(true);
    
    try {
      // تحضير البيانات للإرسال
      const reviewData = {
        rating: formData.rating,
        title: formData.title || `Review ${new Date().toLocaleDateString()}`,
        comment: formData.comment,
        userName: formData.userName,
        userId: formData.userId,
      };

      // إذا كان هناك callback للباك-إند
      if (onSubmit) {
        await onSubmit(reviewData);
      } else {
        // استخدام Redux فقط (حالة افتراضية)
        dispatch(addReview({
          rating: formData.rating,
          title: formData.title || `Review ${new Date().toLocaleDateString()}`,
          comment: formData.comment,
          userName: formData.userName,
          userId: formData.userId,
        }));
      }
      
      // Reset form
      setFormData({
        rating: 0,
        title: '',
        comment: '',
        userName: 'Current User',
        userId: 'current_user_' + Date.now(),
        photos: []
      });
      
      alert('Review submitted successfully!');
      
      // العودة إلى صفحة التقييمات
      if (onBack) {
        onBack();
      }
      
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setLocalIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newPhotos = Array.from(files);
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos]
      }));
    }
  };

  const handleRemovePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const submitting = isSubmitting || localIsSubmitting;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          Your Own Rating Of This Product
        </h3>
        {onBack && (
          <button
            onClick={onBack}
            className="text-sm text-gray-600 hover:text-blue-600"
            disabled={submitting}
          >
            ← Back to Reviews
          </button>
        )}
      </div>

      <div className="mb-6">
        <div className="flex justify-center space-x-2 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-3xl focus:outline-none transition-transform hover:scale-110 disabled:opacity-50"
              disabled={submitting}
            >
              <span
                className={
                  star <= (hoverRating || formData.rating)
                    ? 'text-yellow-500'
                    : 'text-gray-300'
                }
              >
                ★
              </span>
            </button>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500">
          {formData.rating === 0 ? 'Select a rating' : `${formData.rating}.0 stars`}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Review Title (Optional)
          </label>
          <input
            type="text"
            name="title"
            placeholder="Give your review a title..."
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
            disabled={submitting}
          />
          
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Detailed Review
          </label>
          <textarea
            name="comment"
            placeholder="Share your experience with this hotel..."
            value={formData.comment}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={submitting}
          />
        </div>

        {/* عرض الصور المضافة */}
        {formData.photos.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Added Photos:</p>
            <div className="flex flex-wrap gap-3">
              {formData.photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <div className="w-20 h-20 border rounded-lg overflow-hidden">
                    <img 
                      src={URL.createObjectURL(photo)} 
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    disabled={submitting}
                  >
                    <CiTrash className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          multiple
          className="hidden"
          disabled={submitting}
        />

        {/* Buttons Row */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
          <button
            type="button"
            onClick={handleAddPhoto}
            className="flex items-center px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
            disabled={submitting}
          >
            <CiCamera className="h-5 w-5 mr-2" />
            <span>Add Photo</span>
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              disabled={submitting}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;