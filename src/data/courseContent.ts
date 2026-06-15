import { examsAndTestsContent } from './examsContent';
import { pdfContent } from './pdfContent';
import { unitReviewsContent } from './unitReviewsContent';
import { summariesContent } from './summariesContent';
import { audioRecordingsContent } from './audioRecordingsContent';

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  isLocked: boolean;
  type: 'video' | 'pdf' | 'thumbnail-link' | 'exam' | 'audio'; // إضافة نوع التسجيل الصوتي
  videoUrl?: string;
  thumbnailUrl?: string;
  pdfUrl?: string;
  externalLink?: string; // رابط خارجي لليوتيوب
  examData?: ExamData; // بيانات الامتحان
  audioUrl?: string; // رابط التسجيل الصوتي
}

export interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index الإجابة الصحيحة
  explanation: string; // شرح الإجابة الصحيحة
}

export interface ExamData {
  questions: ExamQuestion[];
  passingScore: number; // النسبة المطلوبة للنجاح (70)
  difficulty: 'سهل' | 'متوسط' | 'صعب';
}

export interface Section {
  id: number;
  title: string;
  lessons: Lesson[];
  subsections?: Section[]; // دعم الأقسام الفرعية المتداخلة
}

export interface SubcategoryContent {
  subcategoryId: number;
  subcategoryTitle: string;
  sections: Section[];
}

