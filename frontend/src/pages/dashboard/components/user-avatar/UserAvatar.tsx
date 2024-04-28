import NoUserAvatar from "../../../../assets/no_user_avatar.png"

type UserAvatarProps = {
    username: string;
}
export const UserAvatar = ({username}: UserAvatarProps) => {
    const userImg = undefined
    return (
        <>
        <img src={userImg ? userImg : NoUserAvatar} className={"flex rounded-3xl h-14 w-14"} alt={"user"}/>
        </>
    );
};
