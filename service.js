const express = require('express');
const app = express();
PORT = 3333;

// const allCompanies = require('./data/companies');

const companiesRouter = require('./routes/companies.js');


app.get('/api/v1',(request,response)=>{
    response.status(200).send('Business List Called!');
});

app.use(companiesRouter);


// app.use((err, request, response, next) => {
//     console.error(err.message); 
//     response.status(500).json({ error: err.message }); 
// });

app.listen(PORT,() =>{
    console.log(`Server is listening on port ${PORT}`);
});