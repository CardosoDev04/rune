import {AuthPageButton} from "./components/button/AuthPageButton";
import React, {useState} from "react";
import {Input} from "./components/input/Input";
import RuneLogo from '../../assets/Rune_Logo.png'
import {FooterNote} from "../../general-components/FooterNote";
import './login.css'
import {Link,useNavigate} from "react-router-dom";
import {useQuery, gql, useMutation} from "@apollo/client";
import Cookies from "js-cookie";

const REGISTER_MUTATION = gql`
    mutation Register($name: String!, $password: String!){
        register(name: $name, password: $password){
            token
        }
    }
`

const LOGIN_QUERY = gql`
    query Login($name: String!, $password: String!){
        login(name: $name, password: $password){
            token
        }
    }
`

type UserAuthPageProps = {
    type: string;
}
export const UserAuthPage = ({type}: UserAuthPageProps) => {

    const [errorMessage, setErrorMessage] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [register, { data, loading, error }] = useMutation<
        { register: { token: string } },
        { name: string; password: string }
    >(REGISTER_MUTATION);

    const navigate = useNavigate();

    const handleRegister = async () => {
        try{
            const response = await register({
                variables: {
                    name: username,
                    password: password
                }
            });


            const data = response.data

            if(data && data.register && data.register.token){
                Cookies.set("userToken", data.register.token)
                navigate("/dashboard")
            }

            if(loading){
                console.log("Registering...")
            }


        }catch(e) {
            console.log(e)
            if( e instanceof Error){
            setErrorMessage(e.message.split(":")[1].replace(/"/g,""))
            console.log(errorMessage)
            setTimeout(() => {
                setErrorMessage("")
            },10000)
        }
        }
    }

    const handleLogin = async () => {

    }

    return (
        <>

            <div
                className={"flex flex-row h-screen w-screen justify-center items-center align-middle page-background dark:page-background"}>
                <div className={"flex flex-col"}>
                    <div
                        className={"flex pb-2 mt-8 flex-col justify-center items-center shadow-2xl dark:shadow-3xl dark:shadow-black rounded-3xl bg-white dark:bg-black w-[350px] h-[490px]"}>
                        <img src={RuneLogo} className={"flex w-[80px] h-[80px] mb-3"}/>
                        <h1 className={"text-black dark:text-white font-semibold text-3xl mb-5 select-none"}>{
                            type === "login" ? "Sign in." : "Sign up."

                        }</h1>
                        <Input
                            customClass={"mb-6"}
                            id={"username-input"}
                            placeholder={"Enter your username"}
                            label={"Username"} type={"text"}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}/>
                        <Input id={"password-input"}
                               customClass={"mb-4"}
                               placeholder={"Enter your password"}
                               label={"Password"} type={"password"}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
                        <div onClick={type === "login" ? handleLogin : handleRegister}>
                        <AuthPageButton text={
                            type === "login" ? "Login" : "Register"
                        }
                        />
                        </div>
                        <div className={"flex mt-2 items-center text-red-500 text-md"}>{errorMessage}</div>
                        {type === "login" ?
                            <span className={"flex sign-in-gradient bg-clip-text dark:text-white text-xs mt-4 mb-5 select-none"}>Don't have an account yet?
                        <Link to="/register"
                              className={"flex text-runeBlue-500 dark:to-runeBlue-100 select-none hover:text-runeBlue-700 cursor-pointer ml-1"}>
                            Sign up.
                        </Link>
                    </span> :
                            <span className={"flex sign-in-gradient bg-clip-text dark:text-white text-xs mt-4 mb-5 select-none"}>Already have an account?
                        <Link to="/login"
                              className={"flex text-runeBlue-500 dark:to-runeBlue-100 select-none hover:text-runeBlue-700 cursor-pointer ml-1"}>
                            Sign in.
                        </Link>
                    </span>
                        }
                    </div>
                    <div className={"flex flex-col mt-9 items-center justify-center"}>
                        <FooterNote text={"© 2024 Rune. All Rights Reserved."}/>
                        <FooterNote text={"https://rune-app.com"}/>
                    </div>
                </div>
            </div>
        </>
    )
}