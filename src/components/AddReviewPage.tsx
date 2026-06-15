import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { PageHeader } from './PageHeader';

interface AddReviewPageProps {
  onBack: () => void;
}

export function AddReviewPage({ onBack }: AddReviewPageProps) {
  const { user, isAuthenticated } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!isAuthenticated || !user) {
      setError('يجب تسجيل الدخول لإضافة مراجعة');
      return;
    }

    if (rating === 0) {
      setError('يرجى اختيار تقييم');
      return;
    }

    if (!comment.trim() || comment.trim().length < 10) {
      setError('يرجى كتابة تعليق (10 أحرف على الأقل)');
      return;
    }

    // إنشاء المراجعة الجديدة
    const newReview = {
      id: Date.now(),
      name: user.name,
      role: `طالب جيل ${user.generation}`,
      rating: rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString('ar-JO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      avatar: getInitials(user.name)
    };

    // حفظ في localStorage
    const savedReviews = localStorage.getItem('reviews');
    const reviews = savedReviews ? JSON.parse(savedReviews) : [];
    reviews.unshift(newReview); // إضافة في البداية
    localStorage.setItem('reviews', JSON.stringify(reviews));

    setSuccess(true);
    setRating(0);
    setComment('');

    // الرجوع للصفحة الرئيسية بعد 2 ثانية
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  const getInitials = (name: string) => {
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    } else if (words.length === 1 && words[0].length >= 2) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Page Header */}
      <PageHeader
        title="شارك تجربتك"
        breadcrumb="إضافة مراجعة"
        onBack={onBack}
        showBreadcrumb={true}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 bg-white min-h-screen">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-[5px] p-8 md:p-10 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                أضف تقييمك
              </h2>
              <p className="text-gray-600 text-sm mb-8">
                شاركنا رأيك وساعد الطلاب الآخرين في اتخاذ القرار الصحيح
              </p>

              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-emerald-50 text-emerald-600 rounded-lg text-sm flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">تم إضافة مراجعتك بنجاح!</p>
                    <p className="text-xs text-emerald-600/80 mt-1">
                      شكراً لمشاركتك، سيتم تحويلك تلقائياً...
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-start gap-2"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    التقييم
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-10 h-10 transition-colors ${
                            star <= (hoveredRating || rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-gray-200 text-gray-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-sm text-gray-600 mt-2">
                      {rating === 5 && 'ممتاز! 🌟'}
                      {rating === 4 && 'جيد جداً! 👍'}
                      {rating === 3 && 'جيد 👌'}
                      {rating === 2 && 'مقبول'}
                      {rating === 1 && 'يحتاج تحسين'}
                    </p>
                  )}
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    تعليقك
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
                    placeholder="شاركنا تجربتك مع الدكتور خالد الدعجة والمنصة التعليمية... (10 أحرف على الأقل)"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {comment.length} / 500 حرف
                  </p>
                </div>

                {/* User Info Display */}
                {user && (
                  <div className="bg-gray-50 rounded-[5px] p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">
                      سيتم نشر المراجعة باسم:
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {getInitials(user.name)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-600">
                          طالب جيل {user.generation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={success}
                  className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-[5px] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-2 -right-2 w-16 h-16 border border-white/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="absolute -bottom-1 -left-1 w-12 h-12 border border-white/15 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                  </div>
                  <span className="relative z-10">نشر المراجعة</span>
                  <Send className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Cancel Button */}
                <button
                  type="button"
                  onClick={onBack}
                  className="w-full py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  إلغاء
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
