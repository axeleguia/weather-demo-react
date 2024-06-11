import React, { useState } from "react";
import "./WeatherApp.css";

export const WeatherApp = () => {

    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false)
    const [weatherData, setWeatherData] = useState(null)

    const urlBase = `https://api.openweathermap.org/data/2.5/weather`;
    const API_KEY = '<YOUR-APIKEY-GOES-HERE>';

    const fetchWeatherData = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&units=metric&lang=es`)
            const data = await response.json()
            setWeatherData(data)
        } catch (error) {
            console.error('Ocurrió un error: ', error)
        }
        setLoading(false)
    }

    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchWeatherData()
    }

    return (
        <div className="container">
            <h1>Aplicación de Clima</h1>
            <form onSubmit={handleSubmit}>
                <fieldset role="group">
                    <input
                        type="text"
                        placeholder="Ingresa una ciudad"
                        value={city}
                        onChange={handleCityChange}
                        autoFocus
                    />
                    <button type="submit" aria-busy={loading}>Buscar</button>
                </fieldset>
            </form>
            {weatherData && (
                <article>
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <h3>{Math.floor(weatherData.main.temp)}°C</h3>
                    <p>Max: {weatherData.main.temp_max}°C Min: {weatherData.main.temp_min}°C</p>
                    <p>La condición meteorológica actual es: {weatherData.weather.map(w => w.description).join(' | ')}</p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather.map(w => w.description).join()}></img>
                </article>
            )}
        </div>
    );
};
