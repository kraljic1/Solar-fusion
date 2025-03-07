import React, { useState, useRef, useEffect } from 'react';
import { animate, stagger } from '@motionone/dom';
import { z } from 'zod';

// All translations remain the same
const translations = {
  hr: {
    welcome: {
      title: 'Solarni Kalkulator',
      description: 'Saznajte koliko možete uštedjeti uz solarnu energiju. Odgovorite na nekoliko jednostavnih pitanja za personalizirano solarno rješenje.',
      start: 'Pokreni Kalkulator →'
    },
    contact: {
      title: 'Još samo malo!',
      description: 'Molimo unesite vaše kontakt podatke kako biste dobili personaliziranu ponudu za solarni sustav.',
      fullName: 'Ime i Prezime',
      email: 'Email',
      phone: 'Telefon',
      submit: 'Zatražite Ponudu'
    },
    thanks: {
      title: 'Hvala Vam!',
      description: 'Zaprimili smo vaše podatke i uskoro ćemo vas kontaktirati s detaljnom ponudom za vaš solarni sustav.'
    },
    navigation: {
      back: '← Natrag',
      next: 'Dalje →'
    }
  },
  en: {
    welcome: {
      title: 'Solar Calculator',
      description: 'Find out how much you can save with solar energy. Answer a few simple questions to get your personalized solar solution.',
      start: 'Start Calculator →'
    },
    contact: {
      title: 'Almost there!',
      description: 'Please provide your contact information to receive your personalized solar solution proposal.',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      submit: 'Get My Solar Proposal'
    },
    thanks: {
      title: 'Thank You!',
      description: 'We have received your information and will contact you shortly with a detailed proposal for your solar system.'
    },
    navigation: {
      back: '← Back',
      next: 'Next →'
    }
  },
  sl: {
    welcome: {
      title: 'Solarni Kalkulator',
      description: 'Ugotovite, koliko lahko prihranite s sončno energijo. Odgovorite na nekaj preprostih vprašanj za vašo prilagojeno solarno rešitev.',
      start: 'Začni Kalkulator →'
    },
    contact: {
      title: 'Še malo!',
      description: 'Prosimo, vnesite vaše kontaktne podatke za prejem prilagojene ponudbe za solarni sistem.',
      fullName: 'Ime in Priimek',
      email: 'Email',
      phone: 'Telefon',
      submit: 'Pridobite Ponudbo'
    },
    thanks: {
      title: 'Hvala!',
      description: 'Prejeli smo vaše podatke in vas bomo kmalu kontaktirali s podrobno ponudbo za vaš solarni sistem.'
    },
    navigation: {
      back: '← Nazaj',
      next: 'Naprej →'
    }
  },
  de: {
    welcome: {
      title: 'Solar-Rechner',
      description: 'Finden Sie heraus, wie viel Sie mit Solarenergie sparen können. Beantworten Sie einige einfache Fragen für Ihre personalisierte Solar-Lösung.',
      start: 'Rechner Starten →'
    },
    contact: {
      title: 'Fast geschafft!',
      description: 'Bitte geben Sie Ihre Kontaktdaten ein, um ein personalisiertes Angebot für Ihre Solaranlage zu erhalten.',
      fullName: 'Vor- und Nachname',
      email: 'E-Mail',
      phone: 'Telefon',
      submit: 'Angebot Anfordern'
    },
    thanks: {
      title: 'Vielen Dank!',
      description: 'Wir haben Ihre Informationen erhalten und werden Sie in Kürze mit einem detaillierten Angebot für Ihre Solaranlage kontaktieren.'
    },
    navigation: {
      back: '← Zurück',
      next: 'Weiter →'
    }
  },
  it: {
    welcome: {
      title: 'Calcolatore Solare',
      description: 'Scopri quanto puoi risparmiare con l\'energia solare. Rispondi a poche semplici domande per ottenere la tua soluzione solare personalizzata.',
      start: 'Avvia Calcolatore →'
    },
    contact: {
      title: 'Quasi fatto!',
      description: 'Inserisci i tuoi dati di contatto per ricevere una proposta personalizzata per il tuo sistema solare.',
      fullName: 'Nome e Cognome',
      email: 'Email',
      phone: 'Telefono',
      submit: 'Richiedi Preventivo'
    },
    thanks: {
      title: 'Grazie!',
      description: 'Abbiamo ricevuto le tue informazioni e ti contatteremo presto con una proposta dettagliata per il tuo sistema solare.'
    },
    navigation: {
      back: '← Indietro',
      next: 'Avanti →'
    }
  },
  hu: {
    welcome: {
      title: 'Napelem Kalkulátor',
      description: 'Tudja meg, mennyit spórolhat napenergiával. Válaszoljon néhány egyszerű kérdésre a személyre szabott napelemes megoldásért.',
      start: 'Kalkulátor Indítása →'
    },
    contact: {
      title: 'Már majdnem kész!',
      description: 'Kérjük, adja meg elérhetőségeit, hogy személyre szabott ajánlatot készíthessünk napelemes rendszeréhez.',
      fullName: 'Teljes Név',
      email: 'Email',
      phone: 'Telefon',
      submit: 'Kérem az Ajánlatot'
    },
    thanks: {
      title: 'Köszönjük!',
      description: 'Megkaptuk adatait és hamarosan kapcsolatba lépünk Önnel a napelemes rendszerére vonatkozó részletes ajánlattal.'
    },
    navigation: {
      back: '← Vissza',
      next: 'Tovább →'
    }
  }
};

