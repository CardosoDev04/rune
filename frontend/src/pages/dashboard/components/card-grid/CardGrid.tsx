
const cardData = [
    {
        title: 'Chats',
        text:'Speak privately with your contacts through secure, encrypted conversations.'
    },
    {
        title: 'Contacts',
        text:'Manage your contacts, create new ones and see who you have been talking to the most.'
    },
    {
        title: 'Passwords',
        text:'Manage, generate and securely store robust passwords in an encrypted vault.'
    },
    {
        title: 'PGP',
        text:'Manage your PGP keys, encrypt and decrypt text and generate new key pairs.'
    },
    {
        title: 'Threads',
        text:'Speak your mind freely on an anonymous threading platform'
    }
]

type CardGridProps = {
    username: string;
}
export const CardGrid = ({username}: CardGridProps) => {
    return (
        <>
            <div className={"grid items-center grid-cols-3 grid-rows-2"}>
                <div className={"flex items-center w-72 h-48"}>
                    <div className={"ml-5"}>
                    <h1 className={"flex text-white text-3xl"}>Welcome,
                        <h1 className={"ml-2 flex font-bold"}> {username}</h1>.
                    </h1>
                    </div>
                </div>
            {
                cardData.map((card) => {
                    return <div className={"w-72 h-48 m-10 rounded-xl border border-black dark:bg-darkComponentBg-900 dark:border-white "}>

                    </div>
                })
            }
            </div>
        </>
    );
};
