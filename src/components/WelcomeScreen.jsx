import { motion } from "framer-motion";

export default function WelcomeScreen({ onStart }) {
    return (
        <div className="welcome-screen">
            <motion.div
                className="welcome-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="welcome-icon">🛍️</div>
                <motion.h1
                    className="welcome-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                >
                    Welcome!
                </motion.h1>
                <motion.p
                    className="welcome-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                >
                    We'd love to hear about your experience today.
                    <br />
                    This quick survey takes less than a minute.
                </motion.p>
                <motion.button
                    className="btn btn-primary btn-large"
                    onClick={onStart}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.38, duration: 0.5 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                >
                    Start Survey →
                </motion.button>
            </motion.div>
        </div>
    );
}