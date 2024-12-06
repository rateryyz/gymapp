import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

export function Hero() {
  const { language } = useLanguage();

  return (
    <div className="relative bg-gray-900 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-20"
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Gym equipment"
        />
      </div>
      <div className="relative max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-bebas-neue">
          {language === "English" ? "Transform Your Fitness Journey" : language === "Portuguese" ? "Transforme Sua Jornada Fitness" : "Transforma Tu Viaje Fitness"}
        </h1>
        <p className="mt-6 text-xl text-gray-300">
          {language === "English"
            ? "Connect with professional trainers, track your progress, and achieve your fitness goals. Our digital platform makes it easy to manage workouts and stay motivated."
            : language === "Portuguese"
            ? "Conecte-se com treinadores profissionais, acompanhe seu progresso e atinja seus objetivos de fitness. Nossa plataforma digital facilita o gerenciamento de treinos e mantém você motivado."
            : "Conéctate con entrenadores profesionales, sigue tu progreso y alcanza tus objetivos de fitness. Nuestra plataforma digital facilita la gestión de entrenamientos y te mantiene motivado."}
        </p>
        <div className="mt-10 flex justify-center space-x-4">
          <Link
            to="/register"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            {language === "English" ? "Get Started" : language === "Portuguese" ? "Comece Agora" : "Comienza Ahora"}{" "}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center px-6 py-3 border border-gray-700 text-base font-medium rounded-lg text-orange-500 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            {language === "English" ? "Learn More" : language === "Portuguese" ? "Saiba Mais" : "Saber Más"}
          </Link>
        </div>
      </div>
    </div>
  );
}
