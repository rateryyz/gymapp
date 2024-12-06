import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import logo from '../../assets/logo.png';
import { useLanguage } from "../../context/LanguageContext";

export function Navbar() {
  const { user, isAuthenticated } = useAuthStore();
  const { language } = useLanguage();

  return (
    <nav className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={logo}  
              alt="GymApp Logo" 
              className="h-20 w-auto"
            />
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-indigo-200">{language === "English" ? "Home" : language === "Portuguese" ? "Início" : "Inicio"}</Link>
            <Link to="/imc" className="flex items-center space-x-1 hover:text-indigo-200">
              <span>{language === "English" ? "BMI Calculator" : language === "Portuguese" ? "Calculadora IMC" : "Calculadora IMC"}</span>
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/workout" className="flex items-center space-x-1 hover:text-indigo-200">
                  <span>{language === "English" ? "Workout Plan" : language === "Portuguese" ? "Plano de Treino" : "Plan de Entrenamiento"}</span>
                </Link>
                <Link to="/diet" className="flex items-center space-x-1 hover:text-indigo-200">
                  <span>{language === "English" ? "Diet" : language === "Portuguese" ? "Dieta" : "Dieta"}</span>
                </Link>
                <Link to="/profile" className="flex items-center space-x-1 hover:text-indigo-200">
                  <span>{user?.name}</span>
                </Link>
              </>
            ) : (
              <Link to="/login" className="hover:text-indigo-200">{language === "English" ? "Login" : language === "Portuguese" ? "Entrar" : "Iniciar sesión"}</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

