const Router = require('express');
const router = Router();
const allCompanies = require('../data/companies');

router.get('/api/v1/companies', (request,response) => {
    response.status(200).send(allCompanies);    
});



router.get('/api/v1/admin/companies', (request,response) => {
    response.status(200).send(allCompanies);    
});


router.get('/api/v1/companies/filter', (req, res) => {
    console.log('filter request');
    const filters = req.query; 

    console.log('Filters:', filters);

    
    const filteredCompanies = allCompanies.filter(company => {
        return Object.keys(filters).every(key => {
            
            if (typeof company[key] === 'boolean') {
                return company[key] === (filters[key] === 'true'); 
            }
            if (typeof company[key] === 'number') {
                return company[key] === parseInt(filters[key]);
            }
            return company[key]?.toString().toLowerCase().includes(filters[key]?.toLowerCase());
        });
    });

    if (filteredCompanies.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'No data found.',
        });
    }

    res.status(200).json(filteredCompanies);
});
router.get('/api/v1/companies/:companyID', (request,response,next) => {
    try {
    const {body,
        params: { companyID }
    } = request;
    const myID = parseInt(companyID);
    if(isNaN(myID)) 
         { 
            const error = new Error('Invalid company ID');
            error.status = 400;
            throw error;
        }
    //return response.sendStatus(400);
    const findCompanyIndex = allCompanies.find(company => company.id === myID);
    if(findCompanyIndex === -1) 
    {
        const error = new Error('Company not found');
        error.status = 404;
        throw error;        
    }
        //return response.sendStatus(404); 

    const company = allCompanies.filter(company => company.id == request.params.companyID)
    response.status(200).send(company); 
    } catch (error) {
        next(error);
    }    
});


router.get('/api/v1/admin/companies/:companyID', (request,response, next) => {
    try{
    const {body,
        params: { companyID }
    } = request;
    const myID = parseInt(companyID);
    if(isNaN(myID)) 
        { 
           const error = new Error('Invalid company ID');
           error.status = 400;
           throw error;
       } 
    const findCompanyIndex = allCompanies.find(company => company.id === myID);
    if(findCompanyIndex === -1) 
        {
            const error = new Error('Company not found');
            error.status = 404;
            throw error;        
        }
    const company = allCompanies.filter(company => company.id == request.params.companyID)
    response.status(200).send(company);     
}
catch(error){
    next(error);
}
});

router.post('/api/v1/admin/companies', (request , response) => {
    const {body} = request;   
    console.log(body);
    const newID = allCompanies.length > 0 ? allCompanies[allCompanies.length - 1].id + 1 : 1;

    console.log(newID);
    const newCompany = {id: newID, ...body}; 
    allCompanies.push(newCompany);
    console.log('New company added ');
    response.status(201).send(newCompany);
});

router.put('/api/v1/admin/companies/:companyID', (request , response, next) => {
    try {
    const {body,
        params: { companyID }
    } = request;

    const myID = parseInt(companyID);
    if(isNaN(myID)) 
        { 
           const error = new Error('Invalid company ID');
           error.status = 400;
           throw error;
       }
       console.log(myID);
    
    const findCompanyIndex = allCompanies.findIndex(company => company.id === myID);
    if(findCompanyIndex === -1) 
        {
            const error = new Error('Company not found');
            error.status = 404;
            throw error;        
        }
    console.log(findCompanyIndex);
    
    allCompanies[findCompanyIndex] = {id: myID, ...body};
    
    console.log('Update company ');
    response.status(200).send(allCompanies);
    }
    catch (error) {
        next(error);
    }
});

router.delete('/api/v1/admin/companies/:companyID', (request , response,next) => {
    try {
    const {body,
        params: { companyID }
    } = request;
    const myID = parseInt(companyID);
    if(isNaN(myID)) 
        { 
           const error = new Error('Invalid company ID');
           error.status = 400;
           throw error;
       }
       console.log(myID);
    const findCompanyIndex = allCompanies.findIndex(company => company.id === myID);
    if(findCompanyIndex === -1) 
        {
            const error = new Error('Company not found');
            error.status = 404;
            throw error;        
        }
    console.log(findCompanyIndex);
    allCompanies.splice(findCompanyIndex, 1); 
    console.log('Delete company ');
    response.status(200).send(allCompanies);
}
    catch (error) {
        next(error);
    }
});

module.exports = router;