const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://boiler-plate:qlfflwh94@boiler-plate.aiokh.mongodb.net/boiler-p?retryWrites=true&w=majority+srv://boiler-plate:qlfflwh94@boiler-plate.aiokh.mongodb.net/boiler-plate?retryWrites=true&w=majorityd',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>console.log("mongDB connected.."))
    .catch(err=>console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})