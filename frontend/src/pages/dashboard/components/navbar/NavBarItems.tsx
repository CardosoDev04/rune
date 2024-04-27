import React from "react";
import ChatDark from "../../../../assets/chat_dark.png";
import ChatLight from "../../../../assets/chat_light.png";
import ContactsDark from "../../../../assets/contacts_dark.png";
import ContactsLight from "../../../../assets/contacts_light.png";
import PasswordsLight from "../../../../assets/passwords_light.png";
import PasswordsDark from "../../../../assets/passwords_dark.png";
import PGPLight from "../../../../assets/pgp_light.png";
import PGPDark from "../../../../assets/pgp_dark.png";
import ThreadsDark from "../../../../assets/threads_dark.png";
import ThreadsLight from "../../../../assets/threads_light.png";

type NavbarProps = {
    isDark: boolean;
}
export const NavBarItems = ({isDark}: NavbarProps) => {
    const navItems = [
        {
            name: "Chats",
            img: isDark ? ChatDark : ChatLight,
        },
        {
            name: "Contacts",
            img: isDark ? ContactsDark : ContactsLight,
        },
        {
            name:'Passwords',
            img: isDark ? PasswordsDark : PasswordsLight,
        },
        {
            name: "PGP",
            img: isDark ? PGPDark : PGPLight,
        },
        {
            name : "Threads",
            img: isDark ? ThreadsDark : ThreadsLight,
        }
    ]
    return (
        <>
            {
                navItems.map((item) => {
                    return (
                        <div key={item.name}
                             className={"flex flex-row items-center align-middle justify-start ml-5 mt-9 opacity-100 hover:opacity-75 dark:opacity-100 dark:brightness-75 hover:brightness-100 cursor-pointer select-none"}>
                            <div className={"flex flex-row"}>
                            <img src={item.img} alt={item.name} className={"ml-4 h-6 2-6"}/>
                            <h1 className={"ml-4 mt-0.5 text-md text-black dark:text-white select-none"}>{item.name}</h1>
                            </div>
                        </div>
                    )
                })
            }
        </>
    );
};
