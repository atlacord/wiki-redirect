import express from 'express';
import pages from './Routes.js';
import * as dotenv from 'dotenv';

const app = express()
dotenv.config();

const port = process.env.PORT;

app.get('/', (req, res) => {
  console.log(req)
  res.send('Hello World!')
})

pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        res.redirect(`https://avatar-the-last-airbender-discord.fandom.com/wiki/${page}`);
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})