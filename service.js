const express = require('express');
const app = express();
PORT = 3333;

const allCompanies = require('./data/companies');


app.get('/api/v1',(request,response)=>{
    response.status(200).send('Root is here!');
});

app.get('/api/v1/companies', (request,response) => {
    response.status(200).send(allCompanies);    
});

app.get('/api/v1/companies/:companyID', (request,response) => {
    const company = allCompanies.filter(company => company.id == request.params.companyID)
    response.status(200).send(company);     
});




app.listen(PORT,() =>{
    console.log(`Server is listening on port ${PORT}`);
});