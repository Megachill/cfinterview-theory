/**
 * {
    "count": 1302,
    "next": "https://pokeapi.co/api/v2/pokemon?offset=5&limit=5",
    "previous": null,
    "results": [
        {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon/1/"
        },
        {
            "name": "ivysaur",
            "url": "https://pokeapi.co/api/v2/pokemon/2/"
        },
        {
            "name": "venusaur",
            "url": "https://pokeapi.co/api/v2/pokemon/3/"
        },
        {
            "name": "charmander",
            "url": "https://pokeapi.co/api/v2/pokemon/4/"
        },
        {
            "name": "charmeleon",
            "url": "https://pokeapi.co/api/v2/pokemon/5/"
        }
    ]
}
 */


export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: BasicPokemon[];
}

export interface BasicPokemon {
    name: string;
    url: string;
}

export interface PokemonDetails {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        other: {
        'official-artwork': {
            front_default: string;
        }
    }
};
types: Array<{
    type: {
    name: string;
    }
}>;

height: number;
weight: number;
}
