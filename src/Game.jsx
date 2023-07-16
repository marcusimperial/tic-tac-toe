import { useEffect } from "react";
import Board from "./Board";
import { useApp } from "./Context";
import { BiUser } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getFirestore, onSnapshot, collection, addDoc } from 'firebase/firestore';
import { updateGame } from "./requests";

const Game = () => {

    const { getToken, user, turn, opponent, player, utilize, setUtility } = useApp();
    const { gameId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!gameId) return;
        // if param is not specified return

        const unsubscribe = onSnapshot(doc(getFirestore(), "games", gameId), (doc) => {

            if (!doc.data()) return navigate('/home');
        });

        // const q = query(collection(getFirestore(), "games"));
        // const unsubscribe = onSnapshot(q, (querySnapshot) => {
        // const cities = [];
        // querySnapshot.forEach((doc) => {
        //     cities.push(doc.data());
        // });
        // console.log("DATA CHANGE ", cities);
        // });
        // start reading game file

        return () => unsubscribe();
        // unsubscribe to prevent mem leak
    }, [gameId]);

    const handleResult = async (result) => {
        // confirm first
        const confirm = await utilize('confirm', `${result}! Do you want to continue?`);
        if (!confirm) utilize('load', 'Saving your data...');
        try {
            const collcRef = collection(getFirestore(), "games", gameId, "rounds");
            await addDoc(collcRef, { result, player: player?.id, opponent: opponent?.id });
            const token = await getToken();
            await updateGame(token, gameId);
        } catch (e) {
            console.log(e);
        }
        if (confirm) return
        setUtility({ active: false });
        navigate('/home');
        // update game data 
    };

    return (
        <div className="grid items-center justify-items-center m-20 select-none">
            <div className="grid md:grid-cols-[minmax(0,_1fr)_auto] gap-20">
                <Board handleResult={handleResult} />

                <div className="grid grid-flow-col md:grid-flow-row items-center text-white gap-1">
                    <div className={`flex items-center gap-1 p-2 border-2 ${opponent?.id === turn?.id ? 'bg-white text-pink border-white' : 'border-violet'} rounded-lg`}>
                        <BiUser className="text-2xl md:text-4xl" />
                        <h1 className="text-2xl md:text-4xl">{opponent?.name} ({opponent?.sign})</h1>
                    </div>

                    <div className={`flex items-center gap-1 p-2 border-2 ${player?.id === turn?.id ? 'bg-white text-pink border-white' : 'border-violet'} rounded-lg`}>
                        <BiUser className="text-2xl md:text-4xl" />
                        <h1 className="text-2xl md:text-4xl">{player?.name} ({player?.sign}) (You)</h1>
                    </div>
                </div>
            </div>

        </div>
    )
};  

export default Game;