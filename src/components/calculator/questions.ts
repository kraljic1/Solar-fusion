import type { Question } from './types';
import type { TFunction } from 'i18next';

export const getQuestions = (t: TFunction): Question[] => [
  {
    type: 'welcome',
    title: t('calculator.welcome.title'),
    description: t('calculator.welcome.description')
  },
  {
    type: 'choice',
    title: t('calculator.questions.propertyType.title'),
    field: 'propertyType',
    options: [
      { value: 'residential', label: t('calculator.questions.propertyType.options.residential') },
      { value: 'commercial', label: t('calculator.questions.propertyType.options.commercial') },
      { value: 'industrial', label: t('calculator.questions.propertyType.options.industrial') }
    ]
  },
  {
    type: 'choice',
    title: t('calculator.questions.connectionPhase.title'),
    field: 'connectionPhase',
    options: [
      { value: 'single', label: t('calculator.questions.connectionPhase.options.single') },
      { value: 'three', label: t('calculator.questions.connectionPhase.options.three') }
    ]
  },
  {
    type: 'number',
    title: t('calculator.questions.monthlyConsumption.title'),
    description: t('calculator.questions.monthlyConsumption.description'),
    field: 'monthlyConsumption',
    min: 100,
    max: 10000,
    unit: 'kWh'
  },
  {
    type: 'number',
    title: t('calculator.questions.powerOutput.title'),
    field: 'powerOutput',
    min: 3,
    max: 100,
    unit: 'kW'
  },
  {
    type: 'choice',
    title: t('calculator.questions.roofType.title'),
    field: 'roofType',
    options: [
      { value: 'flat', label: t('calculator.questions.roofType.options.flat') },
      { value: 'sloped', label: t('calculator.questions.roofType.options.sloped') },
      { value: 'mixed', label: t('calculator.questions.roofType.options.mixed') }
    ]
  },
  {
    type: 'contact',
    title: t('calculator.contact.title'),
    description: t('calculator.contact.description')
  },
  {
    type: 'thanks',
    title: t('calculator.thanks.title'),
    description: t('calculator.thanks.description')
  }
];