import {useQuery,gql} from "@apollo/client";


const QUERY_ALL_USERS = gql`
    query users{
        users {
            id,
            name
        }
    }
`

export function DisplayData() {
    const {data} = useQuery(QUERY_ALL_USERS);
     if(data)console.log(data)
    return (
        <div>
            {data && data.users.map(
                (user:  any) => {
                    return (
                        <div key={user.id}>
                            <p>{user.name}</p>
                        </div>
                    )
                }
            )}
        </div>
    );
}