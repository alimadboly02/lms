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

// بيانات قسم خلاصات القطع
export const summariesContent: SubcategoryContent = {
  subcategoryId: 6,
  subcategoryTitle: "خلاصات القطع",
  sections: []
};

// إضافة 10 وحدات
for (let unit = 1; unit <= 10; unit++) {
  summariesContent.sections.push({
    id: unit,
    title: `الوحدة ${unitNames[unit - 1]}`,
    lessons: [
      {
        id: unit * 10 + 1,
        title: `الخلاصة الأولى - الوحدة ${unitNames[unit - 1]}`,
        duration: "35:20",
        isLocked: false,
        type: 'video',
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnailUrl: "https://images.unsplash.com/photo-1758270705518-b61b40527e76?w=1080"
      },
      {
        id: unit * 10 + 2,
        title: `الخلاصة الثانية - الوحدة ${unitNames[unit - 1]}`,
        duration: "38:45",
        isLocked: false,
        type: 'video',
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnailUrl: "https://images.unsplash.com/photo-1758270705518-b61b40527e76?w=1080"
      }
    ]
  });
}
