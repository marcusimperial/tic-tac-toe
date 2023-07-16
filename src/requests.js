const path = `https://asia-southeast1-tic-tac-toe-a526f.cloudfunctions.net/api`;

export const getGames = async (token) => {
    try {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${path}/game`, options);
        const res = await req.json();
        if (res?.status) return res;
        return res?.status;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const createGame = async (token, type) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${path}/game/${type}`, options);
        const res = await req.json();
        if (res?.status) return res;
        return res?.status;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const enterGame = async (token, gameId) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${path}/games/${gameId}`, options);
        const res = await req.json();
        return res?.status;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const updateGame = async (token, gameId) => {
    try {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = await fetch(`${path}/games/${gameId}`, options);
        const res = await req.json();
        return res?.status;
    } catch (e) {
        console.error(e);
        return false;
    }
};