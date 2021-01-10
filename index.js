const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {User} = require('./models/User')

mongoose.connect('mongodb+srv://boiler-plate:qlfflwh94@boiler-plate.aiokh.mongodb.net/boiler-plate?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>console.log("mongDB connected.."))
    .catch(err=>console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!!!')
})

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.post('/register',(req,res)=> {
	const user = new User(req.body)

	user.save((err,userInfo)=>{
		if(err) return res.json({succss:false,err})
		return res.status(200).json({
			success:true
		});
	});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})