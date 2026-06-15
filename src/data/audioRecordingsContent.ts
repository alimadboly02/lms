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

// بيانات قسم التسجيلات الصوتية
export const audioRecordingsContent: SubcategoryContent = {
  subcategoryId: 7,
  subcategoryTitle: "التسجيلات الصوتية",
  sections: []
};

// إضافة 10 وحدات
for (let unit = 1; unit <= 10; unit++) {
  audioRecordingsContent.sections.push({
    id: unit,
    title: `الوحدة ${unitNames[unit - 1]}`,
    lessons: [
      {
        id: unit * 10 + 1,
        title: `إنجليزي - إنجليزي | الوحدة ${unitNames[unit - 1]}`,
        duration: "15:30",
        isLocked: false,
        type: 'audio',
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        thumbnailUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1080"
      },
      {
        id: unit * 10 + 2,
        title: `إنجليزي - عربي | الوحدة ${unitNames[unit - 1]}`,
        duration: "18:45",
        isLocked: false,
        type: 'audio',
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        thumbnailUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1080"
      }
    ]
  });
}