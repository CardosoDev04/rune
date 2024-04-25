import './login-button.css'
import React from "react";

type LoginPageButtonProps = {
    text: string;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}
export const LoginPageButton = ({text}: LoginPageButtonProps) => {
    return (
            <button
                className={"flex dark-gray-shadow w-24 h-2 p-5 text-center justify-center align-middle font-medium text-white text-sm items-center rounded-3xl login-page-button-gradient"}>
                {text}
            </button>
    )
}