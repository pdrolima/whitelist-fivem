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

### Setting up (Discord)

1. You need to create a Discord Bot Application. Visit: https://discordapp.com/developers/applications/
2. Click in "New application"
    1. Save the CLIENT ID and CLIENT SECRET.
3. Then click in "Save changes"
4. Go to "Bot" tab
5. Then click in "Add bot" in the popup message that appears, click in "Yes, Do It!"
    1. Save the TOKEN.
6. Click in OAuth2
    1. In "Scopes" select "bot"
    2. In "Bot Permissions" ensure you selected "Administrator" permission.
    3. Click in "Copy" to copy the generated URL, open in your favorite browser and proceed to add the Bot to your server.
   
7. Once you've completed all those steps above. Open your `config.json` inside `backend` folder, and fill with your:
    1. Client ID
    2. Client Secret
    3. Bot Token
    4. And your database credentials (also run this query to create the table)

```sql
CREATE TABLE `whitelist`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `discord` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;
```

8. Enter in `backend` folder using your favorite terminal (e.g: cmd)
    1. And run: `pm2 start ecosystem.config.js`

If you follow all the steps correctly your bot will be online in the server that you put him on. You'll be able to run a command that simplify
the setup process for you (in this case, the rest of required values that you need to put in config.json). **But before that, please read below:**

> Please look inside `/backend/commands/SetupCommand.js` and replace "PUT_EMOJI_LINK_HERE" to an
image that you be referrer to your approved / denied emoji. It can be a imgur URI, for example. 


### Setting up (Front-End)

1. Install Node 
2. Install pm2 (globally)
    ``` npm i -g pm2 ```
3. Download the packages using (npm install or yarn)
    1. If you want to use yarn (I recommend, because, ironically, is much faster than npm itself.)
    ``` npm i -g yarn ```
4. Rename `.env.example` to `.env` it contains important values used when compiling the assets.
    1.  `VUE_APP_API_URI=` The pattern for this URL is simple: http://YOUR_DOMAIN_OR_IP:3000
    2. `VUE_APP_OAUTH2_URL=` is the Discord's OAUTH2 URL. In order to generate this URL, follow the steps above:
        - Open the Developer Portal again
        - Click in "OAuth2" 
        - Then, click in "Add Redirect". The pattern for this URL is simple: `http://YOUR_DOMAIN_OR_IP:3000/api/discord/callback`
        - In the "OAuth2 URL Generator" section, select the URL above and check the fields: `identify`, `email`, `guilds.join`
        - Click in Copy
        - Put the URL after the "=". Be careful, no spaces are allowed after the "=".
5. Compile the front-end.
    1. If you choose npm: `npm run build`
    2. If you choose yarn: `yarn run build`
6. The command above, will generate a `dist` folder. The content inside that folder, is the content you put in your Web Server (XAMPP, NGINX, etc..)

### What can be improved
- Error handling
- Folder organization
- Object props handling and general (Tip: https://github.com/ramda/ramda)
