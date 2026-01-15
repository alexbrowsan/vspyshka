import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import SwipeScreen from './components/SwipeScreen';
import MatchPopup from './components/MatchPopup';
import ChatList from './components/ChatList';
import ChatScreen from './components/ChatScreen';
import { getProfiles } from './data/profiles';

// Аватарки пользователя
const userAvatars = {
  male: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face",
  female: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face"
};

// Умные автоответы
const getSmartReply = (userMessage) => {
  const msg = userMessage.toLowerCase();
  
  // Приветствия
  if (msg.includes('привет') || msg.includes('здравствуй') || msg.includes('хай') || msg.includes('хей')) {
    const replies = ['Привет! 😊', 'Приветик! 👋', 'Хей! Рада познакомиться!', 'Привет-привет! ✨'];
    return replies[Math.floor(Math.random() * replies.length)];
  }
  
  // Как дела
  if (msg.includes('как дела') || msg.includes('как ты') || msg.includes('что делаешь')) {
    const replies = ['Отлично! А у тебя? 😊', 'Хорошо, спасибо! 💕', 'Всё супер! Вот сижу, общаюсь с тобой 😏', 'Лучше всех теперь!'];
    return replies[Math.floor(Math.random() * replies.length)];
  }
  
  // Комплименты
  if (msg.includes('красив') || msg.includes('симпатич') || msg.includes('милая') || msg.includes('милый') || msg.includes('классн')) {
    const replies = ['Спасибо, ты тоже ничего 😏', 'Ой, как приятно! 🥰', 'Ты умеешь делать комплименты! 💕', 'Мерси! Ты тоже очень даже 😊'];
    return replies[Math.floor(Math.random() * replies.length)];
  }
  
  // Встреча/свидание
  if (msg.includes('встрет') || msg.includes('кофе') || msg.includes('свидан') || msg.includes('погул') || msg.includes('увидеться')) {
    const replies = ['Может быть... Надо подумать 😏', 'Интересное предложение! ☕', 'А ты не торопишься? 😄', 'Хм, а куда пойдём?'];
    return replies[Math.floor(Math.random() * replies.length)];
  }
  
  // Вопросы о хобби/интересах
  if (msg.includes('хобби') || msg.includes('увлека') || msg.includes('интерес') || msg.includes('люб')) {
    const replies = ['Люблю путешествовать и пробовать новое! А ты?', 'Много чего! Расскажу при встрече 😏', 'Обожаю музыку и хорошие фильмы 🎬', 'Спорт, книги, вкусная еда ✨'];
    return replies[Math.floor(Math.random() * replies.length)];
  }
  
  // Смех/шутки
  if (msg.includes('ахах') || msg.includes('хаха') || msg.includes('лол') || msg.includes('смешн') || msg.includes('😂') || msg.includes('🤣')) {
    const replies = ['Ахах, да! 😄', 'Рада что тебе весело 😊', 'Ты смешной 😂', 'Хех, с тобой не соскучишься!'];
    return replies[Math.floor(Math.random() * replies.length)];
  }
  
  // Работа
  if (msg.includes('работа') || msg.includes('работаешь') || msg.includes('профессия') || msg.includes('чем заним')) {
    const replies = ['Работаю в интересной сфере 😊 А ты?', 'Это секрет 😏', 'Делаю мир лучше, как и все 💪', 'Расскажу при встрече!'];
    return replies[Math.floor(Math.random() * replies.length)];
  }
  
  // Возраст
  if (msg.includes('сколько лет') || msg.includes('возраст') || msg.includes('годик')) {
    const replies = ['А сколько дашь? 😏', 'Женщинам такие вопросы не задают! 😄', 'Достаточно чтобы быть тут 😊', 'Угадай!'];
    return replies[Math.floor(Math.random() * replies.length)];
  }
  
  // Откуда
  if (msg.includes('откуда') || msg.includes('город') || msg.includes('живёшь') || msg.includes('живешь')) {
    const replies = ['Из прекрасного города! А ты?', 'Недалеко от тебя, надеюсь 😊', 'Может где-то рядом с тобой? 😏'];
    return replies[Math.floor(Math.random() * replies.length)];
  }
  
  // Номер/контакты
  if (msg.includes('номер') || msg.includes('инст') || msg.includes('телег') || msg.includes('контакт') || msg.includes('написать')) {
    const replies = ['Давай сначала получше узнаем друг друга 😊', 'Может позже, если всё сложится 😏', 'Не так быстро! 😄'];
    return replies[Math.floor(Math.random() * replies.length)];
  }
  
  // Согласие
  if (msg.includes('да') || msg.includes('конечно') || msg.includes('согласен') || msg.includes('точно')) {
    const replies = ['Отлично! 😊', 'Рада что мы на одной волне!', 'Супер! ✨', 'Класс!'];
    return replies[Math.floor(Math.random() * replies.length)];
  }
  
  // Вопросительные
  if (msg.includes('?')) {
    const replies = ['Хороший вопрос! 🤔', 'Дай подумать...', 'А ты как думаешь?', 'Интересно, почему ты спрашиваешь? 😊'];
    return replies[Math.floor(Math.random() * replies.length)];
  }
  
  // Дефолтные ответы
  const defaultReplies = [
    'Интересно, расскажи ещё! 🤔',
    'Ага, понимаю 😊',
    'Круто! ✨',
    'А расскажи подробнее?',
    'Мне нравится общаться с тобой 💕',
    'Хм, любопытно...',
    'Согласна! 😊',
    'Ты интересный человек!',
  ];
  return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
};

