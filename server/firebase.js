import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();

export const verifyToken = async (token = '') => {
    if (!token) return false;
    try {
        const decodedToken = await getAuth().verifyIdToken(token, true);
        if (!decodedToken) return false;
        return decodedToken;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const getGame = async (gameId) => {
    if (!gameId) return;
    try {
        const docs = await getFirestore().collection('games').doc(gameId).collection('rounds').get();
        if (!docs) return false;
        return docs;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const startGame = async (gameId) => {
    if (!gameId) return;
    try {
        const op = await getFirestore().collection('games').doc(gameId).create({ gameId });
        if (!op) return false;
        return op;
    } catch (e) {
        console.error(e);
        return false;
    }
};