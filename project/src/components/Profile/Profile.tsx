import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

export function Profile() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<string>(
    localStorage.getItem("language") || "English"
  );
  const [weight, setWeight] = useState<string>(
    localStorage.getItem("weight") || ""
  );
  const [notes, setNotes] = useState<string>(
    localStorage.getItem("notes") || ""
  );
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const handleSave = () => {
    localStorage.setItem("weight", weight);
    localStorage.setItem("notes", notes);
    alert(
      language === "English"
        ? "Profile updated!"
        : language === "Portuguese"
        ? "Perfil atualizado!"
        : "¡Perfil actualizado!"
    );
    navigate("/workout");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedPhotos((prev) => [...prev, ...files]);
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="flex justify-center">
          <User className="h-12 w-12 text-orange-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bebas-neue text-white">
          {language === "English"
            ? "Your Profile"
            : language === "Portuguese"
            ? "Seu Perfil"
            : "Tu Perfil"}
        </h2>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <label htmlFor="profilePic" className="cursor-pointer">
                <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center">
                  {profilePic ? (
                    <img
                      src={URL.createObjectURL(profilePic)}
                      alt="Profile"
                      className="rounded-full object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-white">Upload Photo</span>
                  )}
                </div>
              </label>
              <input
                id="profilePic"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
              />
            </div>

            <div>
              <label
                htmlFor="language"
                className="block text-white text-sm font-medium"
              >
                {language === "English"
                  ? "Preferred Language"
                  : language === "Portuguese"
                  ? "Idioma Preferido"
                  : "Idioma Preferido"}
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="mt-1 block w-full rounded-lg bg-gray-700 border-gray-700 text-white focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              >
                <option value="English">English</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="weight"
                className="block text-white text-sm font-medium"
              >
                {language === "English"
                  ? "Weight (kg)"
                  : language === "Portuguese"
                  ? "Peso (kg)"
                  : "Peso (kg)"}
              </label>
              <input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-1 block w-full rounded-lg bg-gray-700 border-gray-700 text-white focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder={
                  language === "English"
                    ? "Enter your weight"
                    : language === "Portuguese"
                    ? "Digite seu peso"
                    : "Ingrese su peso"
                }
              />
            </div>

            <div>
              <label
                htmlFor="notes"
                className="block text-white text-sm font-medium"
              >
                {language === "English"
                  ? "Notes"
                  : language === "Portuguese"
                  ? "Notas"
                  : "Notas"}
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1 block w-full rounded-lg bg-gray-700 border-gray-700 text-white focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder={
                  language === "English"
                    ? "Write your notes here"
                    : language === "Portuguese"
                    ? "Escreva suas notas aqui"
                    : "Escribe tus notas aquí"
                }
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="photos"
                className="block text-white text-sm font-medium"
              >
                {language === "English"
                  ? "Upload Photos"
                  : language === "Portuguese"
                  ? "Carregar Fotos"
                  : "Cargar Fotos"}
              </label>
              <input
                id="photos"
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="mt-1 block w-full rounded-lg bg-gray-700 text-white border-gray-700 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
              <div className="flex flex-wrap mt-2 gap-2">
                {uploadedPhotos.map((photo, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(photo)}
                    alt={`Uploaded ${index + 1}`}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleSave}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              {language === "English"
                ? "Save Profile"
                : language === "Portuguese"
                ? "Salvar Perfil"
                : "Guardar Perfil"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
