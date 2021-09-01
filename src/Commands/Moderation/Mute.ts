import { Command } from "../../Interfaces";
import { Message, GuildMember } from "discord.js";

import Punishment from "../../Models/Punishment";
import config from "../../../config";

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
            function ResolveMember(message: Message, arg: string): GuildMember | undefined {
                if (!message || !arg) return;

                if (message.mentions?.members?.first())
                    return message.mentions.members.first();
                if (!isNaN(parseInt(arg, 10))) return message.guild?.members.cache.get(arg);
            }

            const user = ResolveMember(message, args[0])
            let duration = args[1]
            let reason = args.splice(2).join(" ")

            const mutedRole = message.guild?.roles.cache.get(config.roles.MUTED_ROLE.toString())

            if (!user) {
                const error = client.embed({
                    title: 'No user found',
                    description: 'No user was found using the id/mention you provided.'
                })
                return message.reply({ embeds: [error] }).then(m => setTimeout(() => m.delete, 5000))
            }

            if (!reason) reason = "No reason defined"

            if (!mutedRole) {
                try {
                    message.guild?.roles.create({
                        name: 'Muted',
                        color: '#2A2A2A',
                        permissions: []
                    })
                } catch (error) {
                    const embed = client.embed({
                        'title': 'Cockenspaniel Error',
                        'color': '#DC2626',
                        'description': 'An error occured while creating a role. Please wait for a few moments and try again.'
                    })

                    message.reply({ embeds: [embed] })
                }
            }

            user.roles.add(mutedRole)
            user.roles.remove(message.guild?.roles.cache.get(r => r.name === "Space Cadets"))

            Punishment.create({
                type: "MUTE",
                userID: user.id,
                reason: reason
            })

            

            const embed = client.embed({
                title: 'Muted',
                color: '#2A2A2A',
                description: `You have been muted in ${message.guild?.name}. For more details, please mind to read the stuff below.`,
                fields: [
                    { name: 'Reason', value: reason, inline: true },
                    { name: 'Duration', value: duration, inline: true },
                    { name: 'Strike Count', value: 'undefined', inline: true  },
                ]
            })

            user.send({ embeds: [embed] })

        } else {
            const embed = client.embed({
                title: 'Unauthorized',
                description: 'You do not have permission to execute this command.'
            })

            return message.reply({ embeds: [embed] })
        }
    }
}