function App() {
  // Состояние пользователя
  const [user, setUser] = useState(null);
  
  // Текущий экран: welcome, swipe, chatList, chat
  const [currentScreen, setCurrentScreen] = useState('welcome');
  
  // Профили для свайпа
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Мэтчи и чаты
  const [matches, setMatches] = useState([]);
  const [chats, setChats] = useState({});
  
  // Попап мэтча
  const [showMatch, setShowMatch] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(null);
  
  // Активный чат
  const [activeChatId, setActiveChatId] = useState(null);

  // Обработчик регистрации
  const handleRegister = (name, lookingFor) => {
    // Если ищет девушек - он парень, и наоборот
    const userGender = lookingFor === 'female' ? 'male' : 'female';
    setUser({ name, lookingFor, avatar: userAvatars[userGender] });
    setProfiles(getProfiles(lookingFor));
    setCurrentScreen('swipe');
  };

  // Обработчик свайпа
  const handleSwipe = (direction) => {
    const profile = profiles[currentIndex];
    
    if (direction === 'right') {
      // 30% шанс мэтча
      const isMatch = Math.random() < 0.3;
      if (isMatch) {
        setCurrentMatch(profile);
        setMatches(prev => [...prev, profile]);
        setChats(prev => ({ ...prev, [profile.id]: [] }));
        setShowMatch(true);
      }
    }
    
    setCurrentIndex(prev => prev + 1);
  };

  // Закрыть попап мэтча
  const handleCloseMatch = () => {
    setShowMatch(false);
    setCurrentMatch(null);
  };

  // Открыть чат из попапа мэтча
  const handleOpenChatFromMatch = () => {
    setActiveChatId(currentMatch.id);
    setShowMatch(false);
    setCurrentMatch(null);
    setCurrentScreen('chat');
  };

  // Открыть список чатов
  const handleOpenChatList = () => {
    setCurrentScreen('chatList');
  };

  // Открыть конкретный чат
  const handleOpenChat = (matchId) => {
    setActiveChatId(matchId);
    setCurrentScreen('chat');
  };

  // Отправить сообщение
  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    
    const chatId = activeChatId;
    
    setChats(prev => ({
      ...prev,
      [chatId]: [
        ...prev[chatId],
        { text, fromMe: true, time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) }
      ]
    }));
    
    // Умный автоответ через 1-3 секунды
    const delay = 1000 + Math.random() * 2000;
    setTimeout(() => {
      const reply = getSmartReply(text);
      setChats(prev => ({
        ...prev,
        [chatId]: [
          ...prev[chatId],
          { text: reply, fromMe: false, time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) }
        ]
      }));
    }, delay);
  };

  // Вернуться назад
  const handleBack = () => {
    if (currentScreen === 'chat') {
      setCurrentScreen('chatList');
      setActiveChatId(null);
    } else if (currentScreen === 'chatList') {
      setCurrentScreen('swipe');
    }
  };

  // Получить текущий профиль для свайпа
  const currentProfile = profiles[currentIndex];
  const hasMoreProfiles = currentIndex < profiles.length;

  // Получить активный мэтч для чата
  const activeMatch = matches.find(m => m.id === activeChatId);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-[400px] min-h-[700px] h-auto bg-white rounded-3xl shadow-2xl overflow-hidden relative">
        
        {currentScreen === 'welcome' && (
          <WelcomeScreen onRegister={handleRegister} />
        )}
        
        {currentScreen === 'swipe' && (
          <SwipeScreen
            profiles={profiles}
            currentIndex={currentIndex}
            onSwipe={handleSwipe}
            matchCount={matches.length}
            onOpenChats={handleOpenChatList}
          />
        )}
        
        {currentScreen === 'chatList' && (
          <ChatList
            matches={matches}
            chats={chats}
            onBack={handleBack}
            onOpenChat={handleOpenChat}
          />
        )}
        
        {currentScreen === 'chat' && activeMatch && (
          <ChatScreen
            match={activeMatch}
            messages={chats[activeChatId] || []}
            onBack={handleBack}
            onSend={handleSendMessage}
          />
        )}
        
        {showMatch && currentMatch && (
          <MatchPopup
            match={currentMatch}
            userName={user?.name}
            userAvatar={user?.avatar}
            onClose={handleCloseMatch}
            onOpenChat={handleOpenChatFromMatch}
          />
        )}
        
      </div>
    </div>
  );
}

export default App;
