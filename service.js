const express = require('express');
const app = express();
PORT = 3333;
const companiesRouter = require('./routes/companies.js');
const faqRouter = require('./routes/faq.js');
const usersRouter = require('./routes/users.js');
const errorHandler = require('./middleware/errorhandler.js');
const requestLogger = require('./middleware/logging.js');
const validateUser = require('./middleware/vaidation.js');

app.use(express.json());
app.use(requestLogger);
app.use(validateUser);
app.use(companiesRouter);
app.use(faqRouter);
app.use(usersRouter);
app.use(errorHandler);

app.get('/api/v1',(request,response)=>{
    response.status(200).send('Business List Called!');
});


app.listen(PORT,() =>{
    console.log(`Server is listening on port ${PORT}`);
});