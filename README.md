## GTA V FiveM - Whitelist & Discord Integration

### About this project

It's a web form (made with Vue.js) that allows players to submit their data and the character data. The Whitelist,
is sent to Discord through a webhook with information that the player provided. Once received in a private channel (staff access only) you can decided you accept or deny the application.

It was a private project, but I decide to open-source since I got a job and that's it. However,
**I will not maintain this project**, which means I'll not provide support, accept pull requests or deal with issues. Fork. Download it. Do you whatever you want.

#### Overall details...

- Web form is a Vue app.
- Everything in **backend/** belongs to the Discord's Bot and an simple API (Node and Express)
to handle it the form and, of course, send the webhook to your server.

#### Lazy instructions

> I open an exception if you want to write a better guide...Just send a PR.

1. Install Node 
2. Install pm2 (globally)
3. Download the packages using (npm install or yarn)
4. Compile the front-end (form) using "yarn run dev" or "yarn run prod"
5. Jump to the back-end and start using `pm2 start ecosystem.config.js`

Ah, of course! Before run the server, please...

1. Rename the config-sample.json (to config.json)
2. Add your database credentials and fill Discord's related to config, which is:
    1. Client ID
    2. Client Secret
    3. Bot Token
    
Yeah, the step 2 requires you to create a Discord Application with a Bot, and invite the bot to your server. Once you've done that
you could run a special command: `-setup` that will setup almost everything for you.

**Note:** Please look inside `/backend/commands/SetupCommand.js` and replace "PUT_EMOJI_LINK_HERE" to an
image that you be referrer to your approved / denied emoji.

SQL:
- Create a new table with:
    1. id (default)
    2. discord (varchar)

### What can be improved
- Error handling
- Folder organization
- Object props handling and general (Tip: https://github.com/ramda/ramda)




