import { SubcategoryContent } from './courseContent';

// أسماء الوحدات بالعربي
const unitNames = [
  'الأولى',
  'الثانية', 
  'الثالثة',
  'الرابعة',
  'الخامسة',
  'السادسة',
  'السابعة',
  'الثامنة',
  'التاسعة',
  'العاشرة'
];

// بيانات قسم مراجعات الوحدات
export const unitReviewsContent: SubcategoryContent = {
  subcategoryId: 5,
  subcategoryTitle: "مراجعات الوحدات",
  sections: []
};

// إضافة 10 وحدات
for (let unit = 1; unit <= 10; unit++) {
  unitReviewsContent.sections.push({
    id: unit,
    title: `الوحدة ${unitNames[unit - 1]}`,
    lessons: [
      {
        id: unit * 10 + 1,
        title: `ملفات المراجعة PDF - الوحدة ${unitNames[unit - 1]}`,
        duration: "ملف PDF",
        isLocked: false,
        type: 'pdf',
        pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
        thumbnailUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1080"
      },
      {
        id: unit * 10 + 2,
        title: `الجزء الأول - الوحدة ${unitNames[unit - 1]}`,
        duration: "45:30",
        isLocked: false,
        type: 'thumbnail-link',
        externalLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnailUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1080"
      },
      {
        id: unit * 10 + 3,
        title: `الجزء الثاني - الوحدة ${unitNames[unit - 1]}`,
        duration: "42:15",
        isLocked: false,
        type: 'thumbnail-link',
        externalLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnailUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1080"
      }
    ]
  });
}
