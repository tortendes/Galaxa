import { Command } from "../../Interfaces";

export const command: Command = {
    name: 'memcount',
    aliases: ['mem'],
    run: (client, message, args) => {
        message.reply(message.guild.memberCount.toString())
    }
}