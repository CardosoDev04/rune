
import {PgpClient} from "../lib/client/pgp-client";
import {PasswordClient} from "../lib/client/password-client";
import {rl,askForInput} from '../utils/console-utils'


async function main() {
    const pgpClient = new PgpClient();
    const passwordClient = new PasswordClient();



    console.log(":::  Welcome to Rune  :::")
    console.log("-------------------------")
    console.log("What would you like to do?")
    console.log("1. Access the Password Service")
    console.log("2. Access the PGP Service")
    console.log("3. Exit")
    let option: string = await askForInput("Choose an option")
    let currentView = "";

    switch(option){
        case "3": return process.exit()
        case "1":  currentView = "passwordService"
           break;
        case "2": currentView = "pgpService"
            break;
    }

    console.log(currentView)

}

main()