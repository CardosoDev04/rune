import './login-button.css'
import React from "react";

type AuthPageButtonProps = {
    text: string;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}
export const AuthPageButton = ({text}: AuthPageButtonProps) => {
    return (
            <button
                className={"flex input-shadow dark:dark-gray-shadow w-24 h-2 p-5 text-center justify-center align-middle font-medium text-white hover:bg-white hover:border-2 hover:border-black hover:text-black dark:bg-white dark:text-black dark:hover:text-white text-sm items-center rounded-3xl bg-black dark:hover:bg-black dark:hover:border-2 dark:hover:border-white"}>
                {text}
            </button>
    )
}