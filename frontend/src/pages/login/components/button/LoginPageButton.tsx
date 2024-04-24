type LoginPageButtonProps = {
    text: string;
}
export const LoginPageButton = ({text}: LoginPageButtonProps) => {
    return (
            <button
                className={"shadow-sm shadow-black pl-6 pr-6 pt-2 pb-2 text-center font-medium text-white text-sm items-center rounded-3xl login-page-button-gradient"}>
                {text}
            </button>
    )
}