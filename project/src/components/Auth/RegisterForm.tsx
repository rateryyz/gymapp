import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useLanguage } from "../../context/LanguageContext";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const { language } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert(language === "English" ? "Passwords do not match" : language === "Portuguese" ? "As senhas não coincidem" : "Las contraseñas no coinciden");
      return;
    }
    setUser({
      id: "1",
      name: "Marcus Moreira",
      email,
      role: "trainer",
    });
    navigate("/workout");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
        <div>
          <div className="flex justify-center">
            <UserPlus className="h-12 w-12 text-orange-500" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bebas-neue text-white">
            {language === "English" ? "Create your account" : language === "Portuguese" ? "Crie sua conta" : "Crea tu cuenta"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                {language === "English" ? "Email address" : language === "Portuguese" ? "Endereço de e-mail" : "Dirección de correo electrónico"}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder={language === "English" ? "Email address" : language === "Portuguese" ? "Endereço de e-mail" : "Dirección de correo electrónico"}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {language === "English" ? "Password" : language === "Portuguese" ? "Senha" : "Contraseña"}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder={language === "English" ? "Password" : language === "Portuguese" ? "Senha" : "Contraseña"}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                {language === "English" ? "Confirm Password" : language === "Portuguese" ? "Confirmar Senha" : "Confirmar Contraseña"}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder={language === "English" ? "Confirm Password" : language === "Portuguese" ? "Confirmar Senha" : "Confirmar Contraseña"}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              {language === "English" ? "Register" : language === "Portuguese" ? "Registrar" : "Registrarse"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