// Form data validation schema
const formSchema = z.object({
  propertyType: z.enum(['residential', 'commercial', 'industrial']),
  connectionPhase: z.enum(['single', 'three']),
  monthlyConsumption: z.number().min(0),
  powerOutput: z.number().min(0),
  roofType: z.enum(['flat', 'sloped', 'mixed']),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9)
});

type FormData = z.infer<typeof formSchema>;

type QuestionType = 
  | { type: 'welcome' }
  | { type: 'choice'; options: { value: string; label: string }[] }
  | { type: 'number'; min: number; max: number; unit: string }
  | { type: 'contact' }
  | { type: 'thanks' };

interface Question {
  type: QuestionType['type'];
  title: string;
  description?: string;
  field?: keyof FormData;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  unit?: string;
}

const questions: Question[] = [
  {
    type: 'welcome',
    title: 'Solar Power Calculator',
    description: 'Find out how much you can save with solar energy. Answer a few simple questions to get your personalized solar solution.'
  },
  {
    type: 'choice',
    title: 'What type of property do you plan to work on?',
    field: 'propertyType',
    options: [
      { value: 'residential', label: 'Residential Property' },
      { value: 'commercial', label: 'Commercial Property' },
      { value: 'industrial', label: 'Industrial Property' }
    ]
  },
  {
    type: 'choice',
    title: 'Select the phase type of the connection',
    field: 'connectionPhase',
    options: [
      { value: 'single', label: 'Single Phase' },
      { value: 'three', label: 'Three Phase' }
    ]
  },
  {
    type: 'number',
    title: 'What is your monthly consumption in kWh?',
    description: 'You can find this information on your electricity bill',
    field: 'monthlyConsumption',
    min: 100,
    max: 10000,
    unit: 'kWh'
  },
  {
    type: 'number',
    title: 'What power output do you want for your solar system?',
    field: 'powerOutput',
    min: 3,
    max: 100,
    unit: 'kW'
  },
  {
    type: 'choice',
    title: 'What type of roof do you have?',
    field: 'roofType',
    options: [
      { value: 'flat', label: 'Flat Roof' },
      { value: 'sloped', label: 'Sloped Roof' },
      { value: 'mixed', label: 'Mixed/Complex Roof' }
    ]
  },
  {
    type: 'contact',
    title: 'Almost there!',
    description: 'Please provide your contact information to receive your personalized solar solution proposal.'
  },
  {
    type: 'thanks',
    title: 'Thank You!',
    description: 'We have received your information and will contact you shortly with a detailed proposal for your solar system.'
  }
];

interface InteractiveFormProps {
  lang?: string;
}

export default function InteractiveForm({ lang = 'hr' }: InteractiveFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const t = translations[lang as keyof typeof translations] || translations.hr;

  const currentQuestion = questions[currentStep];

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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form data:', formData);
    handleNext();
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'welcome':
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">{t.welcome.title}</h2>
            <p className="text-gray-600 mb-8">{t.welcome.description}</p>
            <button
              onClick={handleNext}
              className="bg-secondary text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              {t.welcome.start}
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
          <form onSubmit={handleContactSubmit} className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-4">{t.contact.title}</h2>
            <p className="text-gray-600 mb-6">{t.contact.description}</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.contact.fullName}</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.contact.email}</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.contact.phone}</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-secondary text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                {t.contact.submit}
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
            <h2 className="text-3xl font-bold text-primary mb-4">{t.thanks.title}</h2>
            <p className="text-gray-600">{t.thanks.description}</p>
          </div>
        );
    }
  };

  useEffect(() => {
    // Animate progress bar smoothly
    const progress = (currentStep / (questions.length - 1)) * 100;
    animate(
      '.progress-bar',
      { width: `${progress}%` },
      { duration: 0.6, easing: 'ease-in-out' }
    );

    // Smooth fade transition for questions
    if (questionRef.current) {
      // Reset any existing transforms
      questionRef.current.style.transform = 'none';
      
      // Fade out and in with a subtle scale
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

      // Animate form elements with stagger
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
      className="py-20 bg-gray-50" 
      ref={containerRef}
      style={{ overflow: 'hidden' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress bar */}
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

        {/* Question container with stable height */}
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

        {/* Navigation with fixed height and smooth transitions */}
        {currentQuestion.type !== 'welcome' && currentQuestion.type !== 'thanks' && (
          <div 
            className="flex justify-between mt-8 h-[44px]"
            style={{ opacity: 0.99 }} // Prevents Safari flickering
          >
            <button
              onClick={handlePrevious}
              className="text-gray-600 hover:text-gray-900 transition-all duration-300 px-4 py-2 rounded-lg"
              disabled={currentStep === 0}
              style={{ 
                opacity: currentStep === 0 ? 0.5 : 1,
                transform: `scale(${currentStep === 0 ? 0.98 : 1})`
              }}
            >
              {t.navigation.back}
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
                {t.navigation.next}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}