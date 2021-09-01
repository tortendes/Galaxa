import { WebhookClient } from "discord.js";
import { Command } from "../../Interfaces";

const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/881386966007033876/1s6aoU2AZNZzcLxCtOeHbG-7torQhWbMpUJnePz_LL_VnqZyuq942pXNbc1_lCTK2B-v' })

export const command: Command = {
    name: 'confess',
    description: 'Confess your sins, and thy sins shall be cleared.',
    aliases: ['ineedtodie'],
    run: async (client, message, args) => {
        webhook.send({
            content: args.splice(0).join(" ").toString(),
            avatarURL: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Question-mark.jpg'
        })

        message.delete()
    }
}