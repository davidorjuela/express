const express = require('express');
var mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });

mongoose.connection.on("error", function(e) { console.error(e); });

// definimos el schema
var schema = mongoose.Schema({
    count: Number,
    name: String,
  });
 
var Visitor = mongoose.model("Visitor", schema);
var visitantes;
app.get('/', (req, res) => {


    if(req.query.name){
        Visitor.findOne({'name':req.query.name}, function(err, visitorUpdate) {
            if(visitorUpdate){
                visitorUpdate.count += 1;
                visitorUpdate.save(function(err) {
                    if (err) return console.error(err);
                });
            }else{
                var visitor = new Visitor({ name: req.query.name, count:1 });
                visitor.save(function(err) {
                    if (err) return console.error(err);
                  });
            }
        });
    }
    else{
        var visitor = new Visitor({ name: 'Anónimo', count:1 });
        visitor.save();
    }
    
    

    Visitor.find({},function(err,visitors){
        var html=`<table style="width:100%">
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Visits</th>
    </tr>`;
    
    visitors.forEach(visitor => {
        html+=`
        <tr>
            <td>${visitor._id}</td>
            <td>${visitor.name}</td>
            <td>${visitor.count}</td>
        </tr>`;
    });

    html+=`</table>`;
    res.send(html);
    });
    
});
app.listen(3000, () => console.log('Listening on port 3000!'));