import NoUserAvatar from "../../../../assets/images/no_user_avatar.png";

type UserAvatarProps = {
    username: string;
}
export const UserAvatar = ({username}: UserAvatarProps) => {
    const userImg = undefined
    return (
        <>
        <img src={userImg} className={"flex rounded-3xl"} alt={"user"}/>
        </>
    );
};
