import { Permissions } from "discord.js";
import { Command } from "../../Interfaces";

export const command: Command = { 
    name: 'renameall',
    aliases: ['kek'],
    run: async (client, message, args) => {
        const arg = args.splice(0).join(" ")

        message.reply('Running command. This may take a while.')
        message.channel.sendTyping()

        const nick = null
        let count = 0
        await message.guild?.members.cache.forEach(member => {
            if (!member.manageable) return;
            if (member.nickname === arg) return;
            member.setNickname(arg)
            count++
            console.log(arg)
        })

        message.reply(`Finisehd Execution. renamed ${count} people`)
    }
}