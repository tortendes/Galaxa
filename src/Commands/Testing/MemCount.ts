import { Command } from "../../Interfaces";

export const command: Command = {
    name: 'memcount',
    aliases: ['mem'],
    run: (client, message, args) => {
        console.log(args.splice(0).join(" "))
    }
}