import React from 'react';
import { Button } from './ui/button';
import { Globe } from 'lucide-react';

const LanguageToggle = ({ language, setLanguage }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
      className="flex items-center gap-2 text-slate-700 hover:text-teal-700 hover:bg-teal-50 transition-colors"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{language === 'en' ? 'മലയാളം' : 'English'}</span>
    </Button>
  );
};

export default LanguageToggle;
