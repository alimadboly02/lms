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

// بيانات قسم PDF
export const pdfContent: SubcategoryContent = {
  subcategoryId: 4,
  subcategoryTitle: "PDF",
  sections: []
};

// إضافة 10 وحدات
for (let unit = 1; unit <= 10; unit++) {
  pdfContent.sections.push({
    id: unit,
    title: `الوحدة ${unitNames[unit - 1]}`,
    lessons: [
      {
        id: unit,
        title: `ملف PDF - الوحدة ${unitNames[unit - 1]}`,
        duration: "ملف PDF",
        isLocked: false,
        type: 'pdf',
        pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
        thumbnailUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1080"
      }
    ]
  });
}
