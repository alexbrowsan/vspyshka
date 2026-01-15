import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function MatchPopup({ match, userName, userAvatar, onClose, onOpenChat }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-white rounded-3xl p-8 w-full max-w-[320px] text-center"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkles className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-black bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">
            Это мэтч!
          </h2>
          <Sparkles className="w-8 h-8 text-yellow-400" />
        </motion.div>

        {/* Avatars */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          {/* User avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg border-4 border-white">
            <img
              src={userAvatar}
              alt={userName}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Match avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg border-4 border-white">
            <img
              src={match.photo}
              alt={match.name}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-6"
        >
          Вы понравились друг другу!
          <br />
          <span className="font-semibold text-gray-800">
            {userName} ❤️ {match.name}
          </span>
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <button
            onClick={onOpenChat}
            className="w-full py-3 bg-gradient-to-r from-rose-500 to-orange-400 text-white font-bold rounded-xl hover:shadow-lg transition-shadow"
          >
            Написать сообщение 💬
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-100 text-gray-600 font-medium rounded-xl hover:bg-gray-200 transition-colors"
          >
            Продолжить свайпать
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
