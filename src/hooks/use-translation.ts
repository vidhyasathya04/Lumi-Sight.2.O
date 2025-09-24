import { useUser } from '@/context/UserContext';

export function useTranslation() {
  const { t, currentLanguage, setLanguage } = useUser();
  return { t, currentLanguage, setLanguage };
}
