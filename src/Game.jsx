import { useEffect } from "react";
import Board from "./Board";
import { useApp } from "./Context";
import { BiUser } from "react-icons/bi";
import { useParams } from "react-router-dom";

const Game = () => {

    const { turn, opponent, player } = useApp();
    const { gameId } = useParams();

    useEffect(() => {
        if (!gameId) return;
        // if param is not specified return

        const q = query(collection(getFirestore(), "games"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const cities = [];
        querySnapshot.forEach((doc) => {
            cities.push(doc.data());
        });
        console.log("DATA CHANGE ", cities);
        });
        // start reading game file

        return () => unsubscribe();
        // unsubscribe to prevent mem leak
    }, [gameId]);

    return (
        <div className="grid items-center justify-items-center m-20 select-none">
            <div className="grid md:grid-cols-[minmax(0,_1fr)_auto] gap-20">
                <Board />

                <div className="grid grid-flow-col md:grid-flow-row items-center text-white gap-1">
                    <div className={`flex items-center gap-1 p-2 border-2 ${opponent?.id === turn?.id ? 'bg-white text-pink border-white' : 'border-violet'} rounded-lg`}>
                        <BiUser className="text-2xl md:text-4xl" />
                        <h1 className="text-2xl md:text-4xl">{opponent?.name} ({opponent?.sign})</h1>
                    </div>

                    <div className={`flex items-center gap-1 p-2 border-2 ${player?.id === turn?.id ? 'bg-white text-pink border-white' : 'border-violet'} rounded-lg`}>
                        <BiUser className="text-2xl md:text-4xl" />
                        <h1 className="text-2xl md:text-4xl">{player?.name} ({player?.sign})</h1>
                    </div>
                </div>
            </div>

        </div>
    )
};  

export default Game;