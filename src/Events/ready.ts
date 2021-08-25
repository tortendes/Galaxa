import { TextChannel } from 'discord.js';
import { Event, Command } from '../Interfaces';

export const event: Event = {
    name: 'ready',
    run: (client) => {
        client.user.setStatus('dnd')
        client.user.setPresence({ activities: [{ name: 'Alpha Pre-Relase', type: 'PLAYING', url: 'https://furrygalaxy.gq' }] })
        client.logger.start('Bot has started')

        setInterval(() => {
            const channel = client.channels.cache.get('823203542852436038')
            if (channel instanceof TextChannel) {
                channel.bulkDelete(100, true)
            }
        }, 300000)
    }
}