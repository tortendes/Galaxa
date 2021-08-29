import { Client, Collection, Intents, MessageEmbed, MessageEmbedOptions } from 'discord.js'
import { connect } from 'mongoose';
import path from  'path';
import { readdirSync } from 'fs';
import { Command, Event, Config } from '../Interfaces';
import consola, { Consola } from 'consola';
import dotenv from 'dotenv';
import Yiff from 'yiff';


class GalaxaClient extends Client {
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public aliases: Collection<string, Command> = new Collection();
    public config: Config;
    public logger: Consola = consola;
    public yiff = new Yiff({
        useragent: 'Galaxa 3 (https://furrygalaxy.gq/galaxaa)',
        killswitch: {
            enabled: true,
            instance: 'https://yiff.click'
        },
        apikey: {
            e926: process.env.E926_TOKEN,
            yiffrest: process.env.YIFFREST_TOKEN
        } 
    })

    constructor() {
        super({
            intents: new Intents(32767)
        })
        dotenv.config()
    }

    public async start(conf: Config): Promise<void> {

		this.config = conf;
		this.config.prefix = conf.prefix;
        this.config.mongoURI = conf.mongoURI;

		super.login(this.config.token)
            .catch(e => this.logger.error(e))

        connect(this.config.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })
            .catch(e => this.logger.error(e))
            .then(() => this.logger.success('Connected to database.'));

        // Commands

        const commandsPath = path.join(__dirname, '..', 'Commands');
        readdirSync(commandsPath).forEach((dir) => {
            const commands = readdirSync(`${commandsPath}/${dir}`).filter(file => file.endsWith('.ts'));

            for (const file of commands) {
                const { command } = require(`${commandsPath}/${dir}/${file}`);
                this.commands.set(command.name, command);

                if (command?.aliases.length !== 0) {
                    command.aliases.forEach((alias: string) => {
                        this.aliases.set(alias, command);
                    });
                }

                this.logger.info(`The ${command.name} command has been loaded.`)
            }
        })


        // Events
        const eventPath = path.join(__dirname, '..', 'Events');
        readdirSync(eventPath).forEach(async (file) => {
            const { event } = await import(`${eventPath}/${file}`);
            this.events.set(event.name, event);

            this.logger.info(`The ${event.name} event has been loaded.`)

            this.on(event.name, event.run.bind(null, this));
        })
    }

    public embed(data: MessageEmbedOptions): MessageEmbed {
        return new MessageEmbed({
            color: '#4ae9f7',
            ...data,
            timestamp: Date.now(),
            footer: {
                text: 'Galaxa 3 | Under GPLv3',
                iconURL: this.user?.displayAvatarURL({
                    dynamic: true,
                    format: 'png'
                })
            }
        })

    }
}

export default GalaxaClient;