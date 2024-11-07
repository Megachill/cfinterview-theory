## Part 2: Practical Implementation (30 minutes)

Choose your preferred framework/approach:
- React with TypeScript
- Vue.js with TypeScript
- Vanilla TypeScript

### Task: Implement an Infinite Scroll Post List

Create a component that loads and displays posts with infinite scroll functionality.

```typescript
interface Post {
  id: number;
  title: string;
  excerpt: string;
  timestamp: number;
}

interface ApiResponse {
  posts: Post[];
  hasMore: boolean;
  nextCursor?: string;
}
```

### Requirements:

1. Implement a posts list that:
   - Loads initial batch of posts
   - Supports infinite scroll
   - Shows loading states
   - Handles errors gracefully

2. Include basic error handling and loading states

3. Implement efficient scroll detection and loading

### API Mock:
```typescript
// You can use this mock API function in your implementation
const fetchPosts = async (cursor?: string): Promise => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock response
  return {
    posts: [
      {
        id: 1,
        title: "First Post",
        excerpt: "This is the first post content",
        timestamp: Date.now()
      },
      // ... more posts
    ],
    hasMore: true,
    nextCursor: "next_page_token"
  };
};
```

### Sample Implementation Structure (adapt to your chosen framework):

```typescript
// React example (adapt as needed for Vue or vanilla TS)
interface PostListProps {
  pageSize?: number;
}

const PostList = ({ pageSize = 10 }: PostListProps) => {
  // TODO: Implement state management for posts
  // TODO: Implement infinite scroll detection
  // TODO: Implement post fetching logic
  // TODO: Implement loading & error states
  
  return (
    // TODO: Implement your UI
  );
};
```

### Evaluation Criteria:
1. Code Quality:
   - TypeScript usage
   - Error handling
   - Performance considerations
   - Framework best practices

2. Implementation:
   - Scroll detection efficiency
   - Loading state handling
   - Error state handling
   - Code organization

### Bonus Points (if time permits):
- Implement post filtering
- Add smooth loading animations
- Implement virtual scrolling for performance
- Add unit tests

Note: Focus on getting the core functionality working first. Bonus features should only be attempted if you complete the main requirements ahead of time.