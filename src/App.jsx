import { Route, Routes, Navigate } from "react-router-dom";
import AppContext from "./Context";
import Home from "./Home";
import Game from "./Game";
import Utilities from "./Utilities";

const App = () => {
    return (
        <div className="grid h-screen bg-[url('bg.jpg')]">
            <AppContext>
                <Utilities />
                <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="game/:gameId" element={<Game />} />
                    <Route path="*" element={<Navigate to="home" />} />
                </Routes>
            </AppContext>
        </div>
    )
};

export default App;