import {Link} from "react-router-dom";

export const NotFound = () => {
    return (
            <div className={"flex flex-col h-screen w-screen justify-center align-middle items-center page-background dark:page-background"}>
                <div className={"flex flex-col items-center"}>
                    <h1 className={"flex items-center text-center dark-sign-in-gradient bg-clip-text text-transparent font-semibold text-6xl mb-6 select-none"}>404 - Page Not Found</h1>
                    <p className={"flex text-center text-white text-lg mt-6 mb-5 select-none"}>Unfortunately, the page you are looking for does not exist...</p>
                    <p className={"flex text-white text-sm mt-3 select-none "}>
                        Try heading back to the<Link  to="/" className={"flex ml-1 text-runeBlue-100 hover:text-runeBlue-700"}> landing page.</Link>
                    </p>
                </div>
            </div>
    );
};
