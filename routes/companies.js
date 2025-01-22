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
    const company = allCompanies.filter(company => company.id == request.params.companyID)
    response.status(200).send(company);     
});

router.put('/api/v1/admin/companies/:companyID', (request , response) => {
    //const company = allCompanies.delete(company => company.id == request.params.companyID)
    // response.send('Deleted company ' + company.id + '-' + company.name );     
    console.log('Update company ');
    response.status(200).send('');
});

router.delete('/api/v1/admin/companies/:companyID', (request , response) => {
    //const company = allCompanies.delete(company => company.id == request.params.companyID)
    // response.send('Deleted company ' + company.id + '-' + company.name );     
    console.log('Delete company ');
    response.status(200).send('');
});

module.exports = router;