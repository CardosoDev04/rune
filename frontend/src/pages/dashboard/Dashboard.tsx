import React, {useContext} from "react";
import './dashboard.css'
import RuneLogoWhite from '../../assets/Rune_Logo_white.png'
import RuneLogoBlack from '../../assets/Rune_Logo_black.png'
import Cookies from "js-cookie";
import {NavBarItems} from "./components/navbar/NavBarItems";
import {SearchBar} from "./components/search/SearchBar";
import {CardGrid} from "./components/card-grid/CardGrid";
import {DarkModeToggle} from "../../general-components/DarkModeToggle";
import {DarkModeContext} from "../../App";
import {UserAvatar} from "./components/user-avatar/UserAvatar";



export const Dashboard = () => {
    const { isDark, toggleDarkMode } = useContext(DarkModeContext);
    const runeLogo = <img alt="rune logo" src={isDark ? RuneLogoWhite : RuneLogoBlack} className={"h-10 w-10"}/>
    return (
        <>
            <div
                className={"flex flex-row h-screen w-screen justify-center items-center align-middle page-background dark:page-background"}>
                <div id={"black-box"}
                     className={"shadow-md shadow-black flex flex-row justify-between rounded-2xl bg-white dark:bg-black w-11/12 h-5/6"}>
                    <div className={"flex"}>
                        <div className={"flex flex-col"}>
                            <div className={"flex flex-row items-center m-4"}>
                                {runeLogo}
                                <h1 className={"select-none font-semibold text-lg text-black dark:text-white"}>Rune</h1>
                            </div>
                            <div className={"flex flex-col mt-5"}>
                                <NavBarItems isDark={isDark}/>
                                <div className={"flex mt-36 ml-5"}>
                                <DarkModeToggle/>
                                    <UserAvatar username={"m0lly"}/>
                                </div>
                            </div>
                        </div>
                        <div className={"ml-32 opacity-30 border border-black dark:border-white h-full"}></div>
                    </div>
                    <div className={"flex flex-col justify-between items-between  w-full"}>
                        <div className={"flex justify-between h-10 mt-5 mr-5"}>
                            <h1 className={"select-none ml-4 flex text-black dark:text-white text-xl font-semibold"}>Dashboard</h1>
                            <SearchBar isDark={isDark}></SearchBar>
                        </div>
                        <div className={"mt-5 opacity-30 border border-black dark:border-white w-full"}></div>
                        <div id={"grid"} className={"flex justify-center h-full w-full"}>
                            <CardGrid username={"m0lly"} timeSinceLastLogin={"30min"} alertCount={12} userData={
                                {
                                    "Chats" : 12,
                                    "Contacts": 16,
                                    "Passwords": 11,
                                    "PGP": 3
                                }

                             }  isDark={isDark}/>
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
};
