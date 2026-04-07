import { motion } from "framer-motion";

export default function ConfirmDialog({ onConfirm, onCancel }) {
    return (
        <div className="confirm-overlay">
            <motion.div
                className="confirm-card"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
                <div className="confirm-icon">📋</div>
                <h2 className="confirm-title">Submit Survey?</h2>
                <p className="confirm-body">
                    You're all done! Ready to submit your responses?
                    <br />
                    You won't be able to change your answers after submitting.
                </p>
                <div className="confirm-actions">
                    <button className="btn btn-ghost" onClick={onCancel}>
                        ← Go Back
                    </button>
                    <motion.button
                        className="btn btn-primary"
                        onClick={onConfirm}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Submit ✓
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}