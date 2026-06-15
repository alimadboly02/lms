import { motion } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface Review {
  id: number;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

// بيانات المراجعات الافتراضية
const defaultReviews: Review[] = [
  {
    id: 1,
    name: 'أحمد محمد',
    role: 'طالب جيل 2008',
    rating: 5,
    comment: 'الدكتور خالد مدرس ممتاز! شرحه واضح ومفصل، والمواد التعليمية منظمة بشكل رائع. استفدت كثيراً من الدروس والاختبارات.',
    date: '15 يناير 2026',
    avatar: 'أم'
  },
  {
    id: 2,
    name: 'سارة أحمد',
    role: 'طالبة جيل 2009',
    rating: 5,
    comment: 'المنصة رائعة جداً! الامتحانات التجريبية ساعدتني كثير في التحضير، والمراجعات شاملة ومفيدة جداً.',
    date: '10 يناير 2026',
    avatar: 'سأ'
  },
  {
    id: 3,
    name: 'يوسف خالد',
    role: 'طالب جيل 2008',
    rating: 4,
    comment: 'محتوى تعليمي ممتاز ومنظم. التسجيلات الصوتية والPDF مفيدة جداً. أنصح كل طالب توجيهي بالانضمام.',
    date: '5 يناير 2026',
    avatar: 'يخ'
  },
  {
    id: 4,
    name: 'ليلى حسن',
    role: 'طالبة جيل 2009',
    rating: 5,
    comment: 'أفضل منصة تعليمية! الدكتور خالد يشرح بطريقة سهلة ومفهومة، والتمارين متنوعة وشاملة لكل المنهج.',
    date: '2 يناير 2026',
    avatar: 'لح'
  },
  {
    id: 5,
    name: 'عمر سالم',
    role: 'طالب جيل 2008',
    rating: 5,
    comment: 'المنصة ساعدتني أحسن علامة في الامتحان! الخطط الدراسية واضحة والمحتوى كامل ومرتب بشكل ممتاز.',
    date: '28 ديسمبر 2025',
    avatar: 'عس'
  },
  {
    id: 6,
    name: 'نور الدين',
    role: 'طالب جيل 2009',
    rating: 4,
    comment: 'تجربة رائعة! المحتوى شامل والاختبارات مفيدة جداً. الدكتور خالد معلم محترف ويهتم بالطلاب.',
    date: '20 ديسمبر 2025',
    avatar: 'ند'
  }
];

interface ReviewsSectionProps {
  onAddReviewClick?: () => void;
}

export function ReviewsSection({ onAddReviewClick }: ReviewsSectionProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 2; // عرض مراجعتين في الصفحة

  // جلب المراجعات من localStorage أو استخدام الافتراضية
  const savedReviews = localStorage.getItem('reviews');
  const reviews = savedReviews ? JSON.parse(savedReviews) : defaultReviews;

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full mb-4"
          >
            <Quote className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700 font-semibold text-sm">آراء الطلاب</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            ماذا يقول طلابنا
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            قصص نجاح طلابنا تتحدث عن نفسها. هنا بعض التقييمات من طلابنا الراضين
          </motion.p>
        </div>

        {/* Reviews Container */}
        <div className="max-w-6xl mx-auto mb-8">
          {/* Grid - عرض عنصرين فقط */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews
              .slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage)
              .map((review: Review) => (
                <div
                  key={review.id}
                  className="bg-white border border-gray-200 rounded-[15px] p-6 hover:shadow-lg transition-all"
                >
                  {/* Stars */}
                  <div className="mb-4">{renderStars(review.rating)}</div>

                  {/* Comment */}
                  <p className="text-gray-700 leading-relaxed mb-6 text-base">
                    "{review.comment}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {review.avatar}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{review.name}</h4>
                      <p className="text-sm text-gray-600">{review.role}</p>
                    </div>

                    {/* Quote Icon */}
                    <Quote className="w-10 h-10 text-gray-200 opacity-50" />
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Navigation Controls Below Reviews */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`w-12 h-12 border-2 rounded-full flex items-center justify-center transition-all shadow-lg ${
              currentPage === 0
                ? 'bg-gray-100 border-gray-300 cursor-not-allowed'
                : 'bg-white border-emerald-500 hover:bg-emerald-50'
            }`}
            aria-label="Previous"
          >
            <ChevronRight className={`w-6 h-6 ${currentPage === 0 ? 'text-gray-400' : 'text-emerald-600'}`} />
          </button>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className={`w-12 h-12 border-2 rounded-full flex items-center justify-center transition-all shadow-lg ${
              currentPage === totalPages - 1
                ? 'bg-gray-100 border-gray-300 cursor-not-allowed'
                : 'bg-white border-emerald-500 hover:bg-emerald-50'
            }`}
            aria-label="Next"
          >
            <ChevronLeft className={`w-6 h-6 ${currentPage === totalPages - 1 ? 'text-gray-400' : 'text-emerald-600'}`} />
          </button>
        </div>

        {/* Add Review Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <button
            onClick={onAddReviewClick}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-[5px] transition-all shadow-md hover:shadow-lg relative overflow-hidden group"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-2 -right-2 w-16 h-16 border border-white/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <div className="absolute -bottom-1 -left-1 w-12 h-12 border border-white/15 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            </div>
            <span className="relative z-10">شارك تجربتك معنا</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}