import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [pokemon, setPokemon] = useState([]);
    const newPokemon = "Pikachu";

    const addPokemon = () => {
        setPokemon((prevPokemon) => [...prevPokemon, newPokemon]);
    };

    useEffect(() => {
        // Fetch the first 10 Pokemon from the PokeAPI
        const fetchPokemon = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
                const data = await response.json();
                const pokemonNames = data.results.map((pokemon) => pokemon.name);
                setPokemon(pokemonNames);
            } catch (error) {
                console.error('Error fetching Pokemon:', error);
            }
        };

        fetchPokemon();
    }, []); // Empty dependency array ensures the effect runs only once on component mount

    return (
        <>
            <button onClick={addPokemon}>Add {newPokemon}</button>
            <ul>
                {pokemon.map((pokemonName, index) => (
                    <li key={index}>{pokemonName}</li>
                ))}
            </ul>
        </>
    );
}

export default App;
