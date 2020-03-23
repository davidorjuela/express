const express = require('express');
var mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });

var schema = mongoose.Schema({
    count: Number,
    name: String,
  });
 
var Visitor = mongoose.model("Visitor", schema);

app.get('/', (req, res) => {

    if(req.query.name){
        Visitor.findOne({'name':req.query.name}, function(err, visitorUpdate) {
            if(visitorUpdate){
                visitorUpdate.count += 1;
                visitorUpdate.save();
            }else{
                var visitor = new Visitor({ name: req.query.name, count:1 });
                visitor.save();
            }
        });
    }
    else{
        var visitor = new Visitor({ name: 'Anónimo', count:1 });
        visitor.save({}, (err, visitor)=>{
            if(visitor){
                Visitor.find({},(err,visitors)=>{
                    res.send(visitors);
                });
            }
        });
    }
});

app.listen(3000, () => console.log('Listening on port 3000!'));