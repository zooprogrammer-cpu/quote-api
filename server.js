const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, ()=>{
    console.log(`Server is listening on PORT ${PORT}`);
})

// get random
app.get('/api/quotes/random', (req, res, next) =>{
    const randomQuote = getRandomElement(quotes);
    res.send({quote: randomQuote});
})

// get all quotes
// app.get('/api/quotes', (req, res, next) => {
//     res.send({quotes: quotes});
// })

// get all quotes from a person
app.get('/api/quotes', (req, res, next) => {
    if (req.query.person) {
        const quotePerson = req.query.person;

        const personQuotes = quotes.filter(quote => quote.person === quotePerson);

        if (personQuotes.length > 0) { // If there are some quotes, send the quotes
            res.send({ quotes: personQuotes });
        } else {
            // res.status(404).send({ error: 'No quotes found for this person' });
            res.send({quotes: null});
        }
        
    } else {  // if no query params, send all quotes
        res.send({ quotes: quotes });
    }
});
