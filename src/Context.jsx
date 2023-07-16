import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { collection, query, onSnapshot, getFirestore } from "firebase/firestore";

const AppValues = createContext();
export const useApp = () => useContext(AppValues);

const AppContext = ({ children }) => {

    const randomizer = Math.random() < 0.5;

    const [player, setPlayer] = useState({
        name: 'HEY',
        id: 'sd',
        sign: randomizer ? 'O' : 'X'
    });

    const [opponent, setOpponent] = useState({
        name: 'THEM',
        id: 'sds',
        sign: randomizer ? 'X' : 'O',
        mode: 'offline'
    });

    const [turn, setTurn] = useState(randomizer ? player : opponent);

    useEffect(() => setTurn(randomizer ? player : opponent), [player, opponent]);

    const [utility, setUtility] = useState({ active: false });
    const utilize = (type, message) => {
        return new Promise(resolve => setUtility({ resolve, type, message, active: true }) );
    };

    const [user, setUser] = useState();

    useEffect(() => onAuthStateChanged(getAuth(), async (user) => {
        if (!user) return signInAnonymously(getAuth());
        const latest = await getAuth()?.currentUser?.getIdTokenResult(true);
        setUser({ ...latest, ...latest?.claims });
    }), [])

    const getToken = async () =>{
        const latest = await getAuth()?.currentUser?.getIdTokenResult(true);
        return latest?.token;
    };

    // const q = query(collection(getFirestore(), "games"));
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    // const cities = [];
    // querySnapshot.forEach((doc) => {
    //     cities.push(doc.data());
    // });
    // console.log("DATA CHANGE ", cities);
    // });

    const values = { 
        utility, utilize, setUtility,
        player, opponent, turn, setTurn,
        setPlayer, setOpponent,
        user, getToken
    };
    return ( <AppValues.Provider value={values}>{children}</AppValues.Provider> );
};

export default AppContext;