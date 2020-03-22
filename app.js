const express = require('express');
const app = express();

app.get('/', (req, res) => {
  var miHtml='';
  for(var i=1; i<=50; i++){
   if(i%2){
        miHtml+=`<p>${i} Soy Impar!</p>`;
   }
   else{
        miHtml+=`<p>${i} Soy Par!</p>`; 
   }
  }
  res.send(miHtml);
});

app.listen(3000, () => console.log('Listening on port 3000!'));