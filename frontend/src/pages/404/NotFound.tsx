import {Link} from "react-router-dom";
import {DarkModeToggle} from "../../general-components/DarkModeToggle";

export const NotFound = () => {
    return (
            <div className={"flex flex-col h-screen w-screen justify-center align-middle items-center page-background dark:page-background"}>
                <div className={"absolute top-0 right-0 z-50 m-2"}>
                <DarkModeToggle/>
                </div>
                <div className={"flex flex-col items-center"}>
                    <h1 className={"flex items-center text-center text-black dark:text-runeBlue-100 font-semibold text-6xl mb-6 select-none"}>404 - Page Not Found</h1>
                    <p className={"flex text-center text-black dark:text-white text-lg mt-6 mb-5 select-none"}>Unfortunately, the page you are looking for does not exist...</p>
                    <p className={"flex text-black dark:text-white text-sm mt-3 select-none "}>
                        Try heading back to the<Link  to="/" className={"flex ml-1 text-runeBlue-700 dark:text-runeBlue-100 hover:text-runeBlue-700"}> landing page.</Link>
                    </p>
                </div>
            </div>
    );
};
