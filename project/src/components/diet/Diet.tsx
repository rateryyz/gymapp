import React, { useState } from "react";
import { format } from "date-fns";
import { Plus, Utensils } from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDietStore, FoodItem, Meal } from "../store/dietStore";
import { useLanguage } from "../context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Diet() {
  const { language } = useLanguage();
  const { meals, addMeal, addFoodToMeal, removeFoodFromMeal, getMealsByDate } =
    useDietStore();
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [newFood, setNewFood] = useState<FoodItem>({
    id: "",
    name: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [newMealName, setNewMealName] = useState("");

  const dailyMeals = getMealsByDate(selectedDate);

  const handleAddFood = (mealId: string) => {
    if (newFood.name && newFood.calories > 0) {
      addFoodToMeal(mealId, { ...newFood, id: crypto.randomUUID() });
      setNewFood({
        id: "",
        name: "",
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      });
    }
  };

  const handleAddMeal = () => {
    if (newMealName) {
      addMeal({
        id: crypto.randomUUID(),
        name: newMealName,
        date: selectedDate,
        foods: [],
      });
      setNewMealName("");
    }
  };

  const calculateTotalNutrients = (foods: FoodItem[]) => {
    return foods.reduce(
      (acc, food) => ({
        calories: acc.calories + food.calories,
        protein: acc.protein + food.protein,
        carbs: acc.carbs + food.carbs,
        fat: acc.fat + food.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const totalDailyNutrients = calculateTotalNutrients(
    dailyMeals.flatMap((meal) => meal.foods)
  );

  const chartData = [
    { name: "Protein", value: totalDailyNutrients.protein },
    { name: "Carbs", value: totalDailyNutrients.carbs },
    { name: "Fat", value: totalDailyNutrients.fat },
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-8">
          <Utensils className="h-12 w-12 text-orange-500" />
        </div>
        <h2 className="text-center text-3xl font-bebas-neue text-white mb-8">
          {language === "English" ? "Diet Tracker" : "Controle de Dieta"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>
                {language === "English" ? "Add Meal" : "Adicionar Refeição"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  value={newMealName}
                  onChange={(e) => setNewMealName(e.target.value)}
                  placeholder={
                    language === "English" ? "Meal name" : "Nome da refeição"
                  }
                  className="bg-gray-700 text-white"
                />
                <Button
                  onClick={handleAddMeal}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {language === "English" ? "Add" : "Adicionar"}
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>
                {language === "English" ? "Daily Summary" : "Resumo Diário"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Calories: {totalDailyNutrients.calories}</p>
              <p>Protein: {totalDailyNutrients.protein}g</p>
              <p>Carbs: {totalDailyNutrients.carbs}g</p>
              <p>Fat: {totalDailyNutrients.fat}g</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8">
          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>
                {language === "English"
                  ? "Macronutrient Distribution"
                  : "Distribuição de Macronutrientes"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8">
          {dailyMeals.map((meal) => (
            <Card key={meal.id} className="bg-gray-800 text-white mb-4">
              <CardHeader>
                <CardTitle>{meal.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {meal.foods.map((food) => (
                  <div
                    key={food.id}
                    className="flex justify-between items-center mb-2"
                  >
                    <span>{food.name}</span>
                    <span>{food.calories} cal</span>
                    <Button
                      onClick={() => removeFoodFromMeal(meal.id, food.id)}
                      variant="destructive"
                      size="sm"
                    >
                      {language === "English" ? "Remove" : "Remover"}
                    </Button>
                  </div>
                ))}
                <div className="mt-4">
                  <Input
                    type="text"
                    value={newFood.name}
                    onChange={(e) =>
                      setNewFood({ ...newFood, name: e.target.value })
                    }
                    placeholder={
                      language === "English" ? "Food name" : "Nome do alimento"
                    }
                    className="bg-gray-700 text-white mb-2"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      value={newFood.calories}
                      onChange={(e) =>
                        setNewFood({
                          ...newFood,
                          calories: Number(e.target.value),
                        })
                      }
                      placeholder={
                        language === "English" ? "Calories" : "Calorias"
                      }
                      className="bg-gray-700 text-white"
                    />
                    <Input
                      type="number"
                      value={newFood.protein}
                      onChange={(e) =>
                        setNewFood({
                          ...newFood,
                          protein: Number(e.target.value),
                        })
                      }
                      placeholder={
                        language === "English" ? "Protein (g)" : "Proteína (g)"
                      }
                      className="bg-gray-700 text-white"
                    />
                    <Input
                      type="number"
                      value={newFood.carbs}
                      onChange={(e) =>
                        setNewFood({
                          ...newFood,
                          carbs: Number(e.target.value),
                        })
                      }
                      placeholder={
                        language === "English"
                          ? "Carbs (g)"
                          : "Carboidratos (g)"
                      }
                      className="bg-gray-700 text-white"
                    />
                    <Input
                      type="number"
                      value={newFood.fat}
                      onChange={(e) =>
                        setNewFood({ ...newFood, fat: Number(e.target.value) })
                      }
                      placeholder={
                        language === "English" ? "Fat (g)" : "Gordura (g)"
                      }
                      className="bg-gray-700 text-white"
                    />
                  </div>
                  <Button
                    onClick={() => handleAddFood(meal.id)}
                    className="bg-orange-600 hover:bg-orange-700 mt-2"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {language === "English" ? "Add Food" : "Adicionar Alimento"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
