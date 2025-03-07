import React, { useState, useRef, useEffect } from 'react';
import { animate, stagger } from '@motionone/dom';
import type { FormData, Question } from './types';
import { getQuestions } from './questions';
import { useTranslation } from 'react-i18next';

interface InteractiveFormProps {
  lang?: string;
}

export default function InteractiveForm({ lang = 'hr' }: InteractiveFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const { t, i18n } = useTranslation();
  
  // Force language change immediately
  if (lang && i18n.language !== lang) {
    console.log(`Changing language from ${i18n.language} to ${lang}`);
    i18n.changeLanguage(lang);
  }
  
  // Also handle in effect for re-renders
  useEffect(() => {
    if (lang && i18n.language !== lang) {
      console.log(`[Effect] Changing language from ${i18n.language} to ${lang}`);
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);
  
  // Log current language when rendering
  console.log(`Current language: ${i18n.language}, prop lang: ${lang}`);
  
  // Get translated questions with memo to update when language changes
  const questions = React.useMemo(() => getQuestions(t), [t, i18n.language]);
  const currentQuestion = questions[currentStep];

  // Reset handler
  useEffect(() => {
    const handleReset = () => {
      setCurrentStep(0);
      setFormData({});
    };

    document.addEventListener('reset-calculator', handleReset);
    return () => document.removeEventListener('reset-calculator', handleReset);
  }, []);

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleChoiceSelect = (value: string) => {
    if (currentQuestion.field) {
      setFormData(prev => ({ ...prev, [currentQuestion.field!]: value }));
      handleNext();
    }
  };

  const handleNumberInput = (value: number) => {
    if (currentQuestion.field) {
      setFormData(prev => ({ ...prev, [currentQuestion.field!]: value }));
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create the form data with all collected information
      const fullFormData = new FormData();
      
      // Add form name for Netlify
      fullFormData.append('form-name', 'solar-inquiry');
      
      // Add all collected data
      Object.entries(formData).forEach(([key, value]) => {
        fullFormData.append(key, value?.toString() || '');
      });

      // Submit to Netlify Forms
      await fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(fullFormData as any).toString()
      });

      // Move to thank you step
      handleNext();
    } catch (error) {
      console.error('Form submission error:', error);
      alert(t('calculator.errorMessage') || 'An error occurred. Please try again.');
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'welcome':
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">{currentQuestion.title}</h2>
            <p className="text-gray-600 mb-8">{currentQuestion.description}</p>
            <button
              onClick={handleNext}
              className="bg-secondary text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              {t('calculator.welcome.start')}
            </button>
          </div>
        );

      case 'choice':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary mb-6">{currentQuestion.title}</h2>
            <div className="grid gap-4 max-w-md mx-auto">
              {currentQuestion.options?.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleChoiceSelect(option.value)}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left flex items-center space-x-3"
                >
                  <div className="w-4 h-4 rounded-full border-2 border-secondary flex-shrink-0">
                    {formData[currentQuestion.field!] === option.value && (
                      <div className="w-full h-full rounded-full bg-secondary transform scale-50" />
                    )}
                  </div>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 'number':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">{currentQuestion.title}</h2>
            {currentQuestion.description && (
              <p className="text-gray-600 mb-6">{currentQuestion.description}</p>
            )}
            <div className="max-w-xs mx-auto">
              <input
                type="range"
                min={currentQuestion.min}
                max={currentQuestion.max}
                value={formData[currentQuestion.field!] || currentQuestion.min}
                onChange={(e) => handleNumberInput(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-2xl font-bold text-secondary mt-4">
                {formData[currentQuestion.field!] || currentQuestion.min}
                {currentQuestion.unit}
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <form 
            ref={formRef}
            onSubmit={handleContactSubmit} 
            className="max-w-md mx-auto"
            name="solar-inquiry"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="solar-inquiry" />
            <p className="hidden">
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>

            {/* Hidden fields for collected data */}
            <input type="hidden" name="propertyType" value={formData.propertyType || ''} />
            <input type="hidden" name="connectionPhase" value={formData.connectionPhase || ''} />
            <input type="hidden" name="monthlyConsumption" value={formData.monthlyConsumption || ''} />
            <input type="hidden" name="powerOutput" value={formData.powerOutput || ''} />
            <input type="hidden" name="roofType" value={formData.roofType || ''} />

            <h2 className="text-2xl font-bold text-primary mb-4">{currentQuestion.title}</h2>
            <p className="text-gray-600 mb-6">{currentQuestion.description}</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('calculator.contact.fullName')}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('calculator.contact.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('calculator.contact.phone')}
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-secondary text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                {t('calculator.contact.submit')}
              </button>
            </div>
          </form>
        );

      case 'thanks':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">{currentQuestion.title}</h2>
            <p className="text-gray-600">{currentQuestion.description}</p>
          </div>
        );
    }
  };

  useEffect(() => {
    const progress = (currentStep / (questions.length - 1)) * 100;
    animate(
      '.progress-bar',
      { width: `${progress}%` },
      { duration: 0.6, easing: 'ease-in-out' }
    );

    if (questionRef.current) {
      questionRef.current.style.transform = 'none';
      
      animate(
        questionRef.current,
        {
          opacity: [0, 1],
          scale: [0.98, 1]
        },
        {
          duration: 0.4,
          easing: [0.4, 0, 0.2, 1]
        }
      );

      const elements = questionRef.current.querySelectorAll(
        'button, input, label, h2, p'
      );
      
      animate(
        elements,
        {
          opacity: [0, 1],
          y: [10, 0]
        },
        {
          duration: 0.3,
          delay: stagger(0.05),
          easing: [0.4, 0, 0.2, 1]
        }
      );
    }
  }, [currentStep]);

  return (
    <section 
      id="calculator"
      className="py-20 bg-gray-50" 
      ref={containerRef}
      style={{ overflow: 'hidden' }}
      tabIndex={-1}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="progress-bar h-full bg-secondary rounded-full" 
              style={{ 
                width: '0%',
                transition: 'width 0.6s ease-in-out'
              }} 
            />
          </div>
        </div>

        <div className="relative">
          <div 
            className="min-h-[400px] flex items-center justify-center"
            style={{ perspective: '1000px' }}
          >
            <div 
              ref={questionRef}
              className="w-full"
              style={{ 
                willChange: 'transform, opacity',
                transformOrigin: 'center center'
              }}
            >
              {renderQuestion()}
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        {currentStep > 0 && currentQuestion.type !== 'thanks' && (
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              className="text-gray-600 hover:text-gray-900 transition-all duration-300 px-4 py-2 rounded-lg"
              disabled={currentStep === 0}
              style={{ 
                opacity: currentStep === 0 ? 0.5 : 1,
                transform: `scale(${currentStep === 0 ? 0.98 : 1})`
              }}
            >
              {t('calculator.navigation.back')}
            </button>
            {currentQuestion.type !== 'choice' && currentQuestion.type !== 'contact' && (
              <button
                onClick={handleNext}
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 px-4 py-2 rounded-lg"
                disabled={currentStep === questions.length - 1}
                style={{ 
                  opacity: currentStep === questions.length - 1 ? 0.5 : 1,
                  transform: `scale(${currentStep === questions.length - 1 ? 0.98 : 1})`
                }}
              >
                {t('calculator.navigation.next')}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}