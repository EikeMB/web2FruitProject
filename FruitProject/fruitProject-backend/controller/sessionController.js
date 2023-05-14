const express = require('express');
const {Session, createSession, getSession, deleteSession} = require('./Session');
const router = express.Router();
const routeRoot = "/session";

router.post('/register', registerUser);
async function registerUser(request, response){
    const username = request.body.username;
    const password = request.body.password;
    const role = request.body.role;

    const requestOptions = {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password,
            role: role
        }),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    };
    responseUser = await fetch("http://localhost:1339/users", requestOptions)
        result = await responseUser.json();

        if(responseUser.status != 200){
            response.sendStatus(401);
        }
        else{
            const sessionId = createSession(username, 10);

        response.cookie("sessionId", sessionId, { expires: getSession(sessionId).expiresAt , httpsOnly: true });
        response.sendStatus(200);
        return;
        }
}

router.post('/login', loginUser);
async function loginUser(request, response){
    const username = request.body.username;
    const password = request.body.password;

        responseUser = await fetch("http://localhost:1339/users/" + username + "/" + password)
        result = await responseUser.json();

        if(responseUser.status != 200){
            response.sendStatus(401);
        }
        else{
            const sessionId = createSession(username, 10);

        response.cookie("sessionId", sessionId, { expires: getSession(sessionId).expiresAt , httpsOnly: true });
        response.sendStatus(200);
        return;
        }

    
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

router.get('/logout', logoutUser);
function logoutUser(request, response){
    const authenticatedSession = authenticateUser(request);
    if(!authenticatedSession){
        response.sendStatus(401);
        return;
    }
    deleteSession(authenticatedSession.sessionId);
    console.log("logged out user " + authenticatedSession.username);

    response.cookie("sessionId", "", {expires: new Date() , httpOnly: true})
    response.sendStatus(200);
    return;
}

module.exports = {router, routeRoot, loginUser, authenticateUser, refreshSession};