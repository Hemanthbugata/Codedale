const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// OpenWeatherMap API details
const API_KEY = '122afbd56baaf7f88944725be8603d3f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Middleware
app.use(cors());
app.use(express.static('public'));

// Route to fetch weather data
app.get('/weather', async (req, res) => {
    const city = req.query.city; // Read city from query parameters

    if (!city) {
        return res.status(400).json({ error: "Please provide a city name" });
    }

    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        res.json({
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
        });
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch weather data. Please check the city name and try again." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
