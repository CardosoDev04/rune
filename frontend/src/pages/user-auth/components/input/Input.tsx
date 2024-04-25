import './input.css'
import React from "react";

type InputProps = {
    id: string,
    placeholder: string;
    label: string;
    type: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    customClass?: string;
}

export const Input = ({id, placeholder,label,type,onChange,customClass}: InputProps) => {
    return (
        <div className={"flex flex-col"}>
            <label className={"flex sign-in-gradient bg-clip-text dark:text-white text-sm mb-2 font-normal select-none"} htmlFor={id}>{label}</label>
                <input className={`flex placeholder:text-placeHolderLight dark:placeholder:text-placeHolderDark bg-white dark:bg-gray-900 border border-gray-400 dark:border dark:border-white text-black dark:text-white text-start p-2 rounded-md input-shadow dark:dark-gray-shadow ${customClass}`} id={id} type={type} placeholder={placeholder} onChange={onChange}></input>
        </div>
    )
}