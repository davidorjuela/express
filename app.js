const express = require('express');
const app = express();
app.use(express.urlencoded());

app.get('/', (req, res) => {

    res.send(req.headers["user-agent"]);
});
app.listen(3000, () => console.log('Listening on port 3000!'));
