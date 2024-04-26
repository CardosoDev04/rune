import React from "react";
import './dashboard.css'
import RuneLogoWhite from '../../assets/Rune_Logo_white.png'
import Cookies from "js-cookie";
import {NavBarItems} from "./components/NavBarItems";
import {SearchBar} from "./components/SearchBar";


const runeLogo = <img alt="rune logo" src={RuneLogoWhite} className={"h-10 w-10"}/>
const isDark = Cookies.get('isDark') === 'true'
export const Dashboard = () => {
    return (
        <>
            <div
                className={"flex flex-row h-screen w-screen justify-center items-center align-middle page-background dark:page-background"}>
                <div id={"black-box"} className={"border border-white flex flex-row justify-between rounded-2xl bg-white dark:bg-black w-11/12 h-5/6"}>
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
                        <div className={"border border-white h-16"}>
                        <SearchBar></SearchBar>
                        </div>
                    </div>
                    <section id={"grid"} className={"flex flex-grow border mt-36 border-white w-full"}></section>


                </div>
            </div>
        </>
    );
};
