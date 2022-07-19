import express from 'express';
import pages from './Routes.js';
import * as dotenv from 'dotenv';

const app = express()
dotenv.config();

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.redirect('https://avatar-the-last-airbender-discord.fandom.com')
})

pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        res.redirect(`https://avatar-the-last-airbender-discord.fandom.com/wiki/${page}`);
    })
})

app.listen(port, () => {
  console.log(`Wiki redirect up and running! Port: ${port}`)
})