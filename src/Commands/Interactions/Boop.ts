import { Command } from "../../Interfaces";

export const command: Command = {
    name: 'boop',
    description: 'Boop someone',
    aliases: ['bap'],
    run: async (client, message, args) => {
        const target = message.mentions.users.first() || args.slice(0).join(" ")
        let content = `${message.author} has gave ${target} a nice warm hug.`


        if (!target) {
            return message.reply('Who are you booping exactly? Try again by mentioning a user this time.')
        } else if (target == message.author) {
            return message.reply('How can you boop yourself?')
        } else if (target == client.user) {
            content = `${message.author} booped me! :flushed:`
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