const connection = require('./database');
const config = require('./config.json');
const { AkairoClient } = require('discord-akairo');
const logger = require('./logger');

const client = new AkairoClient({
    commandDirectory: './commands/',
    prefix: '-'
});

client.login(config.bot_token);
client.on('ready', () => {
    logger.log('info', `Bot ${client.user.tag} is up and running!`)
});

client.on('message', message => {
    if (message.author.id !== config.webhook.id) return;


    const guild = client.guilds.get(config.guildId);
    message.react(message.guild.emojis.get(config.emojiApproved)).then(() => message.react(message.guild.emojis.get(config.emojiDenied)));

    //  role allowed to react
    const filter = (reaction, user) => {
        return [config.emojiApproved, config.emojiDenied].includes(reaction.emoji.id) &&
            guild.members.get(user.id).roles.some(role => config.allowedRole === role.id)
    };

    message.awaitReactions(filter, { max: 1 })
        .then(collected => {
            const reaction = collected.first();
            const embeds = message.embeds[0];
            const member = guild.members.find(member => embeds.author.name === member.user.username);

            // Get staff user instance that reacted to the message.
            // Search for ramda's package and you can simplify this shit.
            const userReacted = {};
            reaction.users
                .filter(user => user.bot === false)
                .map((user) => {
                    return Object.assign(userReacted, user)
                })

            // Get fields that should be used and return as an object
            // Search for ramda's package and you can simplify this shit.
            let embedFields = {};
            message.embeds.map(message =>
                message.fields
                    .filter(field => ["ID", "Nome"].includes(field.name)) // Must match Discord's WebHook field label.
                    .map((field) => {
                        return Object.assign(embedFields, { [field.name]: field.value })
                    })
            )

            // If user is denied, then we`ll remove the request from DB 
            // so he can resend it.
            if (reaction.emoji.id === config.emojiDenied) {
                connection.query('DELETE FROM vrp_whitelist WHERE discord = ?', [member.user.username]);
                return sendFeedback(`Try again, <@${member.user.id}>! **${userReacted.username}** __denied__ your whitelist :frowning:.`)
            }

            if (member) {
                connection.query('UPDATE vrp_users SET whitelisted = ? WHERE id = ?', [1, embedFields.ID], (err, result) => {
                    if (err) {
                        logger.log('error', `${err.name} | ${err.message} | ${err.stack}`)
                        return
                    }

                    if (result.affectedRows === 0) {
                        client.users.find(user => user.id === userReacted.id)
                            .send(`[${member.user.username}] whitelist #${embedFields.ID} não encontrado no BD.`)
                            .catch((err) => {
                                if (err) {
                                    logger.log('error', `[${err.name}]: ${err.message}`);
                                }
                                logger.log('info', `User [${member.user.username}]: whitelist #${embedFields.ID} not found on database.`);
                            });
                        return
                    }

                    Promise.resolve(addRole(member))
                    .then(async () => {
                        await member.setNickname(`${embedFields.ID} | ${embedFields.Nome}`)
                        sendFeedback(`Enjoy! <@${member.user.id}>! **${userReacted.username}** __approved__ your whitelist. :smile:.`)
                    })
                    .catch(err => logger.log('error', `Can't change nickname for user ${member.user.username}. Reason: ${err}`))
                })
            } else {
                logger.log('warn', `Player ${embeds.author.name} is not on this server.`);
            }

        }).catch(error => {
            logger.log('error', `Reaction error: ${error}`);
        })
});

const sendFeedback = (message) => client.channels.find(channel => channel.id === config.whitelistResultChannel).send(message);
const addRole = async (member) => {
    try {
        await member.removeRole(member.guild.roles.find(role => role.id === config.guestRole))
        await member.addRole(member.guild.roles.find(role => role.id === config.playerRole))
    } catch (error) {
        logger.log('error', `Role error to user "${member.user.username}" | Reason: ${error}`)
    }
};