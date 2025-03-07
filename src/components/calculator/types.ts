import { z } from 'zod';

export const formSchema = z.object({
  propertyType: z.enum(['residential', 'commercial', 'industrial']),
  connectionPhase: z.enum(['single', 'three']),
  monthlyConsumption: z.number().min(0),
  powerOutput: z.number().min(0),
  roofType: z.enum(['flat', 'sloped', 'mixed']),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9)
});

export type FormData = z.infer<typeof formSchema>;

export type QuestionType = 
  | { type: 'welcome' }
  | { type: 'choice'; options: { value: string; label: string }[] }
  | { type: 'number'; min: number; max: number; unit: string }
  | { type: 'contact' }
  | { type: 'thanks' };

export interface Question {
  type: QuestionType['type'];
  title: string;
  description?: string;
  field?: keyof FormData;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  unit?: string;
}