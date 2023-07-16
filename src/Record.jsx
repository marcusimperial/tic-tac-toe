import { useState } from "react";
import { BiChevronDown } from 'react-icons/bi';

const Record = ({ game = {
    rounds: [
        { result: 'win' },
        { result: 'win' },
        { result: 'loss' }
    ]
}, i = 1}) => {

    const [active, setActive] = useState(false);

    let wins = 0, losses = 0;
    for (const { result } of game?.rounds) {
        if (result === 'win') wins++;
        else losses++;
    };

    const bgColor = (wins > losses) ? 'bg-blue text-violet' : 'bg-violet text-blue';

    return (
        <div className="grid h-full gap-1">
            <div className={`flex items-center justify-between p-1 gap-1 ${bgColor} rounded-lg`}>
                <div className="flex items-center gap-2 p-1">
                    <h1 className="text-2xl">Game {i}:</h1>
                    <h1 className="text-2xl font-bold">{(wins > losses) ? 'Win' : 'Loss'} ({wins}-{losses})</h1>
                </div>
                <div onClick={() => setActive(!active)} className="flex rounded-xl hover:bg-black/10">
                    <BiChevronDown size="40px" />
                </div>
            </div>

            { active && (game?.rounds?.map((round, i) => (
                    <div key={`r${i}`} className="flex items-center p-1 gap-1 ml-5 border-2 border-violet rounded-lg">
                        <h1 className="text-2xl">Round {i+1}:</h1>
                        <h1 className="text-2xl">{round?.result === 'win' ? 'Win' : 'Loss'} by YOU</h1>
                    </div>
                )))
            }
        </div>

    )
};

export default Record;