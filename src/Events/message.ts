import { Event, Command } from '../Interfaces';
import { Message } from 'discord.js';

export const event: Event = {
    name: 'messageCreate',
    run: (client, msg: Message) => {
        if (
            msg.author.bot 
            || 
            !msg.guild 
            || 
            !msg.content.startsWith(client.config.prefix)
            ) return;

        const args = msg.content
            .slice(client.config.prefix.length)
            .trim()
            .split(/ +/g);

        const cmd = args.
            shift()
            .toLowerCase();
        if (!cmd) return;
        const command = client.commands.get(cmd) || client.aliases.get(cmd)
        if (command) {
            (command as Command).run(client, msg, args);
        }
    }
}
