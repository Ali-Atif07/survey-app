import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import RatingInput from "./RatingInput";

export default function QuestionScreen({
    question,
    answer,
    questionNumber,
    totalQuestions,
    isFirst,
    isLast,
    onAnswer,
    onNext,
    onPrev,
    onSkip,
}) {
    const [localAnswer, setLocalAnswer] = useState(answer);

    useEffect(() => {
        setLocalAnswer(answer);
    }, [answer, question.id]);

    const handleChange = (val) => {
        setLocalAnswer(val);
        onAnswer(val);
    };

    const progress = (questionNumber / totalQuestions) * 100;
    const hasAnswer = localAnswer !== null && localAnswer !== "";

    return (
        <div className="question-screen">
            {/* Header */}
            <div className="survey-header">
                <div className="progress-bar-track">
                    <motion.div
                        className="progress-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                </div>
                <div className="question-counter">
                    <span className="counter-current">{questionNumber}</span>
                    <span className="counter-sep"> / </span>
                    <span className="counter-total">{totalQuestions}</span>
                </div>
            </div>

            {/* Question Card */}
            <div className="question-card">
                <p className="question-label">Question {questionNumber}</p>
                <h2 className="question-text">{question.text}</h2>

                <div className="answer-area">
                    {question.type === "rating" && (
                        <RatingInput
                            scale={question.scale}
                            value={localAnswer}
                            onChange={handleChange}
                        />
                    )}
                    {question.type === "text" && (
                        <textarea
                            className="text-input"
                            placeholder="Share your thoughts here…"
                            value={localAnswer || ""}
                            onChange={(e) => handleChange(e.target.value)}
                            rows={4}
                        />
                    )}
                </div>
            </div>

            {/* Navigation */}
            <div className="nav-row">
                <button
                    className="btn btn-ghost"
                    onClick={onPrev}
                    disabled={isFirst}
                >
                    ← Back
                </button>

                <button className="btn btn-skip" onClick={onSkip}>
                    Skip
                </button>

                <button
                    className={`btn ${hasAnswer ? "btn-primary" : "btn-outline"}`}
                    onClick={onNext}
                >
                    {isLast ? "Finish ✓" : "Next →"}
                </button>
            </div>
        </div>
    );
}