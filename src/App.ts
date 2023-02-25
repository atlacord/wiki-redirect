import express from 'express';
import pages from './Routes.js';
import { Client } from 'eris';
import * as dotenv from 'dotenv';
import axios from 'axios';
import { readFile, writeFileSync } from 'fs';

const app = express()
dotenv.config();
const discord = new Client(`Bot ${process.env.DISCORD_TOKEN}`, { restMode: true, intents: [] });

const port = process.env.PORT;
// const hostname = os.hostname;

app.get('/', (req, res) => {
  res.redirect('https://wiki.atla.sh/Home')
})

app.get('/discord', (req, res) => {
  res.redirect('https://discord.gg/QBKxgsfG7r')
})

// app.get('/pages', async (req, res) => {
//   let data;
//  let pageList = JSON.stringify(pages);
//  writeFileSync('./build/pages.json', pageList);
//  readFile('./build/pages.json', 'utf8', function (err, data) {
//    if (err) throw err;
//  data = JSON.parse(data);
//  res.send(data);
//  })
// })

app.get('/avatar', async (req, res) => {
  return res.send(discord.user.id);
  // return res.send('test');
})

app.get('/avatar/:userID', async (req, res) => {
  let member = await discord.getRESTGuildMember('370708369951948800', req.params.userID);
  res.redirect(`https://cdn.discordapp.com/avatars/${req.params.userID}/${member.avatar || member.user.avatar}?format=png&size=4096`);
})

pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        res.redirect(`https://wiki.atla.sh/${page}`);
    })
})

app.listen(port, () => {
  discord.connect();
  discord.editStatus('invisible');
  console.log(`Connected to Discord`);
  console.log(`Wiki redirect up and running! ${port}`)
})
