import type { Question } from './types';
import type { TFunction } from 'i18next';

export const getQuestions = (t: TFunction): Question[] => [
  {
    type: 'welcome',
    title: 'Zatražite Ponudu',
    description: 'Saznajte koliko možete uštedjeti uz solarnu energiju! Ispunite kratki upitnik i primite personaliziranu ponudu prilagođenu vašim potrebama.'
  },
  {
    type: 'choice',
    title: 'Koju vrstu objekta planirate opremiti?',
    field: 'propertyType',
    options: [
      { value: 'residential', label: 'Stambeni objekt' },
      { value: 'commercial', label: 'Poslovni objekt' },
      { value: 'industrial', label: 'Industrijski objekt' }
    ]
  },
  {
    type: 'choice',
    title: 'Odaberite vrstu priključka',
    field: 'connectionPhase',
    options: [
      { value: 'single', label: 'Jednofazni' },
      { value: 'three', label: 'Trofazni' }
    ]
  },
  {
    type: 'number',
    title: 'Kolika je vaša mjesečna potrošnja u kWh?',
    description: 'Ovaj podatak možete pronaći na vašem računu za struju',
    field: 'monthlyConsumption',
    min: 100,
    max: 10000,
    unit: 'kWh'
  },
  {
    type: 'number',
    title: 'Koju snagu solarnog sustava želite?',
    field: 'powerOutput',
    min: 3,
    max: 100,
    unit: 'kW'
  },
  {
    type: 'choice',
    title: 'Kakav krov imate?',
    field: 'roofType',
    options: [
      { value: 'flat', label: 'Ravni krov' },
      { value: 'sloped', label: 'Kosi krov' },
      { value: 'mixed', label: 'Kombinirani krov' }
    ]
  },
  {
    type: 'contact',
    title: 'Još samo malo!',
    description: 'Molimo unesite vaše kontakt podatke kako biste dobili personaliziranu ponudu za solarni sustav.'
  },
  {
    type: 'thanks',
    title: 'Hvala Vam!',
    description: 'Zaprimili smo vaše podatke i uskoro ćemo vas kontaktirati s detaljnom ponudom za vaš solarni sustav.'
  }
];