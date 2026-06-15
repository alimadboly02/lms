import { SubcategoryContent, ExamData } from './courseContent';

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

// دالة مساعدة لإنشاء أسئلة امتحان
function createExamQuestions(unit: number, topic: number, type: 'امتحان' | 'اختبار'): ExamData {
  const questions = [
    {
      id: 1,
      question: `السؤال الأول - ${type} الموضوع ${topic} - الوحدة ${unit}`,
      options: ["الخيار أ", "الخيار ب", "الخيار ج", "الخيار د"],
      correctAnswer: 1,
      explanation: "الإجابة الصحيحة هي الخيار ب بناءً على القاعدة المشروحة في الوحدة"
    },
    {
      id: 2,
      question: `Choose the correct form: I ___ to school yesterday.`,
      options: ["go", "goes", "went", "going"],
      correctAnswer: 2,
      explanation: "'went' هو الماضي البسيط للفعل 'go'"
    },
    {
      id: 3,
      question: `What is a synonym for 'happy'?`,
      options: ["sad", "joyful", "angry", "tired"],
      correctAnswer: 1,
      explanation: "'joyful' تعني سعيد ومبتهج وهي مرادف لـ 'happy'"
    },
    {
      id: 4,
      question: `Complete: She ___ coffee every morning.`,
      options: ["drink", "drinks", "drinking", "drank"],
      correctAnswer: 1,
      explanation: "مع 'she' نضيف 's' للفعل في المضارع البسيط"
    },
    {
      id: 5,
      question: `What is the opposite of 'big'?`,
      options: ["large", "huge", "small", "tiny"],
      correctAnswer: 2,
      explanation: "'small' هو العكس المباشر لـ 'big'"
    },
    {
      id: 6,
      question: `If I ___ more time, I would study better.`,
      options: ["have", "had", "has", "having"],
      correctAnswer: 1,
      explanation: "في الجملة الشرطية من النوع الثاني نستخدم الماضي البسيط"
    },
    {
      id: 7,
      question: `The letter ___ by John last week.`,
      options: ["writes", "wrote", "was written", "is written"],
      correctAnswer: 2,
      explanation: "نستخدم المبني للمجهول في الماضي 'was written'"
    },
    {
      id: 8,
      question: `I have lived here ___ 2020.`,
      options: ["since", "for", "from", "until"],
      correctAnswer: 0,
      explanation: "نستخدم 'since' مع نقطة زمنية محددة"
    },
    {
      id: 9,
      question: `Neither the teacher nor the students ___ ready.`,
      options: ["is", "are", "was", "been"],
      correctAnswer: 1,
      explanation: "الفعل يتبع الاسم الأقرب وهو 'students' (جمع)"
    },
    {
      id: 10,
      question: `She wishes she ___ fly like a bird.`,
      options: ["can", "could", "will", "would"],
      correctAnswer: 1,
      explanation: "بعد 'wish' نستخدم 'could' للتعبير عن أمنية"
    }
  ];

  return {
    difficulty: 'متوسط',
    passingScore: 70,
    questions: questions
  };
}

// بيانات قسم الامتحانات والاختبارات
export const examsAndTestsContent: SubcategoryContent = {
  subcategoryId: 3,
  subcategoryTitle: "الامتحانات والاختبارات",
  sections: [
    // قسم الامتحانات الرئيسي
    {
      id: 1,
      title: "الامتحانات",
      lessons: [], // القسم الرئيسي لا يحتوي على دروس مباشرة
      subsections: [] // سيتم إضافة الوحدات هنا
    },
    // قسم الاختبارات الرئيسي
    {
      id: 2,
      title: "الاختبارات",
      lessons: [], // القسم الرئيسي لا يحتوي على دروس مباشرة
      subsections: [] // سيتم إضافة الوحدات هنا
    }
  ]
};

// إضافة وحدات الامتحانات (10 وحدات)
for (let unit = 1; unit <= 10; unit++) {
  const unitSubsection = {
    id: 100 + unit,
    title: `الوحدة ${unitNames[unit - 1]}`,
    lessons: [] as any[]
  };

  // إضافة امتحانات المواضيع لكل وحدة (3 مواضيع)
  for (let topic = 1; topic <= 3; topic++) {
    unitSubsection.lessons.push({
      id: unit * 1000 + topic,
      title: `امتحان الموضوع ${topic === 1 ? 'الأول' : topic === 2 ? 'الثاني' : 'الثالث'}`,
      duration: "10 أسئلة",
      isLocked: false,
      type: 'exam',
      examData: createExamQuestions(unit, topic, 'امتحان')
    });
  }

  examsAndTestsContent.sections[0].subsections!.push(unitSubsection);
}

// إضافة وحدات الاختبارات (10 وحدات)
for (let unit = 1; unit <= 10; unit++) {
  const unitSubsection = {
    id: 200 + unit,
    title: `الوحدة ${unitNames[unit - 1]}`,
    lessons: [] as any[]
  };

  // إضافة اختبارات المواضيع لكل وحدة (3 مواضيع)
  for (let topic = 1; topic <= 3; topic++) {
    unitSubsection.lessons.push({
      id: unit * 2000 + topic,
      title: `اختبار الموضوع ${topic === 1 ? 'الأول' : topic === 2 ? 'الثاني' : 'الثالث'}`,
      duration: "10 أسئلة",
      isLocked: false,
      type: 'exam',
      examData: createExamQuestions(unit, topic, 'اختبار')
    });
  }

  examsAndTestsContent.sections[1].subsections!.push(unitSubsection);
}
