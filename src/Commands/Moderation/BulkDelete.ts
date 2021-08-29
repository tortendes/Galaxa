import { Command } from "../../Interfaces";

export const command: Command = {
    name: 'bulkdelete',
    aliases: ['bulkdel'],
    run: (client, message, args) => {
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
            const amount = args[0]
            const reason = args.slice(0).join(" ")
            const channel = message.mentions.channels.first

            if (message.channel.type === 'GUILD_TEXT') message.channel.bulkDelete(parseInt(amount), true)

            const finished = client.embed(
                {}
            ).setColor('AQUA')
            .setTitle('Bulk delete success')
            .setDescription(`Deleted ${amount} messages in <#${message.channel.id}>`)

            message.channel.send({ embeds: [finished] })
        } else {
            return message.reply({ content: 'Unauthorized.' })
        }
    }
}