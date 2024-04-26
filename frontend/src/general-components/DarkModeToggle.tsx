import React, { useContext } from 'react';
import { DarkModeContext} from "../App";
import SunIcon from '../assets/sun.png';
import MoonIcon from '../assets/moon.png';

export function DarkModeToggle() {
    const { isDark, toggleDarkMode } = useContext(DarkModeContext);

    const sunImg = <img src={SunIcon} alt="sun" className="w-6 h-6" />;
    const moonImg = <img src={MoonIcon} alt="moon" className="w-6 h-6" />;

    return (
        <button onClick={toggleDarkMode} className={"flex w-9 h-9 justify-center text-center items-center rounded-3xl dark-gray-shadow dark:blue-shadow dark:bg-darkComponentBg-600"}>
            {isDark ? sunImg : moonImg}
        </button>
    );
}