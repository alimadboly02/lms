import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2,
  XCircle,
  Award,
  TrendingDown,
  RotateCcw,
  ChevronRight
} from "lucide-react";
import { ExamData, ExamQuestion } from "../data/courseContent";

interface ExamComponentProps {
  examData: ExamData;
  examTitle: string;
}

interface Answer {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
}

export function ExamComponent({ examData, examTitle }: ExamComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = examData.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === examData.questions.length - 1;

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      selectedAnswer: selectedOption,
      isCorrect
    };

    setAnswers([...answers, newAnswer]);
    setSelectedOption(null);

    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
    setSelectedOption(null);
  };

  const calculateScore = () => {
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    return Math.round((correctAnswers / examData.questions.length) * 100);
  };

  const isPassed = () => {
    return calculateScore() >= examData.passingScore;
  };

  if (showResults) {
    const score = calculateScore();
    const passed = isPassed();

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[5px] shadow-lg overflow-hidden"
      >
        {/* النتيجة العامة */}
        <div className={`p-8 text-center ${passed ? 'bg-gradient-to-br from-emerald-50 to-emerald-100' : 'bg-gradient-to-br from-red-50 to-red-100'}`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            {passed ? (
              <Award className="w-20 h-20 mx-auto mb-4 text-emerald-500" />
            ) : (
              <TrendingDown className="w-20 h-20 mx-auto mb-4 text-red-500" />
            )}
          </motion.div>
          
          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            {passed ? '🎉 مبروك! نجحت' : '😔 للأسف، رسبت'}
          </h2>
          
          <p className="text-xl text-gray-600 mb-4">
            حصلت على <span className="font-bold text-2xl">{score}%</span>
          </p>
          
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{answers.filter(a => a.isCorrect).length} إجابة صحيحة</span>
            </div>
            <div className="flex items-center gap-1">
              <XCircle className="w-4 h-4 text-red-500" />
              <span>{answers.filter(a => !a.isCorrect).length} إجابة خاطئة</span>
            </div>
          </div>

          <p className="mt-6 text-gray-700 font-semibold">
            {passed 
              ? 'أحسنت! أداء ممتاز، استمر في التفوق 💪' 
              : 'لا بأس، حاول مرة أخرى وستنجح بإذن الله 🌟'}
          </p>
        </div>

        {/* التحليل التفصيلي */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📊 التحليل التفصيلي</h3>
          
          <div className="space-y-4">
            {examData.questions.map((question, index) => {
              const userAnswer = answers.find(a => a.questionId === question.id);
              const isCorrect = userAnswer?.isCorrect || false;

              return (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-[5px] border-2 ${
                    isCorrect ? 'border-emerald-300 bg-emerald-50' : 'border-red-300 bg-red-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    )}
                    
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-2">
                        السؤال {index + 1}: {question.question}
                      </p>
                      
                      {!isCorrect && userAnswer && (
                        <p className="text-sm text-red-700 mb-2">
                          <span className="font-semibold">إجابتك:</span> {question.options[userAnswer.selectedAnswer]}
                        </p>
                      )}
                      
                      <p className="text-sm text-gray-700 mb-2">
                        <span className="font-semibold text-emerald-700">الإجابة الصحيحة:</span> {question.options[question.correctAnswer]}
                      </p>
                      
                      <p className="text-sm text-gray-600 bg-white/50 p-2 rounded">
                        💡 <span className="font-semibold">الشرح:</span> {question.explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* زر إعادة المحاولة */}
          <button
            onClick={handleRetry}
            className="w-full mt-6 px-6 py-3 bg-emerald-500 text-white rounded-[5px] hover:bg-emerald-600 transition-all font-semibold flex items-center justify-center gap-2 relative overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1 -right-1 w-8 h-8 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-2 left-4 w-6 h-6 border border-white/15 rounded-full"></div>
              <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-white/10 rounded-full"></div>
            </div>
            <RotateCcw className="w-5 h-5 relative z-10" />
            <span className="relative z-10">إعادة المحاولة</span>
          </button>
        </div>
      </motion.div>
    );
  }

  // شاشة الامتحان
  return (
    <div className="bg-white rounded-[5px] shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{examTitle}</h2>
        <div className="flex items-center justify-between text-sm">
          <span>المستوى: {examData.difficulty}</span>
          <span>السؤال {currentQuestionIndex + 1} من {examData.questions.length}</span>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / examData.questions.length) * 100}%` }}
            className="bg-white h-full rounded-full"
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              {currentQuestion.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full p-4 text-right rounded-[5px] border-2 transition-all font-medium ${
                    selectedOption === index
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-300'
                  }`}
                >
                  <span className="inline-block w-8 h-8 rounded-full bg-gray-100 text-center leading-8 ml-3">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </motion.button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
              className={`w-full mt-6 px-6 py-3 rounded-[5px] font-semibold flex items-center justify-center gap-2 transition-all relative overflow-hidden ${
                selectedOption === null
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600'
              }`}
            >
              {!isLastQuestion ? (
                <>
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1 -right-1 w-8 h-8 border border-white/20 rounded-full"></div>
                    <div className="absolute bottom-2 left-4 w-6 h-6 border border-white/15 rounded-full"></div>
                  </div>
                  <span className="relative z-10">السؤال التالي</span>
                  <ChevronRight className="w-5 h-5 relative z-10" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1 -right-1 w-8 h-8 border border-white/20 rounded-full"></div>
                    <div className="absolute bottom-2 left-4 w-6 h-6 border border-white/15 rounded-full"></div>
                  </div>
                  <span className="relative z-10">إنهاء الامتحان</span>
                  <Award className="w-5 h-5 relative z-10" />
                </>
              )}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
