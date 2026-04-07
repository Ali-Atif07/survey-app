import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThankYouScreen({ onFinish }) {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((c) => {
                if (c <= 1) {
                    clearInterval(timer);
                    onFinish();
                    return 0;
                }
                return c - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [onFinish]);

    return (
        <div className="thankyou-screen">
            <motion.div
                className="thankyou-card"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                <motion.div
                    className="thankyou-icon"
                    animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    🎉
                </motion.div>
                <h1 className="thankyou-title">Thank You!</h1>
                <p className="thankyou-body">
                    Your feedback means a lot to us. We'll use it to improve your experience.
                </p>
                <div className="countdown-ring">
                    <svg viewBox="0 0 60 60" className="countdown-svg">
                        <circle cx="30" cy="30" r="26" className="ring-bg" />
                        <motion.circle
                            cx="30"
                            cy="30"
                            r="26"
                            className="ring-fill"
                            strokeDasharray="163.36"
                            strokeDashoffset={0}
                            animate={{ strokeDashoffset: 163.36 }}
                            transition={{ duration: 5, ease: "linear" }}
                        />
                    </svg>
                    <span className="countdown-num">{countdown}</span>
                </div>
                <p className="countdown-label">Returning to welcome screen…</p>
            </motion.div>
        </div>
    );
}