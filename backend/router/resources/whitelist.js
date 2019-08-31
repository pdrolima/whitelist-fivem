const Promise = require('bluebird')
const axios = require('axios')
const connection = require('../../database/')
const logger = require('../../logger')
const handleError = require('../../errors')
const config = require('../../config.json')
const Discord = require('discord.js')
const _ = require('lodash')

const { fields } = require('../../../roleplay.fields')

const dynamicFieldsEmbed = (embed, body) => _.map(fields, (field) => embed.addField(field.label, body[field.model]))

const whitelist = (req, res) => {
    const {
        name,
        age,
        queueId,
        discord,
        characterFirstName,
        characterLastName,
        characterAge,
        characterJob,
        characterAbout,
    } = req.body

    const exists = "SELECT COUNT(*) as qty FROM `vrp_whitelist` WHERE `discord` = ?";
    connection.query(exists, [discord.username], (err, rows) => {
        if (err) {
            logger.log('error', `${err.name} | ${err.message} | ${err.stack}`)
            return handleError(err)               
        }

        if (rows[0].qty >= 1) {
            return res.status(400).send({ type: 'danger', message: `Já existe uma solicitação pendente de ${discord.username}` });
        }

        const sql = "INSERT INTO `vrp_whitelist` SET discord = ?";
        connection.query(sql, [discord.username], (err) => {
            if (err) {
                logger.log('error', `${err.name} | ${err.message} | ${err.stack}`)
                return handleError(err)         
            }

            Promise.resolve(req.body)
            .then(async () => {
                const embed = new Discord.RichEmbed()
                .setTitle(`Liberação whitelist de ${characterFirstName} ${characterLastName}`)
                .setFooter(`${name} – ${age} anos`)
                .setAuthor(discord.username, `https://cdn.discordapp.com/avatars/${discord.id}/${discord.avatar}.png`)
                .addField("ID", queueId)
                .addField("Nome", `${characterFirstName} ${characterLastName}`, true)
                .addField("Idade", characterAge, true)
                .addField("Trabalho", characterJob, true)
                .addField("Historia do personagem", characterAbout)
                dynamicFieldsEmbed(embed, req.body)

                await axios.post(`https://discordapp.com/api/webhooks/${config.webhook.id}/${config.webhook.token}`, { embeds: [ embed ]})
            })
            .then(() => res.status(200).send({ 'type': 'success', 'message': 'Formulário foi enviado com sucesso! Aguarde o resultado em nosso Discord.' }))
            .catch(err => {
                connection.query('DELETE FROM `vrp_whitelist` WHERE `discord` = ?', [discord.username], (err) => {
                    if (err) {
                        logger.log('error', `${err.name} | ${err.message} | ${err.stack}`)
                        return handleError(err)                     
                    }
                });
                logger.log('error', `${err.name} | ${err.message} | ${err.stack}`)
                return handleError(err)
            })
            .tap(({ statusCode, body }) => res.status(statusCode).send(body))
        });
    });
}

module.exports = whitelist