// محتوى كل subcategory
export const courseContentData: Record<number, SubcategoryContent> = {
  // الخطط الدراسية
  1: {
    subcategoryId: 1,
    subcategoryTitle: "الخطط الدراسية",
    sections: [
      {
        id: 1,
        title: "خطة 2025-02-01",
        lessons: [
          {
            id: 1,
            title: "الخطة PDF",
            duration: "ملف PDF",
            isLocked: false,
            type: 'pdf',
            pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
            thumbnailUrl: "https://images.unsplash.com/photo-1554224311-beee1c7c3c69?w=1080"
          },
          {
            id: 2,
            title: "فيديو اول للخطة",
            duration: "25:30",
            isLocked: false,
            type: 'thumbnail-link',
            externalLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            thumbnailUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1080"
          },
          {
            id: 3,
            title: "شرح الخطة الدراسية",
            duration: "28:45",
            isLocked: false,
            type: 'video',
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            thumbnailUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1080"
          },
        ]
      },
      {
        id: 2,
        title: "خطة 2025-02-15",
        lessons: [
          {
            id: 4,
            title: "الخطة PDF",
            duration: "ملف PDF",
            isLocked: false,
            type: 'pdf',
            pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
            thumbnailUrl: "https://images.unsplash.com/photo-1554224311-beee1c7c3c69?w=1080"
          },
          {
            id: 5,
            title: "فيديو اول للخطة",
            duration: "30:15",
            isLocked: false,
            type: 'thumbnail-link',
            externalLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            thumbnailUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1080"
          },
          {
            id: 6,
            title: "شرح الخطة الدراسية",
            duration: "32:20",
            isLocked: false,
            type: 'video',
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            thumbnailUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1080"
          },
        ]
      },
      {
        id: 3,
        title: "خطة 2025-03-01",
        lessons: [
          {
            id: 7,
            title: "الخطة PDF",
            duration: "ملف PDF",
            isLocked: false,
            type: 'pdf',
            pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
            thumbnailUrl: "https://images.unsplash.com/photo-1554224311-beee1c7c3c69?w=1080"
          },
          {
            id: 8,
            title: "فيديو اول للخة",
            duration: "27:45",
            isLocked: false,
            type: 'thumbnail-link',
            externalLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            thumbnailUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1080"
          },
          {
            id: 9,
            title: "شرح الخطة الدراسية",
            duration: "29:30",
            isLocked: false,
            type: 'video',
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            thumbnailUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1080"
          },
        ]
      },
      {
        id: 4,
        title: "خطة 2025-03-15",
        lessons: [
          {
            id: 10,
            title: "الخطة PDF",
            duration: "ملف PDF",
            isLocked: false,
            type: 'pdf',
            pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
            thumbnailUrl: "https://images.unsplash.com/photo-1554224311-beee1c7c3c69?w=1080"
          },
          {
            id: 11,
            title: "فيديو اول لخطة",
            duration: "26:00",
            isLocked: false,
            type: 'thumbnail-link',
            externalLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            thumbnailUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1080"
          },
          {
            id: 12,
            title: "شرح الخطة الدراسية",
            duration: "31:15",
            isLocked: false,
            type: 'video',
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            thumbnailUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1080"
          },
        ]
      },
      {
        id: 5,
        title: "خطة 2025-04-01",
        lessons: [
          {
            id: 13,
            title: "الخطة PDF",
            duration: "ملف PDF",
            isLocked: false,
            type: 'pdf',
            pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
            thumbnailUrl: "https://images.unsplash.com/photo-1554224311-beee1c7c3c69?w=1080"
          },
          {
            id: 14,
            title: "فيديو اول للخطة",
            duration: "28:30",
            isLocked: false,
            type: 'thumbnail-link',
            externalLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            thumbnailUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1080"
          },
          {
            id: 15,
            title: "شرح الخطة الدراسية",
            duration: "30:45",
            isLocked: false,
            type: 'video',
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            thumbnailUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1080"
          },
        ]
      },
      {
        id: 6,
        title: "خطة 2025-04-15",
        lessons: [
          {
            id: 16,
            title: "الخطة PDF",
            duration: "ملف PDF",
            isLocked: false,
            type: 'pdf',
            pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
            thumbnailUrl: "https://images.unsplash.com/photo-1554224311-beee1c7c3c69?w=1080"
          },
          {
            id: 17,
            title: "فيديو اول للخطة",
            duration: "29:20",
            isLocked: false,
            type: 'thumbnail-link',
            externalLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            thumbnailUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1080"
          },
          {
            id: 18,
            title: "شرح الخطة الدراسية",
            duration: "33:00",
            isLocked: false,
            type: 'video',
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            thumbnailUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1080"
          },
        ]
      },
      {
        id: 7,
        title: "خطة 2025-05-01",
        lessons: [
          {
            id: 19,
            title: "الخطة PDF",
            duration: "ملف PDF",
            isLocked: false,
            type: 'pdf',
            pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
            thumbnailUrl: "https://images.unsplash.com/photo-1554224311-beee1c7c3c69?w=1080"
          },
          {
            id: 20,
            title: "فيديو اول للخطة",
            duration: "27:15",
            isLocked: false,
            type: 'thumbnail-link',
            externalLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            thumbnailUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1080"
          },
          {
            id: 21,
            title: "شرح الخطة الدراسية",
            duration: "31:50",
            isLocked: false,
            type: 'video',
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            thumbnailUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1080"
          },
        ]
      },
      {
        id: 8,
        title: "خطة 2025-05-15",
        lessons: [
          {
            id: 22,
            title: "الخطة PDF",
            duration: "ملف PDF",
            isLocked: false,
            type: 'pdf',
            pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
            thumbnailUrl: "https://images.unsplash.com/photo-1554224311-beee1c7c3c69?w=1080"
          },
          {
            id: 23,
            title: "فيديو اول للخطة",
            duration: "25:45",
            isLocked: false,
            type: 'thumbnail-link',
            externalLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            thumbnailUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1080"
          },
          {
            id: 24,
            title: "شرح الخطة الدراسية",
            duration: "29:00",
            isLocked: false,
            type: 'video',
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            thumbnailUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1080"
          },
        ]
      }
    ]
  },

  // الإملائيات
  2: {
    subcategoryId: 2,
    subcategoryTitle: "الإملائيات",
    sections: [
      {
        id: 1,
        title: "الفصل الأول",
        lessons: [
          {
            id: 1,
            title: "ملف الإملائيات PDF - الفصل الأول",
            duration: "ملف PDF",
            isLocked: false,
            type: 'pdf',
            pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
            thumbnailUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1080"
          },
          {
            id: 2,
            title: "فيديو الإملائيات - الفصل الأول",
            duration: "35:20",
            isLocked: false,
            type: 'thumbnail-link',
            externalLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            thumbnailUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1080"
          },
        ]
      },
      {
        id: 2,
        title: "الفصل الثاني",
        lessons: [
          {
            id: 3,
            title: "ملف الإملائيات PDF - الفصل الثاني",
            duration: "ملف PDF",
            isLocked: false,
            type: 'pdf',
            pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
            thumbnailUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1080"
          },
          {
            id: 4,
            title: "فيديو الإملائيات - الفصل الثاني",
            duration: "38:45",
            isLocked: false,
            type: 'thumbnail-link',
            externalLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            thumbnailUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1080"
          },
        ]
      }
    ]
  },

  // الامتحانات والاختبارات
  3: examsAndTestsContent,

  // PDF
  4: pdfContent,

  // مراجعات الوحدات
  5: unitReviewsContent,

  // خلاصات القطع
  6: summariesContent,

  // التسجيلات الصوتية
  7: audioRecordingsContent
};

// دالة للحصول على محتوى subcategory معين
export function getSubcategoryContent(subcategoryId: number): SubcategoryContent | null {
  return courseContentData[subcategoryId] || null;
}