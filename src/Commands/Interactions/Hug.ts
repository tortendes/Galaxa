import { Command } from "../../Interfaces";

export const command: Command = {
    name: 'hug',
    description: 'Hug someone',
    aliases: ['cuddle'],
    run: async (client, message, args) => {
        const target = message.mentions.users.first() || args.slice(0).join(" ")
        let content = `${message.author} has gave ${target} a nice warm hug.`


        if (!target) {
            return message.reply('Who are you hugging exactly? Try again by mentioning a user this time.')
        } else if (target == message.author) {
            content = `${message.author} was lonely so he gave himself a hug.`
        } else if (target == client.user) {
            content = `${message.author} hugged me! AAAAAAAAAAa`
        }

        await message.channel.sendTyping()

        const { images } = await client.yiff.yiffy('furry', 'hug')    

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