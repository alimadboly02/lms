import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type MessageType = 'bot' | 'user' | 'system';

export interface Message {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
  options?: ChatOption[];
  attachment?: {
    type: 'image' | 'video';
    url: string;
    name: string;
  };
}

export interface ChatOption {
  id: string;
  label: string;
  value: string;
  nextStep?: string;
}

export type ChatStep = 
  | 'welcome'
  | 'select_generation'
  | 'generation_2008'
  | 'generation_2009'
  | 'select_unit'
  | 'connect_agent'
  | 'agent_chat';

export interface ChatState {
  step: ChatStep;
  selectedGeneration?: '2008' | '2009';
  selectedCategory?: string;
  selectedUnit?: string;
  isAgentConnected: boolean;
  agentName?: string;
  canAttachFiles: boolean; // الصلاحية مغلقة افتراضياً
}

interface ChatContextType {
  messages: Message[];
  chatState: ChatState;
  isOpen: boolean;
  unreadCount: number;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  selectOption: (option: ChatOption) => void;
  openChat: () => void;
  closeChat: () => void;
  resetChat: () => void;
  markAsRead: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const initialState: ChatState = {
  step: 'welcome',
  isAgentConnected: false,
  canAttachFiles: false, // الصلاحية مغلقة افتراضياً
};

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatState, setChatState] = useState<ChatState>(initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chatData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setMessages(data.messages.map((m: Message) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        })));
        setChatState(data.chatState);
      } catch (error) {
        console.error('Failed to load chat data:', error);
      }
    } else {
      // رسالة ترحيب افتراضية
      addWelcomeMessage();
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatData', JSON.stringify({
        messages,
        chatState
      }));
    }
  }, [messages, chatState]);

  // Track unread messages
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.type === 'bot' || lastMessage.type === 'system') {
        setUnreadCount(prev => prev + 1);
      }
    }
  }, [messages, isOpen]);

  const addWelcomeMessage = () => {
    const welcomeMsg: Message = {
      id: Date.now().toString(),
      type: 'bot',
      text: 'مرحباً بك في الدعم الفني! 👋\n\nأنا هنا لمساعدتك. من فضلك اختر جيلك الدراسي:',
      timestamp: new Date(),
      options: [
        { id: '1', label: 'جيل 2008', value: '2008', nextStep: 'generation_2008' },
        { id: '2', label: 'جيل 2009', value: '2009', nextStep: 'generation_2009' }
      ]
    };
    setMessages([welcomeMsg]);
    setChatState({ ...initialState, step: 'select_generation' });
  };

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const selectOption = (option: ChatOption) => {
    // Add user selection
    addMessage({
      type: 'user',
      text: option.label
    });

    // Handle different steps
    setTimeout(() => {
      handleOptionSelection(option);
    }, 500);
  };

  const handleOptionSelection = (option: ChatOption) => {
    const { value, nextStep } = option;

    // اختيار الجيل
    if (chatState.step === 'select_generation') {
      setChatState(prev => ({
        ...prev,
        selectedGeneration: value as '2008' | '2009',
        step: nextStep as ChatStep
      }));

      const categories = [
        { id: '1', label: '📝 الإملائيات', value: 'spelling' },
        { id: '2', label: '📚 الخطط الدراسية', value: 'study_plans' },
        { id: '3', label: '📄 الامتحانات والاختبارات', value: 'exams' },
        { id: '4', label: '📖 PDF', value: 'pdf' },
        { id: '5', label: '🔄 مراجعات الوحدات', value: 'unit_reviews' },
        { id: '6', label: '📋 خلاصات القطع', value: 'summaries' },
        { id: '7', label: '🎵 التسجيلات الصوتية', value: 'audio' }
      ];

      addMessage({
        type: 'bot',
        text: `ممتاز! اخترت جيل ${value} ✅\n\nما الذي تحتاج المساعدة فيه؟`,
        options: categories
      });
    }
    // اختيار القسم
    else if (chatState.step === 'generation_2008' || chatState.step === 'generation_2009') {
      setChatState(prev => ({
        ...prev,
        selectedCategory: value,
        step: 'select_unit'
      }));

      const units = Array.from({ length: 12 }, (_, i) => ({
        id: `unit-${i + 1}`,
        label: `الوحدة ${i + 1}`,
        value: `unit-${i + 1}`
      }));

      addMessage({
        type: 'bot',
        text: `اخترت: ${option.label}\n\nمن فضلك اختر الوحدة:`,
        options: units
      });
    }
    // اختيار الوحدة
    else if (chatState.step === 'select_unit') {
      setChatState(prev => ({
        ...prev,
        selectedUnit: value,
        step: 'connect_agent'
      }));

      addMessage({
        type: 'bot',
        text: `اخترت: ${option.label} ✅\n\nكيف تريد المتابعة؟`,
        options: [
          { id: '1', label: '💬 التواصل عبر واتساب', value: 'whatsapp' },
          { id: '2', label: '👩‍💼 الدردشة مع موظفة', value: 'agent' }
        ]
      });
    }
    // الخيار النهائي
    else if (chatState.step === 'connect_agent') {
      if (value === 'whatsapp') {
        // فتح واتساب
        const phone = '962799999999'; // رقم الواتساب
        const message = `مرحباً، أحتاج مساعدة في:\nالجيل: ${chatState.selectedGeneration}\nالقسم: ${chatState.selectedCategory}\nالوحدة: ${chatState.selectedUnit}`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
        
        addMessage({
          type: 'system',
          text: '✅ تم فتح واتساب! سيتم توجيهك للمحادثة...'
        });
      } else if (value === 'agent') {
        // محاكاة الاتصال بموظفة
        addMessage({
          type: 'system',
          text: '🔄 جاري توصيلك بموظفة الدعم...'
        });

        setTimeout(() => {
          const agentName = 'سارة أحمد';
          setChatState(prev => ({
            ...prev,
            isAgentConnected: true,
            agentName,
            step: 'agent_chat'
          }));

          addMessage({
            type: 'bot',
            text: `✨ تم توصيلك بـ ${agentName}\n\nستكون معك خلال ثوانٍ. يمكنك البدء بكتابة استفسارك وسيتم الرد عليك في أقرب وقت.`
          });

          // محاكاة رد الموظفة بعد 3 ثواني
          setTimeout(() => {
            addMessage({
              type: 'bot',
              text: `مرحباً! أنا ${agentName} 👋\n\nكيف يمكنني مساعدتك اليوم؟`
            });

            // محاكاة تفعيل الإرفاق بعد 5 ثواني (كمثال)
            setTimeout(() => {
              setChatState(prev => ({
                ...prev,
                canAttachFiles: true
              }));

              addMessage({
                type: 'system',
                text: '📎 تم تفعيل ميزة إرفاق الملفات. يمكنك الآن إرفاق صور أو فيديوهات مع رسائلك.'
              });
            }, 5000);
          }, 3000);
        }, 2000);
      }
    }
  };

  const openChat = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const resetChat = () => {
    setMessages([]);
    setChatState(initialState);
    localStorage.removeItem('chatData');
    addWelcomeMessage();
  };

  const markAsRead = () => {
    setUnreadCount(0);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        chatState,
        isOpen,
        unreadCount,
        addMessage,
        selectOption,
        openChat,
        closeChat,
        resetChat,
        markAsRead
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
}