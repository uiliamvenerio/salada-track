export interface Client {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  height: number; // in cm
  weight: number; // in kg
  goals: string;
  dietaryRestrictions: string[];
  notes: string;
  startDate: string;
  lastVisit: string;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  ingredients: string[];
  instructions: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface NutritionPlan {
  id: string;
  clientId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  dailyCalorieTarget: number;
  proteinTarget: number; // in grams
  carbsTarget: number; // in grams
  fatTarget: number; // in grams
  meals: {
    [key: string]: Meal[]; // key is day of week (monday, tuesday, etc.)
  };
  notes: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: 'initial' | 'followUp' | 'assessment';
  notes: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface ProgressRecord {
  id: string;
  clientId: string;
  date: string;
  weight: number;
  bodyFatPercentage?: number;
  measurements?: {
    waist?: number;
    hips?: number;
    chest?: number;
    arms?: number;
    thighs?: number;
  };
  notes: string;
}