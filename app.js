const express = require('express')
const app = express();
app.use(express.static('public'))
app.listen(5555, () => {
    console.log(`Your app is running!`)
})
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

