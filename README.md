# P-CEP-Polls
Discord bot made for the P-CEP discord server

## Setting up this repository:
Clone the repository and place it in a directory
Make sure to have `node v16.x` installed (check with `node -v`). If not, discord will not work.
Make sure you have all dependencies by checking `package.json` or running `npm i`

### Dependencies Required:
- discord.js
- moment
- node-cron
- rss-parser

To install all dependencies, run the following command: 
`npm i discord.js moment node-cron rss-parser`

### Configuration
Rename `config.json.example` to `config.json` locally and replace the corresponding fields with the bot token (to run bot), and the main guild ID (to create slash commands).
Make sure you have all the required `.json` files under `json/` with the correct name (ommit `.example`).

## Setting up for PI/Raspbian
Use NVM to install: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`.
Then run `nvm install node`. Follow the steps above to finish setup.

## Running
Running is very straightforward with `node .`. Stop the bot at any time with CTRL+C


