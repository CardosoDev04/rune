type FooterProps = {
    text: string;
}

export const FooterNote = ({text}: FooterProps) => {
    return (
            <p className={"text-footerLight text-xs dark:text-footerDark"}>{text}</p>
    )
}