import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import "./Form.css";
import { getRecommendations } from "./Suggestions"; // Import the function


// Define form validation schema
const schema = yup.object().shape({
  age: yup.number().required("Age is required").min(17, "Minimum age is 17").max(50, "Maximum age is 40"),
  academicPressure: yup.number().required("Required").min(0).max(5),
  studySatisfaction: yup.number().required("Required").min(0).max(5),
  workStudyHours: yup.number().required("Required").min(0).max(12),
  financialStress: yup.number().required("Required").min(0).max(5),
  sleepDuration: yup.string().required("Required"),
  dietaryHabits: yup.string().required("Required"),
  suicidalThoughts: yup.string().required("Required"),
});

const Form = () => {
  const [result, setResult] = useState(null);
  const [recommendations, setRecommendations] = useState(null); 
  const [darkMode, setDarkMode] = useState(false); 


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      age: 0,
      academicPressure: 0,
      studySatisfaction: 0,
      workStudyHours: 0,
      financialStress: 0,
      sleepDuration: "",
      dietaryHabits: "",
      suicidalThoughts: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Submitting raw data:", data);

    const formattedData = {
      "Age": Number(data.age),
      "Academic Pressure": Number(data.academicPressure),
      "Study Satisfaction": Number(data.studySatisfaction),
      "Work/Study Hours": Number(data.workStudyHours),
      "Financial Stress": Number(data.financialStress),
      "Sleep Duration": data.sleepDuration,
      "Dietary Habits": data.dietaryHabits,
      "Have you ever had suicidal thoughts ?": data.suicidalThoughts,
    };

    console.log("Formatted Data:", JSON.stringify(formattedData, null, 2));

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formattedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response received:", response.data);
      setResult(response.data.prediction);
      // Extract the depression chance percentage from the prediction message
      const depressionChance = parseFloat(response.data.prediction.match(/\d+\.\d+/)[0]);

      // Get recommendations based on the depression chance
      const recommendations = getRecommendations(depressionChance);
      setRecommendations(recommendations);
    } catch (error) {
      console.error("Error:", error);
      setResult("Error making prediction");
      setRecommendations(null);
    }
  };

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen p-5 flex justify-center items-center ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-purple-50 to-blue-50 text-gray-800"}`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`p-8 rounded-2xl shadow-2xl w-full max-w-4xl border transition-all duration-300 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        }`}
      >
        {/* Dark/Light Mode Toggle */}
        <div className="flex justify-end mb-6">
          <button
            type="button"
            onClick={toggleDarkMode}
            className={`p-2 rounded-full focus:outline-none transition-all duration-300 ${
              darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>

        <h2 className={`text-3xl font-bold text-center mb-8 ${darkMode ? "text-white" : "text-gray-800"}`}>
        NeuroWell: AI-Driven Mental Health Analysis
        </h2>

        {/* Grid container for side-by-side layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Age</label>
              <input
                type="number"
                {...register("age")}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 focus:ring-purple-500 text-white"
                    : "bg-white border-gray-300 focus:ring-purple-500 text-gray-800"
                }`}
                placeholder="Enter your age (e.g., 25)"
              />
              <p className="text-red-500 text-sm mt-1">{errors.age?.message}</p>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Academic Pressure (0-5)</label>
              <input
                type="number"
                {...register("academicPressure")}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 focus:ring-purple-500 text-white"
                    : "bg-white border-gray-300 focus:ring-purple-500 text-gray-800"
                }`}
                placeholder="Rate from 0 to 5"
              />
              <p className="text-red-500 text-sm mt-1">{errors.academicPressure?.message}</p>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Study Satisfaction (0-5)</label>
              <input
                type="number"
                {...register("studySatisfaction")}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 focus:ring-purple-500 text-white"
                    : "bg-white border-gray-300 focus:ring-purple-500 text-gray-800"
                }`}
                placeholder="Rate from 0 to 5"
              />
              <p className="text-red-500 text-sm mt-1">{errors.studySatisfaction?.message}</p>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Work/Study Hours</label>
              <input
                type="number"
                {...register("workStudyHours")}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 focus:ring-purple-500 text-white"
                    : "bg-white border-gray-300 focus:ring-purple-500 text-gray-800"
                }`}
                placeholder="Enter hours (e.g., 8)"
              />
              <p className="text-red-500 text-sm mt-1">{errors.workStudyHours?.message}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Financial Stress (0-5)</label>
              <input
                type="number"
                {...register("financialStress")}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 focus:ring-purple-500 text-white"
                    : "bg-white border-gray-300 focus:ring-purple-500 text-gray-800"
                }`}
                placeholder="Rate from 0 to 5"
              />
              <p className="text-red-500 text-sm mt-1">{errors.financialStress?.message}</p>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Sleep Duration</label>
              <select
                {...register("sleepDuration")}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 focus:ring-purple-500 text-white"
                    : "bg-white border-gray-300 focus:ring-purple-500 text-gray-800"
                }`}
              >
                <option value="" disabled>Select sleep duration</option>
                <option value="Less than 5 hours">Less than 5 hours</option>
                <option value="5-6 hours">5-6 hours</option>
                <option value="7-8 hours">6-8 hours</option>
                <option value="More than 8 hours">More than 8 hours</option>
              </select>
              <p className="text-red-500 text-sm mt-1">{errors.sleepDuration?.message}</p>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Dietary Habits</label>
              <select
                {...register("dietaryHabits")}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 focus:ring-purple-500 text-white"
                    : "bg-white border-gray-300 focus:ring-purple-500 text-gray-800"
                }`}
              >
                <option value="" disabled>Select dietary habits</option>
                <option value="Healthy">Healthy</option>
                <option value="Moderate">Moderate</option>
                <option value="Unhealthy">Unhealthy</option>
              </select>
              <p className="text-red-500 text-sm mt-1">{errors.dietaryHabits?.message}</p>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Suicidal Thoughts</label>
              <select
                {...register("suicidalThoughts")}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 focus:ring-purple-500 text-white"
                    : "bg-white border-gray-300 focus:ring-purple-500 text-gray-800"
                }`}
              >
                <option value="" disabled>Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <p className="text-red-500 text-sm mt-1">{errors.suicidalThoughts?.message}</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full mt-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
            darkMode
              ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
          }`}
        >
          Predict
        </button>

        {/* Result Display */}
        {result && (
          <div className={`mt-8 p-4 rounded-xl text-center border transition-all duration-300 ${
            darkMode ? "bg-gray-700 border-gray-600" : "bg-gradient-to-r from-purple-50 to-blue-50 border-gray-200"
          }`}>
            <p className={`text-lg font-semibold ${
              darkMode ? "text-purple-400" : "text-purple-800"
            }`}>
              Prediction: <span className={`${darkMode ? "text-blue-400" : "text-blue-800"}`}>{result}</span>
            </p>
          </div>
        )}

       {/* Recommendations Display */}
       {recommendations && (
          <div className={`mt-8 p-4 rounded-xl border transition-all duration-300 ${
            darkMode ? "bg-gray-700 border-gray-600" : "bg-gradient-to-r from-purple-50 to-blue-50 border-gray-200"
          }`}>
            <p className={`text-lg font-semibold ${
              darkMode ? "text-purple-400" : "text-purple-800"
            }`}>
              Recommendations:
            </p>
            <p className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              {recommendations.message}
            </p>
            <ul className="list-disc list-inside mt-2">
              {recommendations.resources.map((resource, index) => (
                <li key={index} className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {resource}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};
export default Form;

