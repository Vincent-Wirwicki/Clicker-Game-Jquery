const express = require('express')
const PORT = process.env.PORT || 5000;
const app = express()
app.use(express.static('public'));
app.listen(PORT, () => console.log(`server running on ${PORT}`))