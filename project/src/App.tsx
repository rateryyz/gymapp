import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Navbar } from "./components/Layout/Navbar";
import { Hero } from "./components/Home/Hero";
import { BMICalculator } from "./components/BMI/Calculator";
import { WorkoutPlan } from "./components/Workout/WorkoutPlan";
import { LoginForm } from "./components/Auth/LoginForm";
import { RegisterForm } from "./components/Auth/RegisterForm";
import { CreateWorkout } from "./components/Workout/CreateWorkout";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { Profile } from "./components/Profile/Profile";
import { LanguageProvider } from "./context/LanguageContext"; 
import { Diet } from "./components/diet/Diet";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-dark">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/imc" element={<BMICalculator />} />
              <Route
                path="/workout"
                element={
                  <ProtectedRoute>
                    <WorkoutPlan />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/workout/create"
                element={
                  <ProtectedRoute>
                    <CreateWorkout />
                  </ProtectedRoute>
                }
              />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Toaster
            theme="dark"
            position="top-right"
            toastOptions={{
              style: {
                background: "#2d2d2d",
                border: "1px solid #404040",
                color: "white",
              },
            }}
          />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
