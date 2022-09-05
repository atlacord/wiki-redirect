import express from 'express';
import pages from './Routes.js';
import * as dotenv from 'dotenv';
import { readFile, writeFileSync } from 'fs';

const app = express()
dotenv.config();

const port = process.env.PORT;
// const hostname = os.hostname;

app.get('/', (req, res) => {
  res.redirect('https://avatar-the-last-airbender-discord.fandom.com')
})

app.get('/discord', (req, res) => {
  res.redirect('https://discord.gg/QBKxgsfG7r')
})

app.get('/pages', async (req, res) => {
  let data;
  let pageList = JSON.stringify(pages);
  writeFileSync('./build/pages.json', pageList);
  readFile('./build/pages.json', 'utf8', function (err, data) {
    if (err) throw err;
  data = JSON.parse(data);
  res.send(data);
  })
})

pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        res.redirect(`https://avatar-the-last-airbender-discord.fandom.com/wiki/${page}`);
    })
})

app.listen(port, () => {
  console.log(`Wiki redirect up and running! ${port}`)
})