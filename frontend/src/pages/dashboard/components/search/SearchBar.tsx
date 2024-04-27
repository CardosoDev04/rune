
import SearchDark from "../../../../assets/search_dark.png";
import SearchLight from "../../../../assets/search_light.png";

import Cookies from "js-cookie";


type SearchbarProps = {
    isDark: boolean;

}
export const SearchBar = ({isDark}: SearchbarProps) => {
    const searchIcon = isDark ? SearchDark : SearchLight;
    return (
        <>
            <div className={"flex flex-row bg-gray-400 dark:bg-darkComponentBg-900 h-9 rounded-sm border-opacity-50 border border-white"}>
                <input placeholder={"Search..."} className={"text-black placeholder:text-black dark:placeholder:text-white dark:text-white bg-gray-300 dark:bg-darkComponentBg-900 input-with-image"} style={{
                    backgroundImage: `url(${searchIcon})`,
                    backgroundSize: '25px',
                    backgroundPosition: '5px 50%',
                    paddingLeft: '40px',
                    backgroundRepeat: 'no-repeat',
                }}></input>
            </div>
        </>
    );
};
