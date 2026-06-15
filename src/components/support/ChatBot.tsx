import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, RotateCcw, User, Bot, Paperclip, X, Image as ImageIcon, Video } from 'lucide-react';
import { useChat } from './ChatContext';

interface ChatBotProps {
  onClose: () => void;
}

export function ChatBot({ onClose }: ChatBotProps) {
  const { messages, chatState, addMessage, selectOption, resetChat } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input when agent is connected
    if (chatState.isAgentConnected) {
      inputRef.current?.focus();
    }
  }, [chatState.isAgentConnected]);

  // Scroll to bottom when chat opens
  useEffect(() => {
    // Small delay to ensure the component is fully rendered
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (!inputValue.trim() && !selectedFile) return;

    const messageData: any = {
      type: 'user',
      text: inputValue || '📎 ملف مرفق'
    };

    // إضافة الملف المرفق إن وجد
    if (selectedFile && filePreview) {
      messageData.attachment = {
        type: selectedFile.type.startsWith('image/') ? 'image' : 'video',
        url: filePreview,
        name: selectedFile.name
      };
    }

    addMessage(messageData);

    setInputValue('');
    setSelectedFile(null);
    setFilePreview(null);

    // محاكاة رد الموظفة
    if (chatState.isAgentConnected) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage({
          type: 'bot',
          text: 'شكراً على تواصلك! تم استلام رسالتك وسيتم الرد عليك في أقرب وقت. 😊'
        });
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
    if (confirm('هل أنت متأكد من إعادة تعيين المحادثة؟')) {
      resetChat();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // فحص نوع الملف
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        alert('يرجى اختيار صورة أو فيديو فقط');
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAttachClick = (type: 'image' | 'video') => {
    if (!chatState.canAttachFiles) {
      alert('⚠️ عذراً، ميزة الإرفاق غير متاحة حالياً.\n\nالموظفة لم تفعّل إمكانية إرفاق الملفات بعد.');
      return;
    }
    
    // Set the accept attribute based on type
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === 'image' ? 'image/*' : 'video/*';
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Chat Window - positioned above button */}
      <motion.div
        className="fixed bottom-24 left-6 z-50 bg-white rounded-[15px] shadow-2xl w-96 h-[600px] flex flex-col overflow-hidden border border-gray-100"
        initial={{ scale: 0, opacity: 0, originX: 0, originY: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 px-5 py-4 text-white flex items-center gap-3 flex-shrink-0 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-white/10 rounded-full" />
          <div className="absolute -bottom-2 -left-2 w-16 h-16 border border-white/10 rounded-full" />
          
          <div className="relative z-10 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            {chatState.isAgentConnected ? (
              <User className="w-5 h-5" />
            ) : (
              <Bot className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1 relative z-10">
            <h3 className="font-bold text-base">
              {chatState.isAgentConnected ? chatState.agentName : 'مساعد الدعم الفني'}
            </h3>
            <p className="text-emerald-50 text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-200 rounded-full animate-pulse" />
              متصل الآن
            </p>
          </div>
          <button
            onClick={handleReset}
            className="relative z-10 w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            title="إعادة تعيين المحادثة"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((message) => (
            <div key={message.id}>
              {/* Message Bubble */}
              <div
                className={`flex gap-2 ${
                  message.type === 'user' ? 'justify-start flex-row-reverse' : 'justify-start'
                }`}
              >
                {/* Avatar */}
                {message.type !== 'system' && (
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user'
                        ? 'bg-gray-300'
                        : 'bg-gradient-to-br from-emerald-400 to-teal-500'
                    }`}
                  >
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-gray-700" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                )}

                {/* Message Content */}
                <div
                  className={`max-w-[75%] ${
                    message.type === 'system' ? 'w-full' : ''
                  }`}
                >
                  <div
                    className={`rounded-[12px] px-4 py-2.5 ${
                      message.type === 'user'
                        ? 'bg-emerald-500 text-white'
                        : message.type === 'system'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200 text-center'
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.text}
                    </p>

                    {/* Attachment */}
                    {message.attachment && (
                      <div className="mt-2">
                        {message.attachment.type === 'image' ? (
                          <img
                            src={message.attachment.url}
                            alt={message.attachment.name}
                            className="max-w-full rounded-[8px] border border-white/20"
                          />
                        ) : (
                          <video
                            src={message.attachment.url}
                            controls
                            className="max-w-full rounded-[8px] border border-white/20"
                          />
                        )}
                        <p className="text-xs mt-1 opacity-75">
                          {message.attachment.name}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Time */}
                  {message.type !== 'system' && (
                    <p className="text-xs text-gray-400 mt-1 px-2">
                      {message.timestamp.toLocaleTimeString('ar-JO', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  )}

                  {/* Options */}
                  {message.options && message.options.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option) => (
                        <motion.button
                          key={option.id}
                          onClick={() => selectOption(option)}
                          className="w-full text-right px-4 py-2.5 bg-white hover:bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-400 rounded-[8px] text-sm font-medium text-gray-700 hover:text-emerald-700 transition-all shadow-sm"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {option.label}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-2 justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white rounded-[12px] px-4 py-3 shadow-sm border border-gray-100">
                <div className="flex gap-1">
                  <motion.div
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {chatState.isAgentConnected && (
          <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
            {/* File Preview */}
            {selectedFile && filePreview && (
              <div className="mb-3 relative bg-gray-50 rounded-[10px] p-3 border border-gray-200">
                <button
                  onClick={handleRemoveFile}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md z-10"
                  title="إزالة الملف"
                >
                  <X className="w-4 h-4" />
                </button>
                {selectedFile.type.startsWith('image/') ? (
                  <img
                    src={filePreview}
                    alt={selectedFile.name}
                    className="max-w-full max-h-32 rounded-[8px] mx-auto"
                  />
                ) : (
                  <video
                    src={filePreview}
                    className="max-w-full max-h-32 rounded-[8px] mx-auto"
                  />
                )}
                <p className="text-xs text-gray-600 mt-2 text-center truncate">
                  {selectedFile.name}
                </p>
              </div>
            )}

            {/* Input Row */}
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {/* Image Attach Button - Always visible */}
              <button
                onClick={() => handleAttachClick('image')}
                disabled={!!selectedFile}
                className={`w-10 h-10 rounded-[10px] flex items-center justify-center transition-all flex-shrink-0 ${
                  chatState.canAttachFiles
                    ? 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-400'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                title={chatState.canAttachFiles ? 'إرفاق صورة' : 'الإرفاق غير متاح'}
              >
                <ImageIcon className="w-5 h-5" />
              </button>
              
              {/* Video Attach Button - Always visible */}
              <button
                onClick={() => handleAttachClick('video')}
                disabled={!!selectedFile}
                className={`w-10 h-10 rounded-[10px] flex items-center justify-center transition-all flex-shrink-0 ${
                  chatState.canAttachFiles
                    ? 'bg-purple-100 hover:bg-purple-200 text-purple-600'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-400'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                title={chatState.canAttachFiles ? 'إرفاق فيديو' : 'الإرفاق غير متاح'}
              >
                <Video className="w-5 h-5" />
              </button>
              
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="اكتب رسالتك..."
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() && !selectedFile}
                className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-[10px] flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Helper Text */}
        {!chatState.isAgentConnected && (
          <div className="px-4 py-3 bg-emerald-50 border-t border-emerald-100 flex-shrink-0">
            <p className="text-center text-xs text-emerald-700">
              💡 اختر من الخيارات أعلاه للمتابعة
            </p>
          </div>
        )}
      </motion.div>
    </>
  );
}