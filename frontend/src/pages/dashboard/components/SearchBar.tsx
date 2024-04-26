
import SearchDark from "../../../assets/search_dark.png";
import SearchLight from "../../../assets/search_light.png";

import Cookies from "js-cookie";
const isDark = Cookies.get('isDark') === 'true'

const searchIcon = isDark ? SearchDark : SearchLight;
export const SearchBar = () => {
    return (
        <>
            <div className={"flex flex-row bg-darkComponentBg-900  h-9 rounded-sm border-opacity-50 border border-white"}>
                <input placeholder={"Search..."} className={"text-black dark:text-white bg-darkComponentBg-900 input-with-image"} style={{
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
