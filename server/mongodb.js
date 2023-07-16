import { MongoClient } from 'mongodb';
import { randomBytes } from 'crypto';

const uri = process.env.MONGODB_URI;
const database = process.env.MONGODB_DATABASE;

const client = new MongoClient(uri);

export const getGames = async (uid) => {
    if (!uid) return false;
    try {
        await client.connect();
        const db = client.db(database);
        const op = await db.collection('games').find({ uid }).toArray();
        if (!op) return false;
        return op;
    } catch (e) {
        console.error(e);
        return false;
    } finally {
        client.close();
    }
};

export const createGame = async (uid, type) => {
    if (!uid || !type) return false;
    try {
        await client.connect();
        const db = client.db(database);
        const id = randomBytes(2).toString('hex');
        const op = await db.collection('games').insertOne({ uid, type, id });
        if (!op) return false;
        return id;
    } catch (e) {
        console.error(e);
        return false;
    } finally {
        client.close();
    }
};

export const enterGame = async (gameId, uid) => {
    if (!gameId || !uid) return false;
    try {
        await client.connect();
        const db = client.db(database);
        const op = await db.collection('games').updateOne({ id: gameId }, { $set: { opponent: uid } });
        if (!op) return false;
        return op;
    } catch (e) {
        console.error(e);
        return false;
    } finally {
        client.close();
    }
};

export const updateGame = async (gameId, rounds) => {
    if (!gameId || !rounds) return false;
    try {
        await client.connect();
        const db = client.db(database);
        const op = await db.collection('games').updateOne({ id: gameId }, { $set: { rounds } });
        if (!op) return false;
        return op;
    } catch (e) {
        console.error(e);
        return false;
    } finally {
        client.close();
    }
};