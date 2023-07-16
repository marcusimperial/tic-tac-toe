import { BiJoystickButton, BiJoystick, BiHistory } from 'react-icons/bi';
import Record from './Record';
import { createGame } from './requests';
import { useApp } from './Context';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const { getToken, utilize, setUtility, player, setPlayer, opponent, setOpponent } = useApp();
    const navigate = useNavigate();

    const create = async (type) => {
        const token = await getToken();
        utilize('load', 'Creating a game...');
        const op = await createGame(token, type);
        setUtility({ active: false });
        if (!op) return;
        const playerName = await utilize('prompt', "What's your player name?");
        console.log(playerName);
        if (!playerName) return;
        setPlayer({ ...player, name: playerName });
        if (type === 'multiplayer') return navigate(`/game/${op?.id}`);
        const opponentName = await utilize('prompt', "What's your opponent's name?");
        console.log(opponentName);
        if (!opponentName) return console.log('ERROR');
        setOpponent({ ...opponent, name: opponentName });
        navigate(`/game/${op?.id}`);
    };

    return (
        <div className="grid text-white grid-rows-[35%_65%] p-10 px-20 select-none">
            <h1 className="text-8xl md:text-9xl font-bold text-center self-center text-white">TIC TAC TOE!</h1>
            <div className="grid md:grid-cols-2">
                <div className="grid order-2 md:order-1 grid-rows-[auto_minmax(0,_1fr)] md:px-20 gap-2 rounded-lg text-violet overflow-auto">
                    <div className="flex items-center gap-1 p-1">
                        <BiHistory size="40px" />
                        <h1 className="text-5xl text-violet">Game History</h1>
                    </div>
                    <div className="grid h-full auto-rows-min gap-1 overflow-auto">
                        <Record />
                        <Record />
                        <Record />
                        <Record />
                        <Record />
                    </div>
                </div>
                
                <div className="grid order-1 md:order-2 auto-rows-min gap-4">
                    <h1 className="text-5xl text-center">Start a New Game</h1>
                    <div className="grid justify-items-center items-center gap-2">
                        <div onClick={() => create('singleplayer')} className="flex items-center gap-1 p-2 bg-pink text-white rounded-lg select-none">
                            <BiJoystickButton size="30px" />
                            <h1 className="text-4xl">Play Singleplayer</h1>
                        </div>
                        <div onClick={() => create('multiplayer')} className="flex items-center gap-1 p-2 bg-pink text-white rounded-lg select-none">
                            <BiJoystick size="30px" />
                            <h1 className="text-4xl">Play Multiplayer</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;