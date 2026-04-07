// Questions are stored here (or can be loaded from localStorage)
// Adding new questions won't break the app — just add to this array.

export const DEFAULT_QUESTIONS = [
  {
    id: "q1",
    text: "How satisfied are you with our products?",
    type: "rating",
    scale: 5,
  },
  {
    id: "q2",
    text: "How fair are the prices compared to similar retailers?",
    type: "rating",
    scale: 5,
  },
  {
    id: "q3",
    text: "How satisfied are you with the value for money of your purchase?",
    type: "rating",
    scale: 5,
  },
  {
    id: "q4",
    text: "On a scale of 1–10, how would you recommend us to your friends and family?",
    type: "rating",
    scale: 10,
  },
  {
    id: "q5",
    text: "What could we do to improve our service?",
    type: "text",
  },
];

export function getQuestions() {
  try {
    const stored = localStorage.getItem("survey_questions");
    if (stored) return JSON.parse(stored);
  } catch {}
  return DEFAULT_QUESTIONS;
}