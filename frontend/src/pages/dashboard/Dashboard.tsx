import React from "react";
import './dashboard.css'
import RuneLogoWhite from '../../assets/Rune_Logo_white.png'
import Cookies from "js-cookie";
import {NavBarItems} from "./components/navbar/NavBarItems";
import {SearchBar} from "./components/search/SearchBar";
import {CardGrid} from "./components/card-grid/CardGrid";


const runeLogo = <img alt="rune logo" src={RuneLogoWhite} className={"h-10 w-10"}/>
const isDark = Cookies.get('isDark') === 'true'
export const Dashboard = () => {
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
                                <h1 className={"font-semibold text-lg text-white"}>Rune</h1>
                            </div>
                            <div className={"flex flex-col mt-5"}>
                                <NavBarItems/>
                            </div>
                        </div>
                        <div className={"ml-32 opacity-30 border border-white h-full"}></div>
                    </div>
                    <div className={"flex flex-col justify-between items-between  w-full"}>
                        <div className={"flex justify-between h-10 mt-5 mr-5"}>
                            <h1 className={"ml-4 flex text-white text-xl font-semibold"}>Dashboard</h1>
                            <SearchBar></SearchBar>
                        </div>
                        <div className={"mt-5 opacity-30 border border-white w-full"}></div>
                        <div id={"grid"} className={"flex justify-center h-full w-full"}>
                            <CardGrid username={"João"}/>
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
};
