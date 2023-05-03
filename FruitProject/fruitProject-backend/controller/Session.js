class Session{
    constructor(username, expiresAt){
        this.username = username;
        this.expiresAt = expiresAt;
    }

    isExpired(){
        this.expiresAt < (new Date())
    }
}

const uuid = require('uuid');

const sessions = []

function createSession(username, numMinutes){
    const sessionId = uuid.v4()

    const expiresAt = new Date(Date.now() + numMinutes * 60000);

    const thisSession = new Session(username, expiresAt);

    sessions[sessionId] = thisSession

    return sessionId;
}

function getSession(sessionId){
    return sessions[sessionId]
}

function deleteSession(sessionId){
    delete sessions[sessionId];
}

module.exports = {Session, createSession, getSession, deleteSession}