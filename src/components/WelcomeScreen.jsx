import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

export default function WelcomeScreen({ onRegister }) {
  const [name, setName] = useState('');
  const [lookingFor, setLookingFor] = useState('');

  const canSubmit = name.trim() && lookingFor;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit) {
      onRegister(name.trim(), lookingFor);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-rose-400 to-pink-500">
      {/* Логотип */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="mb-8"
      >
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
          <Flame className="w-14 h-14 text-rose-500" />
        </div>
      </motion.div>

      {/* Название */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl font-bold text-white mb-2"
      >
        Вспышка
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-white/80 mb-8"
      >
        Найди свою искру ✨
      </motion.p>

      {/* Форма */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onSubmit={handleSubmit}
        className="w-full max-w-xs"
      >
        {/* Имя */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Как тебя зовут?"
            value={name}
            onChange={(e) => setName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
            className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-white focus:border-white focus:outline-none transition-colors text-gray-700 placeholder-gray-400 shadow-lg"
          />
        </div>

        {/* Выбор пола */}
        <div className="mb-6">
          <p className="text-white text-center font-medium mb-3">Я ищу:</p>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setLookingFor('female')}
              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                lookingFor === 'female'
                  ? 'bg-white text-rose-500 shadow-lg scale-105'
                  : 'bg-white/30 text-white hover:bg-white/40'
              }`}
            >
              👩 Девушку
            </button>
            <button
              type="button"
              onClick={() => setLookingFor('male')}
              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                lookingFor === 'male'
                  ? 'bg-white text-blue-500 shadow-lg scale-105'
                  : 'bg-white/30 text-white hover:bg-white/40'
              }`}
            >
              👨 Парня
            </button>
          </div>
        </div>

        {/* Кнопка */}
        <div style={{ marginTop: '32px' }}>
          <motion.button
            type="submit"
            disabled={!canSubmit}
            whileHover={canSubmit ? { scale: 1.02 } : {}}
            whileTap={canSubmit ? { scale: 0.98 } : {}}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              canSubmit
                ? 'bg-white text-rose-500 shadow-lg hover:shadow-xl'
                : 'bg-white/30 text-white/50 cursor-not-allowed'
            }`}
          >
            Начать 🔥
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}
