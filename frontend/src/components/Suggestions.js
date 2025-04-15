// src/suggestions.js

export const getRecommendations = (depressionChance) => {
    if (depressionChance <= 20) {
      return {
        message: "✅ Status: You seem to be in a good mental state!",
        resources: [
          "Keep up your positive mindset.",
          "Maintain social connections and a balanced lifestyle.",
          "Exercise regularly and engage in hobbies.",
          "Continue practicing mindfulness and self-care."
        ]
      };
    } else if (depressionChance <= 40) {
      return {
        message: "⚠️ Status: Some early signs of stress or emotional exhaustion.",
        resources: [
          "Identify stress triggers and find ways to manage them.",
          "Engage in healthy conversations with friends or mentors.",
          "Try meditation, yoga, or deep breathing exercises.",
          "Maintain a proper sleep schedule and avoid excessive screen time."
        ]
      };
    } else if (depressionChance <= 60) {
      return {
        message: "⚠️ Status: Signs of distress are increasing. Take proactive steps.",
        resources: [
          "Reach out to a trusted friend, family member, or counselor.",
          "Reduce academic pressure with time management techniques.",
          "Engage in regular physical activities like walking or sports.",
          "Consider seeking professional help if feelings persist."
        ]
      };
    } else if (depressionChance <= 80) {
      return {
        message: "🚨 Status: You may be experiencing significant mental distress.",
        resources: [
          "Seek guidance from a mental health professional.",
          "Avoid isolation—talk to someone you trust.",
          "Reduce workload and focus on self-care.",
          "Engage in activities that bring relaxation and peace.",
          "Avoid alcohol, smoking, or other unhealthy coping mechanisms."
        ]
      };
    } else {
      return {
        message: "🛑 Status: You are at a high risk of depression. Immediate action is needed!",
        resources: [
          "Contact a psychologist or counselor immediately.",
          "Do not hesitate to seek help from a mental health helpline.",
          "Stay close to supportive friends or family members.",
          "Avoid self-harm or negative thoughts—help is available.",
          "Professional therapy and intervention are strongly recommended."
        ]
      };
    }
};
