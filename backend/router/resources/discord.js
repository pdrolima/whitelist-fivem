const Promise = require('bluebird')
const qs = require('querystring')
const config = require('../../config.json')
const axios = require('axios')
const logger = require('../../logger')
const handleError = require('../../errors')

const discordCallback = (req, res) => {
    const handler = async () => {      
        
        if (!req.query.code) throw new Error(`Access Token Unavailable.`)
        
        let OAuthBody = qs.stringify({
            'client_id': config.client_id,
            'client_secret': config.client_secret,
            'grant_type': "authorization_code",
            'scope': "identify%20email%20guilds.join",
            'redirect_uri': config.redirect_uri,
            'code': req.query.code
        })
        let { data } = await axios.post('https://discordapp.com/api/oauth2/token', OAuthBody, { headers: { "Content-Type": "application/x-www-form-urlencoded" } } )
        let { data: { id: userId } } = await axios.get('https://discordapp.com/api/users/@me', { headers: {  Authorization: `Bearer ${data.access_token}` } })
        await axios.put(`https://discordapp.com/api/v6/guilds/${config.guildId}/members/${userId}`, { access_token: data.access_token }, { headers: { "Authorization": `Bot ${config.bot_token}` } })

       return res.redirect(`${config.app_uri}?token=${data.access_token}`)
    }

    return Promise.resolve(req.body)
    .then(handler)
    .catch((err) => {   
        logger.log('error', `${err.name} | ${err.message} | ${err.stack}`)
        return res.status(400).send('An error occurred.')
    })
}

module.exports = discordCallback;