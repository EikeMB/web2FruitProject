const express = require('express');
const {Session, createSession, getSession, deleteSession} = require('./Session');
const router = express.Router();
const routeRoot = "/session";


router.get('/login/:username', loginUser);
function loginUser(request, response){
    const username = request.params.username;

    const sessionId = createSession(username, 10);

    response.cookie("sessionId", sessionId, { expires: getSession(sessionId).expiresAt , httpsOnly: true });
    response.redirect("/");
}

function authenticateUser(request){
    console.log("request" + request);
    if(!request.cookies){
        return null;
    }

    const sessionId = request.cookies['sessionId'];
    if(!sessionId){
        return null;
    }

    userSession = getSession(sessionId);
    if(!userSession){
        return null;
    }

    if(userSession.isExpired()) {
        deleteSession(sessionId);
        return null;
    }

    return {sessionId, userSession};
}

function refreshSession(request, response){
    const authenticatedSession = authenticateUser(request);
    if(!authenticatedSession){
        response.sendStatus(401);
        return;
    }

    const newSessionId = createSession(authenticatedSession.userSession.username, 10);
    deleteSession(authenticatedSession.sessionId)
    response.cookie("sessionId", newSessionId, {expires: getSession(newSessionId).expiresAt, httpOnly: true});

    return newSessionId;
}

module.exports = {router, routeRoot, loginUser, authenticateUser, refreshSession};