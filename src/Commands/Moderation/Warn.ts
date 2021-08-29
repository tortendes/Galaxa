import { Command } from "../../Interfaces";

import Punishment from "../../Models/Punishment";

export const command: Command = {
    name: 'warn',
    description: 'Warns selected user.',
    aliases: ['notify'],
    run: async (client, message, args) => {
        if (!message.member) {
            return message.channel.send({ content: 'Cockenspanier Error: A unexpected error has occured that should not occur. Contact developer for more info.' })
        }

        if (message.member.roles.cache.some(role => role.id == '822725899484135464')
        ||
        message.member.roles.cache.some(role => role.id == '822725890403205121')
        ||
        message.member.roles.cache.some(role => role.id == '822724789390802976')
        ||
        message.member.roles.cache.some(role => role.id == '822723511919443969')
        ) {
            const user = message.mentions.users.first() || message.guild?.members.cache.get(args[0])
            let reason = args.splice(0).join(" ")

            if (!user) {
                const error = client.embed({
                    title: 'No user found',
                    description: 'No user was found using the id/mention you provided.'
                })
                message.reply({ embeds: [error] }).then(m => setTimeout(() => m.delete, 5000))
            }

            if (!reason) reason = "No reason defined"

            const embed = client.embed({
                color: '#FCBB17'
            })

        } else {
            const embed = client.embed({
                title: 'Unauthorized',
                description: 'You do not have permission to execute this command.'
            })

            return message.reply({ embeds: [embed] })
        }
    }
}