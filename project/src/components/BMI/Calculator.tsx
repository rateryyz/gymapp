import React, { useState } from 'react';
import { CalculatorIcon as CalcIcon } from 'lucide-react';
import { useLanguage } from "../../context/LanguageContext";

export function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState<number | null>(null);
  const { language } = useLanguage();

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const calculatedBMI = weightInKg / (heightInMeters * heightInMeters);
    setBMI(Math.round(calculatedBMI * 10) / 10);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: language === "English" ? 'Underweight' : language === "Portuguese" ? 'Abaixo do peso' : 'Bajo peso', color: 'text-blue-500' };
    if (bmi < 25) return { category: language === "English" ? 'Normal weight' : language === "Portuguese" ? 'Peso normal' : 'Peso normal', color: 'text-green-500' };
    if (bmi < 30) return { category: language === "English" ? 'Overweight' : language === "Portuguese" ? 'Sobrepeso' : 'Sobrepeso', color: 'text-yellow-500' };
    return { category: language === "English" ? 'Obese' : language === "Portuguese" ? 'Obeso' : 'Obeso', color: 'text-red-500' };
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
        <div>
          <div className="flex justify-center">
            <CalcIcon className="h-12 w-12 text-orange-500" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bebas-neue text-white">
            {language === "English" ? "BMI Calculator" : language === "Portuguese" ? "Calculadora de IMC" : "Calculadora de IMC"}
          </h2>
        </div>

        <form onSubmit={calculateBMI} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="height" className="sr-only">
                {language === "English" ? "Height (cm)" : language === "Portuguese" ? "Altura (cm)" : "Altura (cm)"}
              </label>
              <input
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder={language === "English" ? "Height (cm)" : language === "Portuguese" ? "Altura (cm)" : "Altura (cm)"}
                required
              />
            </div>

            <div>
              <label htmlFor="weight" className="sr-only">
                {language === "English" ? "Weight (kg)" : language === "Portuguese" ? "Peso (kg)" : "Peso (kg)"}
              </label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder={language === "English" ? "Weight (kg)" : language === "Portuguese" ? "Peso (kg)" : "Peso (kg)"}
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              {language === "English" ? "Calculate BMI" : language === "Portuguese" ? "Calcular IMC" : "Calcular IMC"}
            </button>
          </div>
        </form>

        {bmi && (
          <div className="mt-6 p-4 bg-gray-700 rounded-md text-white">
            <p className="text-lg">
              {language === "English" ? "Your BMI is: " : language === "Portuguese" ? "Seu IMC é: " : "Tu IMC es: "}
              <span className="font-bold">{bmi}</span>
            </p>
            <p className="mt-2">
              {language === "English" ? "Category:" : language === "Portuguese" ? "Categoria:" : "Categoría:"}{' '}
              <span className={`font-medium ${getBMICategory(bmi).color}`}>
                {getBMICategory(bmi).category}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
