import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Flame, MessageCircle, X, Heart } from 'lucide-react';

export default function SwipeScreen({ profiles, currentIndex, onSwipe, matchCount, onOpenChats }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  
  // Индикаторы NOPE / LIKE
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const currentProfile = profiles[currentIndex];
  const nextProfile = profiles[currentIndex + 1];
  const hasMore = currentIndex < profiles.length;

  // Сброс позиции при смене карточки
  useEffect(() => {
    x.set(0);
  }, [currentIndex]);

  const handleDragEnd = (_, info) => {
    if (Math.abs(info.offset.x) > 100) {
      const direction = info.offset.x > 0 ? 'right' : 'left';
      const targetX = info.offset.x > 0 ? 500 : -500;
      
      animate(x, targetX, { 
        duration: 0.3,
        onComplete: () => {
          onSwipe(direction);
        }
      });
    } else {
      animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
    }
  };

  const handleButtonSwipe = (direction) => {
    const targetX = direction === 'right' ? 500 : -500;
    
    animate(x, targetX, { 
      duration: 0.3,
      onComplete: () => {
        onSwipe(direction);
      }
    });
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-orange-400 rounded-full flex items-center justify-center">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">
            Вспышка
          </span>
        </div>
        
        <button
          onClick={onOpenChats}
          className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <MessageCircle className="w-6 h-6 text-gray-600" />
          {matchCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {matchCount}
            </span>
          )}
        </button>
      </div>

      {/* Card Area */}
      <div className="flex-1 relative flex items-center justify-center p-4">
        {hasMore && currentProfile ? (
          <>
            {/* Следующая карточка (позади) */}
            {nextProfile && (
              <div 
                className="absolute w-full max-w-[340px]"
                style={{ 
                  transform: 'scale(0.95)',
                  top: '24px',
                }}
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ filter: 'brightness(0.9)' }}>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={nextProfile.photo}
                      alt={nextProfile.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h2 className="text-2xl font-bold">{nextProfile.name}, {nextProfile.age}</h2>
                      <p className="text-white/90 mt-1">{nextProfile.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          
            {/* Текущая карточка */}
            <motion.div
              key={currentProfile.id}
              style={{ x, rotate, zIndex: 10 }}
              drag="x"
              dragElastic={0.7}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              className="absolute w-full max-w-[340px] cursor-grab active:cursor-grabbing"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={currentProfile.photo}
                    alt={currentProfile.name}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    draggable="false"
                  />
                  
                  {/* LIKE indicator */}
                  <motion.div
                    style={{ opacity: likeOpacity }}
                    className="absolute top-8 left-4 px-4 py-2 border-4 border-green-500 rounded-lg rotate-[-20deg] bg-white/80"
                  >
                    <span className="text-3xl font-black text-green-500">LIKE</span>
                  </motion.div>
                  
                  {/* NOPE indicator */}
                  <motion.div
                    style={{ opacity: nopeOpacity }}
                    className="absolute top-8 right-4 px-4 py-2 border-4 border-red-500 rounded-lg rotate-[20deg] bg-white/80"
                  >
                    <span className="text-3xl font-black text-red-500">NOPE</span>
                  </motion.div>
                  
                  {/* Gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h2 className="text-2xl font-bold">
                      {currentProfile.name}, {currentProfile.age}
                    </h2>
                    <p className="text-white/90 mt-1">{currentProfile.bio}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          <div className="text-center p-8">
            <div className="text-6xl mb-4">😢</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              Профили закончились!
            </h2>
            <p className="text-gray-500">
              Обновите страницу, чтобы начать заново
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {hasMore && currentProfile && (
        <div className="flex items-center justify-center gap-6 pb-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleButtonSwipe('left')}
            className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-red-200 hover:border-red-400 transition-colors"
          >
            <X className="w-8 h-8 text-red-500" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleButtonSwipe('right')}
            className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-400 rounded-full shadow-lg flex items-center justify-center"
          >
            <Heart className="w-8 h-8 text-white fill-white" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
