const express = require ('express');
const app = express ();
const cors=require('cors');
app.use(cors());


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));



const userRoute = require('./Routes/addTask');

app.use('/inputTask', userRoute );



app.listen(9000,()=>{
    console.log('Server is listening on Port 9000');
});
