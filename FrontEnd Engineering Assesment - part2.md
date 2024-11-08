## Part 2: Practical Implementation (30 minutes)

Choose your preferred framework/approach:
- React with TypeScript
- Vue.js with TypeScript
- Vanilla TypeScript

### Task: Pokemon Directory with Dynamic Loading

Create a component that displays Pokemon from the PokeAPI with either infinite scroll or pagination (your choice). Additionally, implement a feature to view basic Pokemon details.

### API Endpoints:
- List: `https://pokeapi.co/api/v2/pokemon?limit=5`
- Details: `https://pokeapi.co/api/v2/pokemon/{id or name}`

```typescript
interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

interface PokemonBasicDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
}
```

### Requirements:

1. Create a Pokemon list that:
   - Loads 5 Pokemon at a time
   - Implements either infinite scroll OR pagination
   - Shows loading states
   - Handles errors gracefully

2. When clicking a Pokemon:
   - Load and display its image and types
   - Show loading state while fetching
   - Handle errors appropriately

3. Implement clean state management for:
   - Pokemon list
   - Currently selected Pokemon
   - Loading states
   - Error states

### Sample Implementation Structure (adapt to your chosen framework):

```typescript
// Types
interface PokemonListProps {
  itemsPerPage?: number;
}

// Component Example (adapt based on your chosen framework)
const PokemonDirectory = ({ itemsPerPage = 5 }: PokemonListProps) => {
  // TODO: Implement state management for pokemon list and selected pokemon
  // TODO: Implement loading mechanism (infinite scroll or pagination)
  // TODO: Implement pokemon selection and detail fetching
  // TODO: Implement loading & error states
  
  return (
    <div>
      {/* List view */}
      <div className="pokemon-list">
        {/* Implement your list here */}
      </div>

      {/* Selected Pokemon view */}
      <div className="pokemon-details">
        {/* Implement your detail view here */}
      </div>
    </div>
  );
};
```

### Evaluation Criteria:

1. Code Quality (40%):
   - TypeScript usage
   - Error handling
   - State management approach
   - Code organization

2. Functionality (40%):
   - Working data loading
   - Proper loading states
   - Error handling
   - Pokemon detail display

3. UX Considerations (20%):
   - Smooth loading experience
   - Clear loading indicators
   - Error messages
   - Responsive design

### Bonus Points (if time permits):
- Add a search by Pokemon name
- Implement both infinite scroll AND pagination
- Add a "favorite Pokemon" feature using local storage
- Add basic animations for loading/transitions

Note: Prioritize completing the core requirements before attempting bonus features. We're looking for clean, working code rather than partially implemented features.

### Tips:
- Use the `limit` and `offset` query parameters for pagination
- Consider debouncing scroll events if implementing infinite scroll
- Use TypeScript effectively to handle API response types
- Focus on error handling for both network and edge cases