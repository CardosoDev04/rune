import React from "react";
import './dashboard.css'
import RuneLogoWhite from '../../assets/Rune_Logo_white.png'
import Cookies from "js-cookie";
import ChatDark from '../../assets/chat_dark.png'
import ChatLight from '../../assets/chat_light.png'


const runeLogo = <img alt="rune logo" src={RuneLogoWhite} className={"h-10 w-10"}/>
const isDark = Cookies.get('isDark') === 'true'
console.log(isDark)
const navItems = [
    {
        name: "Chats",
        img: isDark ? ChatDark : ChatLight,
    }
    ]
export const Dashboard = () => {
    return (
        <>
            <div
                className={"flex flex-row h-screen w-screen justify-center items-center align-middle page-background dark:page-background"}>
                <div className={"flex flex-row rounded-2xl bg-white dark:bg-black w-11/12 h-5/6"}>
                    <div className={"flex flex-col"}>
                        <div className={"flex flex-row items-center m-4"}>
                            {runeLogo}
                            <h1 className={"font-semibold text-lg text-white"}>Rune</h1>
                        </div>
                        <div className={"flex flex-col"}>
                        {
                            navItems.map((item) => {
                                return (
                                    <div key={item.name}
                                         className={"flex flex-row items-center justify-center mt-10 brightness-75 hover:brightness-100 cursor-pointer"}>
                                        <img src={item.img} alt={item.name} className={"ml-4 h-6 2-6"}/>
                                        <h1 className={"ml-2 mt-1 text-md text-black dark:text-white select-none"}>{item.name}</h1>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                    <div className={"ml-32 opacity-50 border border-white h-full"}></div>
                </div>
            </div>
        </>
    );
};
