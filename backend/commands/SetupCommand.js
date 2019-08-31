const { Command } = require('discord-akairo');

class SetupCommand extends Command {
    constructor() {
        super('setup', {
            aliases: ['setup'],
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['ADMINISTRATOR'],
        });
    }

    async exec(message) {
        const guild = message.guild;

        await message.reply(`Guild ID is __${guild.id}__ add the **guildId** field in config.json`);

        // Create role that are needed to whitelist
        await guild.createRole({
            name: 'Aprovador Whitelist'
        })
        .then(role => message.reply(`Role ${role.name} created. Add the ID __${role.id}__ in **allowedRole** field in config.json.`));

        // Create emojis used by Bot to add reaction
        await guild.createEmoji('PUT_EMOJI_LINK_HERE', 'approved')
        .then(emoji => message.reply(`Emoji 'Approved' created. Add the ID __${emoji.id}__ in **emojiApprove** field in config.json`));

        await guild.createEmoji('PUT_EMOJI_LINK_HERE', 'denied')
        .then(emoji => message.reply(`Emoji 'Recusado' criado com sucesso. Add the ID __${emoji.id}__ in **emojiDenied** field in config.json`));

        // Create channel that will be used by Webhook
        await guild.createChannel('whitelist-pending', { type: 'text' })
        .then(channel => {
            channel.createWebhook(`${guild.name} - WHITELIST`, guild.iconURL)
            .then(webhook => message.reply(`WebHook created! ID: __${webhook.id}__ Token: ${webhook.token}`))
        })

         // Create whitelist result channels
        await guild.createChannel('whitelist-result', { type: 'text' })
        .then(channel => message.reply(`Channel #${channel.name} created. Add the ID __${channel.id}__ in **whitelistResultChannel** field in config.json`))
    }
}

module.exports = SetupCommand;