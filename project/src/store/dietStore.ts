import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  id: string;
  name: string;
  date: string;
  foods: FoodItem[];
}

interface DietState {
  meals: Meal[];
  addMeal: (meal: Meal) => void;
  addFoodToMeal: (mealId: string, food: FoodItem) => void;
  removeFoodFromMeal: (mealId: string, foodId: string) => void;
  getMealsByDate: (date: string) => Meal[];
}

export const useDietStore = create<DietState>()(
  persist(
    (set, get) => ({
      meals: [],
      addMeal: (meal) => set((state) => ({ meals: [...state.meals, meal] })),
      addFoodToMeal: (mealId, food) =>
        set((state) => ({
          meals: state.meals.map((meal) =>
            meal.id === mealId
              ? { ...meal, foods: [...meal.foods, food] }
              : meal
          ),
        })),
      removeFoodFromMeal: (mealId, foodId) =>
        set((state) => ({
          meals: state.meals.map((meal) =>
            meal.id === mealId
              ? { ...meal, foods: meal.foods.filter((food) => food.id !== foodId) }
              : meal
          ),
        })),
      getMealsByDate: (date) => {
        const { meals } = get();
        return meals.filter((meal) => meal.date === date);
      },
    }),
    {
      name: 'diet-storage',
    }
  )
);

