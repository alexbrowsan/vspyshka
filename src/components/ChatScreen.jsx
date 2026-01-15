import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';

export default function ChatScreen({ match, messages, onBack, onSend }) {
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-3 bg-white border-b">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        
        <img
          src={match.photo}
          alt={match.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        
        <div>
          <h2 className="font-semibold text-gray-800">{match.name}</h2>
          <p className="text-xs text-gray-500">Онлайн</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <img
              src={match.photo}
              alt={match.name}
              className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg"
            />
            <h3 className="font-semibold text-gray-700 mb-1">
              Вы совпали с {match.name}!
            </h3>
            <p className="text-gray-500 text-sm">
              Напишите первым и познакомьтесь ✨
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                  msg.fromMe
                    ? 'bg-gradient-to-r from-rose-500 to-orange-400 text-white rounded-br-md'
                    : 'bg-white text-gray-800 rounded-bl-md shadow-sm'
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.fromMe ? 'text-white/70' : 'text-gray-400'}`}>
                  {msg.time}
                </p>
              </div>
            </motion.div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Напишите сообщение..."
            className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all text-gray-800 placeholder-gray-400"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!text.trim()}
            className={`p-3 rounded-full transition-all ${
              text.trim()
                ? 'bg-gradient-to-r from-rose-500 to-orange-400 text-white shadow-lg'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </form>
    </div>
  );
}
