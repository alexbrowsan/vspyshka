import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle } from 'lucide-react';

export default function ChatList({ matches, chats, onBack, onOpenChat }) {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4 border-b">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Мэтчи</h1>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {matches.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-lg font-semibold text-gray-600 mb-2">
              Пока нет мэтчей
            </h2>
            <p className="text-gray-400">
              Продолжайте свайпать, чтобы найти свою искру! ✨
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {matches.map((match, index) => {
              const matchChats = chats[match.id] || [];
              const lastMessage = matchChats[matchChats.length - 1];
              
              return (
                <motion.button
                  key={match.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => onOpenChat(match.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                >
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={match.photo}
                      alt={match.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    {!lastMessage && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-rose-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800">
                      {match.name}, {match.age}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {lastMessage ? lastMessage.text : 'Новый мэтч! Напишите первым 👋'}
                    </p>
                  </div>
                  
                  {/* Time */}
                  {lastMessage && (
                    <span className="text-xs text-gray-400">
                      {lastMessage.time}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
