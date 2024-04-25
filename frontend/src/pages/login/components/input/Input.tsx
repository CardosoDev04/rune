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
            <label className={"flex text-inputLabelColorDark font-normal select-none"} htmlFor={id}>{label}</label>
                <input className={`flex placeholder:text-placeHolderDark bg-darkComponentBg-600 text-white text-center p-2 rounded-md dark-gray-shadow ${customClass}`} id={id} type={type} placeholder={placeholder} onChange={onChange}></input>
        </div>
    )
}