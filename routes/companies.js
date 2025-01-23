const Router = require('express');
const router = Router();
const allCompanies = require('../data/companies');


router.get('/api/v1/companies', (request,response) => {
    response.status(200).send(allCompanies);    
});

router.get('/api/v1/admin/companies', (request,response) => {
    response.status(200).send(allCompanies);    
});

router.get('/api/v1/admin/companies/:companyID', (request,response) => {
    const {body,
        params: { companyID }
    } = request;
    const myID = parseInt(companyID);
    if(isNaN(myID)) return response.sendStatus(400);
    const findCompanyIndex = allCompanies.find(company => company.id === myID);
    if(findCompanyIndex === -1) return response.sendStatus(404); 

    const company = allCompanies.filter(company => company.id == request.params.companyID)
    response.status(200).send(company);     
});

router.put('/api/v1/admin/companies/:companyID', (request , response) => {
    const {body,
        params: { companyID }
    } = request;
    const myID = parseInt(companyID);
    if(isNaN(myID)) return response.sendStatus(400);
   console.log(myID);
    const findCompanyIndex = allCompanies.findIndex(company => company.id === myID);
    if(findCompanyIndex === -1) return response.sendStatus(404); 
    console.log(findCompanyIndex);
    allCompanies.splice(findCompanyIndex, 1);
    
    console.log('Update company ');
    response.status(200).send('');
});

router.delete('/api/v1/admin/companies/:companyID', (request , response) => {
    const {body,
        params: { companyID }
    } = request;
    const myID = parseInt(companyID);
    if(isNaN(myID)) return response.sendStatus(400);
   console.log(myID);
    const findCompanyIndex = allCompanies.findIndex(company => company.id === myID);
    if(findCompanyIndex === -1) return response.sendStatus(404); 
    console.log(findCompanyIndex);
    allCompanies.splice(findCompanyIndex, 1); 
    console.log('Delete company ');
    response.status(200).send(allCompanies);
});

module.exports = router;