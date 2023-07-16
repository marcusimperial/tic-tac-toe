import { getGame, startGame, verifyToken } from "./firebase.js";
import { createGame, enterGame, getGames, updateGame } from "./mongodb.js";

export const authHandler = async (req, res, next) => {
    try {
        const user = await verifyToken(req.headers.authorization?.split('Bearer ')[1]);
        if (!user) return res.json({ status: false, message: 'The token is invalid.' });
        res.user = user;
        return next();
    } catch (e) {
        console.error(e);
        return res.json({ status: false, message: 'An unknown error occured.' });
    }  
};

export const getHandler = async (req, res) => {
    try {
        const op = await getGames(res.user?.uid);
        if (!op) return res.json({ status: false, message: 'Could not get data.' });
        return res.json({ status: true, games: op });
    } catch (e) {
        console.error(e);
        return res.json({ status: false, message: 'An unknown error occured.' });
    }  
};

export const createHandler = async (req, res) => {
    try {
        const op = await createGame(res.user?.uid, req.params.type);
        if (!op) return res.json({ status: false, message: 'Could not create a game.' });
        const start = await startGame(op, req.params.type, res.user?.uid);
        if (!start) return res.json({ status: false, message: 'Could not start game.' });
        return res.json({ status: true, id: op });
    } catch (e) {
        console.error(e);
        return res.json({ status: false, message: 'An unknown error occured.' });
    }  
};

export const enterHandler = async (req, res) => {
    try {
        const op = await enterGame(res.user?.uid, req.params?.gameId);
        if (!op) return res.json({ status: false, message: 'Could not enter the game.' });
        return res.json({ status: true });
    } catch (e) {
        console.error(e);
        return res.json({ status: false, message: 'An unknown error occured.' });
    }  
};

export const updateHandler = async (req, res) => {
    try {
        const game = await getGame(req.params?.gameId);
        if (!game) return res.json({ status: false, message: 'Could not get the game.' });
        const op = await updateGame(req.params?.gameId, game);
        if (!op) return res.json({ status: true, message: 'Could not update the game.' });
        return res.json({ status: true });
    } catch (e) {
        console.error(e);
        return res.json({ status: false, message: 'An unknown error occured.' });
    }  
};