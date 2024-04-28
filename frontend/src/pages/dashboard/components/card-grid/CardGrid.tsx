import Cookies from "js-cookie";
import ChatDark from  '../../../../assets/chat_dark.png'
import ChatLight from '../../../../assets/chat_light.png'
import ContactsDark from '../../../../assets/contacts_dark.png'
import ContactsLight from '../../../../assets/contacts_light.png'
import PasswordsDark from '../../../../assets/passwords_dark.png'
import PasswordsLight from '../../../../assets/passwords_light.png'
import PGPLight from '../../../../assets/pgp_light.png'
import PGPDark from '../../../../assets/pgp_dark.png'
import ThreadsDark from '../../../../assets/threads_dark.png'
import ThreadsLight from '../../../../assets/threads_light.png'


type UserData =  {
    [key:string] : number;
    "Chats" : number;
    "Contacts": number;
    "Passwords": number;
    "PGP": number;
}

type CardGridProps = {
    username: string;
    timeSinceLastLogin : string;
    alertCount: number;
    userData: UserData;
    isDark: boolean;
}
export const CardGrid = ({username,timeSinceLastLogin,alertCount,userData,isDark}: CardGridProps) => {


    const cardData = [
        {
            title: 'Chats',
            text:'Speak privately with your contacts through secure, encrypted conversations.',
            logo: isDark ? ChatDark : ChatLight
        },
        {
            title: 'Contacts',
            text:'Manage your contacts, create new ones and see who you have been talking to the most.',
            logo: isDark ? ContactsDark : ContactsLight
        },
        {
            title: 'Passwords',
            text:'Manage, generate and securely store robust passwords in an encrypted vault.',
            logo: isDark ? PasswordsDark : PasswordsLight
        },
        {
            title: 'PGP',
            text:'Manage your PGP keys, encrypt and decrypt text and generate new key pairs.',
            logo: isDark ? PGPDark : PGPLight
        },
        {
            title: 'Threads',
            text:'Speak your mind freely on an anonymous threading platform',
            logo: isDark ? ThreadsDark : ThreadsLight
        }
    ]
    return (
        <>
            <div className={"grid items-center grid-cols-3 grid-rows-2"}>
                <div className={"flex mt-10 w-72 h-48"}>
                    <div className={"mt-10 ml-10"}>
                        <div className={"flex"}>
                    <h1 className={"flex text-black dark:text-white text-3xl select-none"}>Welcome,
                        <h1 className={"ml-2 flex font-bold select-none"}> {username}</h1>.
                    </h1>
                        </div>
                        <div>
                        <h3 className={"flex text-black opacity-75 dark:text-white select-none"}>You've last logged in {' ' + timeSinceLastLogin} ago.</h3>
                            <h3 className={"flex text-black opacity-75 dark:text-white select-none"} >You have {alertCount} alerts.</h3>
                        </div>

                    </div>
                </div>
            {
                cardData.map((card) => {
                    return <div key={card.title.toLowerCase()} className={"w-72 h-48 m-10 rounded-xl border border-black hover:bg-gray-200 dark:hover:bg-darkComponentBg-800 cursor-pointer dark:bg-darkComponentBg-900 dark:border-white "}>
                        <h1 className={"flex mt-5 ml-5 text-black dark:text-white font-semibold text-2xl select-none"}>{card.title}</h1>
                        <p className={"flex mt-3 ml-5 mr-3 text-black text-sm opacity-50 dark:text-white text-left select-none"}>{card.text}</p>
                        <div className={"flex flex-row align-middle items-center justify-start"}>
                        <img className={"flex opacity-50 w-8 h-8 ml-5 " + (card.title !== 'Threads' ? "mt-5" : "mt-10") } src={card.logo} alt={card.title}/>
                            <h2 className={"flex mt-5 ml-2 text-lg text-black opacity-50 dark:text-white font-semibold text-md select-none"}>{userData[card.title]}</h2>
                        </div>
                    </div>
                })
            }
            </div>
        </>
    );
};
