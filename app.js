const express = require('express');
var mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });

mongoose.connection.on("error", function(e) { console.error(e); });

// definimos el schema
var schema = mongoose.Schema({
    date: Date,
    name: String,
  });
 
  var Visitor = mongoose.model("Visitor", schema);

app.get('/', (req, res) => {
    var name='Anónimo'
    req.query.name ? name=req.query.name : name=name;
    var visitor = new Visitor({ name: name, date: new Date() });
        visitor.save(function(err) {
        if (err) return console.error(err);
    });

    res.send(`<h1>El visitante fue almacenado con éxito</h1>`);
});
app.listen(3000, () => console.log('Listening on port 3000!'));
