import { Command } from "../../Interfaces";

export const command: Command = {
    name: 'kiss',
    description: 'Kiss someone',
    aliases: ['smooch'],
    run: async (client, message, args) => {
        const target = message.mentions.users.first() || args.slice(0).join(" ")
        let content = `${message.author} kissed ${target} nicely.`


        if (!target) {
            return message.reply('Who are you kissing exactly? Try again by mentioning a user this time.')
        } else if (target == message.author) {
            return message.reply('That thing you\'re planning sounds weird.')
        } else if (target == client.user) {
            return message.reply('***D O N T***')
        }

        await message.channel.sendTyping()

        const { images } = await client.yiff.yiffy('furry', 'boop')    

        const embed = client.embed({
            author: {
                name: `${images[0].artists[0] ? `Art by ${images[0].artists[0]}` : 'No artist found'}`
            },
            color: '#f2c81f',
            image: {
                url: images[0].url,
                width: images[0].width,
                height: images[0].height
            }
        })

        return message.channel.send({
            content,
            embeds: [embed]
        })
    }
}
