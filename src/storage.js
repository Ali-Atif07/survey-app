const SESSIONS_KEY = "survey_sessions";

function getSessions() {
    try {
        return JSON.parse(localStorage.getItem(SESSIONS_KEY)) || {};
    } catch {
        return {};
    }
}

function saveSessions(sessions) {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export function createSession() {
    const sessionId =
        "sess_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
    const sessions = getSessions();
    sessions[sessionId] = {
        id: sessionId,
        createdAt: new Date().toISOString(),
        status: "IN_PROGRESS",
        answers: {},
    };
    saveSessions(sessions);
    return sessionId;
}

export function saveAnswer(sessionId, questionId, answer) {
    const sessions = getSessions();
    if (!sessions[sessionId]) return;
    sessions[sessionId].answers[questionId] = {
        questionId,
        answer,
        answeredAt: new Date().toISOString(),
    };
    saveSessions(sessions);
}

export function getAnswer(sessionId, questionId) {
    const sessions = getSessions();
    return sessions[sessionId]?.answers?.[questionId]?.answer ?? null;
}

export function completeSession(sessionId) {
    const sessions = getSessions();
    if (!sessions[sessionId]) return;
    sessions[sessionId].status = "COMPLETED";
    sessions[sessionId].completedAt = new Date().toISOString();
    saveSessions(sessions);
}

export function getSession(sessionId) {
    return getSessions()[sessionId] || null;
}