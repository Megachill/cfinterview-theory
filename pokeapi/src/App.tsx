import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { PokemonListResponse, BasicPokemon, PokemonDetails } from './types';

function App() {
  const [pokemon, setPokemon] = useState<BasicPokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;

  const observerRef = useRef<IntersectionObserver>();
  const lastPokemonRef = useRef<HTMLDivElement>(null);

  const fetchPokemon = async () => {
    if (!hasMore) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      if (!response.ok) throw new Error('Failed to fetch Pokemon');
      
      const data: PokemonListResponse = await response.json();
      setPokemon(prev => [...prev, ...data.results]);
      setHasMore(!!data.next);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonDetails = async (name: string) => {
    try {
      setDetailsLoading(true);
      setError(null);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!response.ok) throw new Error('Failed to fetch Pokemon details');
      
      const data: PokemonDetails = await response.json();
      setSelectedPokemon(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setSelectedPokemon(null);
    } finally {
      setDetailsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [offset]);

  // Setup intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setOffset(prev => prev + limit);
        }
      },
      { threshold: 1.0 }
    );

    if (lastPokemonRef.current) {
      observer.observe(lastPokemonRef.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore]);

  // Extract Pokemon ID from URL
  const getPokemonId = (url: string): string => {
    const matches = url.match(/\/pokemon\/(\d+)\//);
    return matches ? matches[1] : '';
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pokemon Directory</h1>
      
      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Pokemon Details */}
        <div className="sticky top-4">
          {detailsLoading ? (
            <div className="text-center p-4">Loading Pokemon details...</div>
          ) : selectedPokemon ? (
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-bold capitalize mb-4">
                {selectedPokemon.name}
              </h2>
              
              {selectedPokemon.sprites && (
                <img
                  src={selectedPokemon.sprites.other?.['official-artwork']?.front_default || 
                       selectedPokemon.sprites.front_default}
                  alt={selectedPokemon.name}
                  className="mx-auto w-48 h-48 object-contain"
                />
              )}
              
              <div className="mt-4">
                <div className="flex gap-2 justify-center">
                  {selectedPokemon.types.map(({ type }, index) => (
                    <span
                      key={`type-${selectedPokemon.id}-${index}`}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {type.name}
                    </span>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <p>Height: {selectedPokemon.height / 10}m</p>
                  <p>Weight: {selectedPokemon.weight / 10}kg</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 p-4">
              Select a Pokemon to view details
            </div>
          )}
        </div>


        {/* Pokemon List */}
        <div className="space-y-4">
          {pokemon.map((p, index) => {
            const isLastElement = index === pokemon.length - 1;
            return (
              <div
                key={`pokemon-${getPokemonId(p.url)}-${index}`}
                ref={isLastElement ? lastPokemonRef : null}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => fetchPokemonDetails(p.name)}
              >
                <h3 className="capitalize text-lg">{p.name}</h3>
              </div>
            );
          })}
          {loading && <div className="text-center p-4">Loading more Pokemon...</div>}
        </div>

        
      </div>
    </div>
  );
}

export default App;
