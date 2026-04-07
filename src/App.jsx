import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getQuestions } from "./questions";
import { createSession, saveAnswer, completeSession } from "./storage";
import WelcomeScreen from "./components/WelcomeScreen";
import QuestionScreen from "./components/QuestionScreen";
import ThankYouScreen from "./components/ThankYouScreen";
import ConfirmDialog from "./components/ConfirmDialog";

const SCREENS = { WELCOME: "WELCOME", SURVEY: "SURVEY", CONFIRM: "CONFIRM", THANKYOU: "THANKYOU" };

export default function App() {
  const [screen, setScreen] = useState(SCREENS.WELCOME);
  const [questions] = useState(getQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState(1);

  const startSurvey = useCallback(() => {
    const id = createSession();
    setSessionId(id);
    setCurrentIndex(0);
    setAnswers({});
    setDirection(1);
    setScreen(SCREENS.SURVEY);
  }, []);

  const handleAnswer = useCallback((value) => {
    const qId = questions[currentIndex].id;
    saveAnswer(sessionId, qId, value);
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  }, [sessionId, questions, currentIndex]);

  const goNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setDirection(1);
      setCurrentIndex((i) => i + 1);
    } else {
      setScreen(SCREENS.CONFIRM);
    }
  }, [currentIndex, questions.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const handleConfirmSubmit = useCallback(() => {
    completeSession(sessionId);
    setScreen(SCREENS.THANKYOU);
  }, [sessionId]);

  const handleCancelSubmit = useCallback(() => setScreen(SCREENS.SURVEY), []);

  const handleFinish = useCallback(() => {
    setScreen(SCREENS.WELCOME);
    setSessionId(null);
    setAnswers({});
    setCurrentIndex(0);
  }, []);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = currentQuestion ? (answers[currentQuestion.id] ?? null) : null;

  return (
    <div className="app-shell">
      <AnimatePresence mode="wait">
        {screen === SCREENS.WELCOME && (
          <motion.div key="welcome" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.4 }} className="screen-wrapper">
            <WelcomeScreen onStart={startSurvey} />
          </motion.div>
        )}
        {screen === SCREENS.SURVEY && (
          <motion.div key={`q-${currentIndex}`} custom={direction} initial={{ opacity: 0, x: direction * 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: direction * -80 }} transition={{ duration: 0.35, ease: "easeInOut" }} className="screen-wrapper">
            <QuestionScreen
              question={currentQuestion}
              answer={currentAnswer}
              questionNumber={currentIndex + 1}
              totalQuestions={questions.length}
              isFirst={currentIndex === 0}
              isLast={currentIndex === questions.length - 1}
              onAnswer={handleAnswer}
              onNext={goNext}
              onPrev={goPrev}
              onSkip={goNext}
            />
          </motion.div>
        )}
        {screen === SCREENS.CONFIRM && (
          <motion.div key="confirm" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className="screen-wrapper">
            <ConfirmDialog onConfirm={handleConfirmSubmit} onCancel={handleCancelSubmit} />
          </motion.div>
        )}
        {screen === SCREENS.THANKYOU && (
          <motion.div key="thankyou" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.4 }} className="screen-wrapper">
            <ThankYouScreen onFinish={handleFinish} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}