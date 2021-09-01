import { MessageEmbed } from "discord.js";
import { Command } from "../../Interfaces";

export const command: Command = {
    name: 'ping',
    description: 'Check the bots ping.',
    aliases: ['pong', 'latency'],
    run: async (client, message, args) => {
        const res = new MessageEmbed()
            .setTitle('Latency information')
            .setColor('#4ae9f7')
            .setDescription(`🔌 ${client.ws.ping}ms\n🤖 ${message.createdTimestamp - Date.now()}ms`)
            .setTimestamp()
            .setFooter('Galaxa 3 | Under GPLv3', client.user?.displayAvatarURL())
        
        const init = new MessageEmbed()
            .setDescription('Testing latency.')

        const reply = message.reply({ embeds: [init] })
        
        ;(await reply).edit({ embeds: [res] })
    }
}