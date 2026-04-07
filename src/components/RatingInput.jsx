import { motion } from "framer-motion";

const EMOJI_MAP_5 = ["😞", "😕", "😐", "😊", "😍"];
const EMOJI_MAP_10 = ["😞", "😞", "😕", "😕", "😐", "😐", "😊", "😊", "😍", "😍"];

const LABEL_MAP_5 = {
    1: "Very Dissatisfied",
    2: "Dissatisfied",
    3: "Neutral",
    4: "Satisfied",
    5: "Very Satisfied",
};

const LABEL_MAP_10 = {
    1: "Not at all",
    2: "Very unlikely",
    3: "Unlikely",
    4: "Somewhat unlikely",
    5: "Neutral",
    6: "Somewhat likely",
    7: "Likely",
    8: "Very likely",
    9: "Almost certain",
    10: "Absolutely!",
};

export default function RatingInput({ scale, value, onChange }) {
    const items = Array.from({ length: scale }, (_, i) => i + 1);
    const emojiMap = scale === 5 ? EMOJI_MAP_5 : EMOJI_MAP_10;
    const labelMap = scale === 5 ? LABEL_MAP_5 : LABEL_MAP_10;

    return (
        <div className="rating-container">
            <div className={`rating-row rating-row-${scale}`}>
                {items.map((num) => {
                    const selected = value === num;
                    const dimmed = value !== null && !selected;
                    return (
                        <motion.button
                            key={num}
                            className={`rating-btn ${selected ? "rating-selected" : ""} ${dimmed ? "rating-dimmed" : ""}`}
                            onClick={() => onChange(num)}
                            whileHover={{ scale: 1.12, y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                        >
                            <span className="rating-emoji">{emojiMap[num - 1]}</span>
                            <span className="rating-num">{num}</span>
                        </motion.button>
                    );
                })}
            </div>

            {scale === 5 && (
                <div className="rating-labels">
                    <span>Very Dissatisfied</span>
                    <span>Very Satisfied</span>
                </div>
            )}
            {scale === 10 && (
                <div className="rating-labels">
                    <span>Not at all likely</span>
                    <span>Extremely likely</span>
                </div>
            )}

            {value && (
                <motion.div
                    className="rating-feedback"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={value}
                >
                    {emojiMap[value - 1]} {labelMap[value]}
                </motion.div>
            )}
        </div>
    );
}