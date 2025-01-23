const Router = require('express');
const router = Router();
const allFAQs = require('../data/faq.js');


router.get('/api/v1/faq', (request,response,next) => {
    response.status(200).send(allFAQs);    
});

router.post('/api/v1/admin/faq', (request , response,next) => {
    const {body} = request;   
    console.log(body);
    const newID = allFAQs.length > 0 ? allFAQs[allFAQs.length - 1].id + 1 : 1;

    console.log(newID);
    const newFAQ = {id: newID, ...body}; 
    allFAQs.push(newFAQ);
    console.log('New FAQ added ');
    response.status(201).send(newFAQ);
});


router.delete('/api/v1/admin/faq/:ID', (request , response,next) => {
    try {
    const {body,
        params: { ID }
    } = request;
    const myID = parseInt(ID);
    if(isNaN(myID)) 
        { 
           const error = new Error('Invalid FAQ ID');
           error.status = 400;
           throw error;
       }
       console.log(myID);
    const findFAQIndex = allFAQs.findIndex(Q => Q.id === myID);
    if(findFAQIndex === -1) 
        {
            const error = new Error('FAQ not found');
            error.status = 404;
            throw error;        
        }
    console.log(findFAQIndex);
    allFAQs.splice(findFAQIndex, 1); 
    console.log('Delete FAQ ');
    response.status(200).send(allFAQs);
}
    catch (error) {
        next(error);
    }
});



module.exports = router;