import { BiJoystickButton, BiJoystick, BiHistory } from 'react-icons/bi';
import Record from './Record';
import { createGame, getGames } from './requests';
import { useApp } from './Context';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {

    const { user, getToken, utilize, setUtility, player, setPlayer, opponent, setOpponent } = useApp();
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    const create = async (type) => {
        const token = await getToken();
        if (!token) return;
        utilize('load', 'Creating a game...');
        const op = await createGame(token, type);
        setUtility({ active: false });
        if (!op) return;
        const playerName = await utilize('prompt', "What's your player name?");
        if (!playerName) return;
        setPlayer({ ...player, id: user?.sub, name: playerName });
        if (type === 'multiplayer') return navigate(`/game/${op?.id}`);
        const opponentName = await utilize('prompt', "What's your opponent's name?");
        if (!opponentName) return console.log('ERROR');
        setOpponent({ ...opponent, id: 'offline', name: opponentName });
        navigate(`/game/${op?.id}`);
    };

    useEffect(() => {
        if (!user) return;
        const get = async () => {
            const token = await getToken();
            const games = await getGames(token);
            if (games) setGames(games?.games || []);
            // console.log(games);
        };
        get();
    }, [user]);

    return (
        <div className="grid text-white grid-rows-[35%_65%] p-10 px-20 select-none overflow-auto gap-2">
            <h1 className="text-7xl md:text-9xl font-bold text-center self-center text-white">TIC TAC TOE!</h1>
            <div className="grid md:grid-cols-2">
                <div className="grid order-2 md:order-1 grid-rows-[auto_minmax(0,_1fr)] md:px-20 gap-2 rounded-lg text-violet overflow-auto">
                    <div className="flex items-center gap-1 p-1">
                        <BiHistory size="40px" />
                        <h1 className="text-5xl text-violet">Game History</h1>
                    </div>
                    <div className="grid h-full auto-rows-min gap-1 overflow-auto">
                        {
                            games.map((game, i) => (<Record i={i} game={game} key={`g${i}`}/>))
                        }
                    </div>
                </div>
                
                <div className="grid order-1 md:order-2 auto-rows-min gap-4">
                    <h1 className="text-5xl text-center">Start a New Game</h1>
                    <div className="grid justify-items-center items-center gap-2">
                        <div onClick={() => create('singleplayer')} className="flex items-center gap-1 p-2 bg-pink text-white rounded-lg select-none">
                            <BiJoystickButton size="30px" />
                            <h1 className="text-4xl text-center">Play Singleplayer</h1>
                        </div>
                        {/* <div onClick={() => create('multiplayer')} className="flex items-center gap-1 p-2 bg-pink text-white rounded-lg select-none">
                            <BiJoystick size="30px" />
                            <h1 className="text-4xl text-center">Play Multiplayer</h1>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;