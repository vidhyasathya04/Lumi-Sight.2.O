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
import { useTranslation } from '@/hooks/use-translation';

type Message = {
  sender: 'user' | 'ai';
  text: string;
};

export default function ChatInterface() {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { t, currentLanguage } = useTranslation();

  useEffect(() => {
    setMessages([{ sender: 'ai', text: t('ai_greeting') }]);
  }, [currentLanguage, t]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollArea_ref.current.scrollHeight, behavior: 'smooth' });
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
        language: currentLanguage,
      });
      const aiMessage: Message = { sender: 'ai', text: response.advice };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI advice error:', error);
      const errorMessage: Message = { sender: 'ai', text: t('ai_error') };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto flex flex-col h-[calc(100vh-10rem)] shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Bot className="text-primary" /> {t('ask_health_ai_title')}
        </CardTitle>
        <CardDescription>{t('ask_health_ai_description')}</CardDescription>
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
            placeholder={t('ask_health_question_placeholder')}
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
