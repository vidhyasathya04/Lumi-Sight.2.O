
'use client';

import { getPersonalizedHealthAdvice } from '@/ai/flows/personalized-health-advice';
import { useUser } from '@/context/UserContext';
import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Bot, Loader2, Send, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

type Message = {
  sender: 'user' | 'ai';
  text: string;
};

const languageGreetings = {
  'English': 'Hello! I\'m your health assistant. What would you like to know?',
  'Español (Spanish)': '¡Hola! Soy tu asistente de salud. ¿Qué te gustaría saber?',
  'Français (French)': 'Bonjour! Je suis votre assistant de santé. Que souhaitez-vous savoir?',
  'Deutsch (German)': 'Hallo! Ich bin Ihr Gesundheitsassistent. Was möchten Sie wissen?',
  '中文 (Chinese)': '你好！我是你的健康助手。你想知道什么？',
  '日本語 (Japanese)': 'こんにちは！私はあなたの健康アシスタントです。何を知りたいですか？',
  'Português (Portuguese)': 'Olá! Sou seu assistente de saúde. O que você gostaria de saber?',
  'Русский (Russian)': 'Здравствуйте! Я ваш помощник по здоровью. Что бы вы хотели узнать?',
  'العربية (Arabic)': 'مرحباً! أنا مساعدك الصحي. ماذا تود أن تعرف؟',
  'हिंदी (Hindi)': 'नमस्ते! मैं आपका स्वास्थ्य सहायक हूं। आप क्या जानना चाहते हैं?',
  'বাংলা (Bengali)': 'নমস্কার! আমি আপনার স্বাস্থ্য সহায়ক। আপনি কি জানতে চান?',
  'தமிழ் (Tamil)': 'வணக்கம்! நான் உங்கள் சுகாதார உதவியாளர். என்ன தெரிந்து கொள்ள விரும்புகிறீர்கள்?',
  'తెలుగు (Telugu)': 'నమస్కారం! నేను మీ ఆరోగ్య సహాయకుడిని. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?',
  'मराठी (Marathi)': 'नमस्कार! मी तुमचा आरोग्य सहाय्यक आहे. तुम्हाला काय जाणून घ्यायचे आहे?',
  'ગુજરાતી (Gujarati)': 'નમસ્તે! હું તમારો સ્વાસ્થ્ય સહાયક છું. તમે શું જાણવા માંગો છો?',
  'ಕನ್ನಡ (Kannada)': 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಆರೋಗ್ಯ ಸಹಾಯಕ. ನೀವು ಏನು ತಿಳಿಯಲು ಬಯಸುತ್ತೀರಿ?',
  'മലയാളം (Malayalam)': 'നമസ്കാരം! ഞാൻ നിങ്ങളുടെ ആരോഗ്യ സഹായിയാണ്. നിങ്ങൾക്കെന്താണ് അറിയേണ്ടത്?',
  'ਪੰਜਾਬੀ (Punjabi)': 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਸਿਹਤ ਸਹਾਇਕ ਹਾਂ। ਤੁਸੀਂ ਕੀ ਜਾਣਨਾ ਚਾਹੁੰਦੇ ਹੋ?',
  'اردو (Urdu)': 'ہیلو! میں آپ کا ہیلتھ اسسٹنٹ ہوں۔ آپ کیا جاننا چاہیں گے؟',
  'ଓଡ଼ିଆ (Odia)': 'ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କର ସ୍ୱାସ୍ଥ୍ୟ ସହାୟକ। ଆପଣ କଣ ଜାଣିବାକୁ ଚାହାଁନ୍ତି?',
};

export default function ChatInterface() {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const greeting = languageGreetings[user?.language as keyof typeof languageGreetings] || languageGreetings['English'];
    setMessages([{ sender: 'ai', text: greeting }]);
  }, [user?.language]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !user) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getPersonalizedHealthAdvice({
        query: input,
        profile: {
          name: user.name || 'User',
          age: user.age || 30,
          gender: user.gender || 'Other',
          location: user.location || 'Unknown',
          hasDiabetes: user.hasDiabetes || 'unknown',
          bloodGroup: user.bloodGroup || 'O+',
          lastEyeCheckup: user.lastEyeCheckup || 'unknown',
          willingToDonateBlood: user.willingToDonateBlood || 'maybe',
        },
        language: user.language || 'English',
      });
      const aiMessage: Message = { sender: 'ai', text: response.advice };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI advice error:', error);
      const errorMessage: Message = { sender: 'ai', text: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto flex flex-col h-[calc(100vh-10rem)] shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Bot className="text-primary" /> Ask Health AI
        </CardTitle>
        <CardDescription>Your personal AI health assistant.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={cn('flex items-start gap-3', msg.sender === 'user' ? 'justify-end' : '')}>
                {msg.sender === 'ai' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={20}/></AvatarFallback>
                  </Avatar>
                )}
                <div className={cn('rounded-lg p-3 max-w-[75%]', msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
                {msg.sender === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback><UserIcon size={20}/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                 <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={20}/></AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg p-3 bg-muted flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin"/>
                  </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <div className="p-4 border-t">
        <div className="relative">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask a health question..."
            className="pr-12"
            disabled={isLoading}
          />
          <Button
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
