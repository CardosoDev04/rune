import {LoginPageButton} from "./components/button/LoginPageButton";
import React, {useState} from "react";
import {Input} from "./components/input/Input";
import RuneLogo from '../../assets/Rune_Logo.png'
import {FooterNote} from "../general-components/FooterNote";
import './login.css'

export const LoginPage = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")


    return (
        <>
            <div
                className={"flex flex-col h-screen w-screen justify-center align-middle items-center page-background dark:page-background"}>

                <div
                    className={"flex pb-2 mt-8 flex-col justify-center items-center blue-shadow rounded-3xl bg-darkComponentBg-800 w-[350px] h-[490px]"}>
                        <img src={RuneLogo} className={"flex w-[80px] h-[80px] mb-3"}/>
                        <h1 className={"dark-sign-in-gradient bg-clip-text text-transparent font-semibold text-3xl mb-5"}>Sign in.</h1>
                        <Input
                            customClass={"mt-1 mb-6"}
                            id={"username-input"}
                            placeholder={"Enter your username"}
                            label={"Username"} type={"text"}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}/>
                        <Input id={"password-input"}
                               customClass={"mb-4"}
                               placeholder={"Enter your password"}
                               label={"Password"} type={"password"}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>

                        <LoginPageButton text={"Login"}/>

                        <span className={"flex text-white text-xs mt-4 mb-5"}>Don't have an account yet?
                        <span
                            className={"flex text-runeBlue-500 select-none hover:text-runeBlue-700 cursor-pointer ml-1"}>
                            Sign up.
                        </span>
                    </span>
                    </div>
                <div className={"flex flex-col mt-9 items-center justify-center"}>
                        <FooterNote text={"© 2024 Rune. All Rights Reserved."}/>
                        <FooterNote text={"https://rune-app.com"}/>
                </div>
            </div>
        </>
    )
}