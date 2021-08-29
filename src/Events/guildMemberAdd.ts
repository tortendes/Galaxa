import { Event, Command } from "../Interfaces";
import { Canvas, createCanvas, loadImage, registerFont } from "canvas";
import { MessageAttachment, MessageEmbed } from "discord.js";

const applyText = (canvas: Canvas, text: string, font: string, style: 'black' | 'bold' | 'semibold' | 'regular' | 'light' | 'thin') => {
	const context = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 60;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		context.font = `${style} ${fontSize -= 10}px ${font}`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (context.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return context.font;
};

export const event: Event = {
    name: 'guildMemberAdd',
    run: (client, member) => {
        if (member.user.bot) return;
        const canvas = createCanvas(1000, 250)
        const ctx = canvas.getContext('2d')
        registerFont('../Galaxa/src/Assets/Inter-SemiBold.ttf', { family: 'Inter-SemiBold' })
        registerFont('../Galaxa/src/Assets/Inter-Bold.ttf', { family: 'Inter-Bold' })
        registerFont('../Galaxa/src/Assets/Inter-Regular.ttf', { family: 'Inter' })

        loadImage('../Galaxa/src/Assets/background.png').then((image) => {
            ctx.fillStyle = '#222222'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.drawImage(image, 0, 0)
            
            ctx.font = applyText(canvas, `${member.user.tag} joined`, 'Inter-Bold', 'bold')
            ctx.fillStyle = '#fff'
            ctx.fillText(`${member.user.tag}`, canvas.width / 4.6, canvas.height / 1.8)

            ctx.font = 'regular 30px Inter'
            ctx.fillStyle = '#2a2a2a'
            ctx.fillText(`the server has now ${member.guild.memberCount} members`, canvas.width / 4.5, canvas.height / 1.4)

        })

        loadImage('../Galaxa/src/Assets/logo.png').then((image1) => {
            ctx.drawImage(image1, 810, 200)
        })


        loadImage(member.user.displayAvatarURL({ format: 'png' })).then((image) => {
            // draw image with circle shape clipc
            ctx.beginPath();
            // Start the arc to form a circle
            ctx.arc(120, 140, 80, 0, Math.PI * 2, true);
            // Put the pen down
            ctx.closePath();
            // Clip off the region you drew on
            ctx.clip();

            ctx.drawImage(image, 40, 60, 160, 160)

            const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome.png')

            const embed = client.embed({
                color: '#4ae9f7',
                image: {
                    url: 'attachment://welcome.png'
                }
            })

            member.guild.channels.cache.get('695231971676258347').send({ content: `<@${member.id}>  (${member.tag}) has joined.`, embeds: [embed], files: [attachment] })
        })
    }
}
