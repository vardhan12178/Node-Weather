const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors()); 


app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.json({ error: 'Please provide a city name' });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=30755a4a95cbde88af53afaafad1ea50&units=metric`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        res.json({ temp: data.main.temp });
    } catch (error) {
        if (error.response) {
            res.json({ error: `Error: ${error.response.status} - ${error.response.data.message}` });
        } else if (error.request) {
            res.json({ error: 'Error: No response received' });
        } else {
            res.json({ error: `Error: ${error.message}` });
        }
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
