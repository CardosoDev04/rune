import React, {useContext, useEffect, useLayoutEffect, useState} from "react";
import './dashboard.css'
import RuneLogoWhite from '../../assets/Rune_Logo_white.png'
import RuneLogoBlack from '../../assets/Rune_Logo_black.png'
import {NavBarItems} from "./components/navbar/NavBarItems";
import {SearchBar} from "./components/search/SearchBar";
import {CardGrid} from "./components/card-grid/CardGrid";
import {DarkModeToggle} from "../../general-components/DarkModeToggle";
import {DarkModeContext} from "../../App";
import {Avatar} from "@nextui-org/react";
import {gql, useLazyQuery, useQuery} from "@apollo/client";
import {useNavigate} from "react-router-dom";


const USER_INFO_QUERY = gql`
    query User{
        user{
            name
        }
    }
`


export const Dashboard = () => {

    const [getInfo, {data, loading,error }] = useLazyQuery<
        {user: {
            name:string
            }}
    >(USER_INFO_QUERY);

    const [username, setUsername] = useState<string>("")
    const [usernameLoading, setUsernameLoading] = useState<boolean>(true)
    const [userProfilePicture, setUserProfilePicture] = useState<string>("")
    const [userProfilePictureLoading, setUserProfilePictureLoading] = useState<boolean>(true)
    useLayoutEffect(() => {
        getName().then(() => setUsernameLoading(false))
        getProfilePicture().then(() => {
            setUserProfilePictureLoading(false)
        })
    }, []);

    async function getName(){
        const response = await getInfo();
        if(loading){
            console.log("Loading...")
        }
        if(error){
            console.log(error)
            return "Error fetching username"
        }
        if(response && response.data){
            console.log("setting name...")
            console.log(response.data.user.name)
           setUsername(response.data.user.name)
        }
    }

    async function getProfilePicture(){
        const response = await getInfo();
        if(loading){
            console.log("Loading...")
        }
        if(error){
            console.log(error)
            return "Error fetching profile picture"
        }
        if(response && response.data){
            setUserProfilePicture("")
        }
    }

    const { isDark, toggleDarkMode } = useContext(DarkModeContext);
    const runeLogo = <img alt="rune logo" src={isDark ? RuneLogoWhite : RuneLogoBlack} className={"h-10 w-10"}/>

    const navigate = useNavigate();
    return (
        <>
            {!username && usernameLoading && <div className={"flex flex-row h-screen w-screen justify-center items-center align-middle page-background dark:page-background"}></div>}
            {!username && !usernameLoading && navigate("/login")}
            {!usernameLoading && username &&  <div
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
                                    <div className={"mb-5"}>
                                        <Avatar showFallback name={username} size={"md"} getInitials={
                                            (name) => {
                                                return name[0]
                                            }
                                        } className={"bg-black ml-32 text-white hover:cursor-pointer dark:bg-gray-400 dark:text-black capitalize rounded-3xl"}/>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className={"ml-10 opacity-30 border border-black dark:border-white h-full"}></div>
                    </div>
                    <div className={"flex flex-col justify-between items-between  w-full"}>
                        <div className={"flex justify-between h-10 mt-5 mr-5"}>
                            <h1 className={"select-none ml-4 flex text-black dark:text-white text-xl font-semibold"}>Dashboard</h1>
                            <SearchBar isDark={isDark}></SearchBar>
                        </div>
                        <div className={"mt-5 opacity-30 border border-black dark:border-white w-full"}></div>
                        <div id={"grid"} className={"flex justify-center h-full w-full"}>
                            <CardGrid username={username} timeSinceLastLogin={"30min"} alertCount={12} userData={
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
            </div> }

        </>
    );
};
