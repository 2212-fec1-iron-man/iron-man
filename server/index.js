const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());



//new update
app.lesten(PORT, () => console.log(`listening on port ${PORT}`));