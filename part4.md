# Part 4: Bonus Firebase Technical Questions

## Question 1: Efficient Pagination Query for Potential Users

The challenge with the given approach using multiple `orderBy` clauses is that Firestore sorts hierarchically, which doesn't truly reflect the combined importance of all factors. Here's a better solution:

### Solution: Potential Score

1. Create a computed field called `potentialScore` that combines all three factors with appropriate weights:

```typescript
potentialScore =
  totalAverageWeightRatings * 1000000 +
  numberOfRents * 1000 +
  Math.floor(recentlyActive / 86400);
```

This formula:

- Multiplies `totalAverageWeightRatings` by 1,000,000 to give it the highest priority
- Multiplies `numberOfRents` by 1,000 to give it second priority
- Converts `recentlyActive` timestamp to days and uses it as the least significant factor

We can update the weights to prioritize different factors.

Example calculation:

```typescript
User A: (4.3 * 1000000) + (30 * 1000) + (1738938812/86400000)
= 4300000 + 30000 + 20127 = 4350127

User B: (4.3 * 1000000) + (30 * 1000) + (1738679612/86400000)
= 4300000 + 30000 + 20124 = 4350124

User C: (4.3 * 1000000) + (28 * 1000) + (1738679612/86400000)
= 4300000 + 28000 + 20124 = 4348124
```

### Implementation

### 1. Update the user document structure:

```typescript
interface User {
  totalAverageWeightRatings: number;
  numberOfRents: number;
  recentlyActive: number;
  potentialScore: number;
}
```

### 2. Update the potential score whenever any of the factors change.

There are several ways to re-calculate the potential score whenever any of the factors change.

1. Update the score on the backend whenever any of the factors change.

2. Create a Cloud Function to update `potentialScore` whenever any of the factors change:

### 3. Query with pagination:

```typescript
const pageSize = 10;
const lastDoc = // last document from previous query

const query = db.collection('USERS')
  .orderBy('potentialScore', 'desc')
  .limit(pageSize);

// For subsequent pages
if (lastDoc) {
  query = query.startAfter(lastDoc);
}
```

This approach:

- Provides accurate ranking considering all factors
- Supports efficient pagination
- Maintains good performance
- Allows for easy modification of weights if priorities change

## Question 2: Keeping 'recentlyActive' Updated

### Solution: Multi-layered Update Strategy

1. **Client-Side Updates**:

```typescript
// Update on significant user actions
async function updateUserActivity(userId: string) {
  const now = Date.now();

  // Only update if more than 5 minutes have passed since last update
  const userRef = db.collection("USERS").doc(userId);
  const user = await userRef.get();
  const lastActive = user.data()?.recentlyActive || 0;

  if (now - lastActive > 300000) {
    // 5 minutes in milliseconds
    await userRef.update({
      recentlyActive: now,
    });
  }
}
```

2. **Server-Side Updates**:

```typescript
// Middleware for API endpoints
export const trackActivity = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.uid;
  if (userId) {
    // Fire and forget update
    updateUserActivity(userId).catch(console.error);
  }
  next();
};
```

3. **Batch Updates for Offline Time**:

```typescript
// Cloud Function to update offline time
export const updateOfflineStatus = functions.firestore
  .document("USERS/{userId}/status/online")
  .onUpdate(async (change, context) => {
    const isOffline = !change.after.data()?.online;
    if (isOffline) {
      await db.collection("USERS").doc(context.params.userId).update({
        recentlyActive: Date.now(),
      });
    }
  });
```

### Reasoning:

1. **Throttled Updates**:

   - Only update after significant time gaps (5 minutes)
   - Prevents excessive writes to Firestore
   - Still maintains reasonable accuracy

2. **Strategic Update Points**:

   - User actions (client-side)
   - API calls (server-side)
   - Connection status changes (Firebase presence)

3. **Performance Considerations**:

   - Fire-and-forget updates don't block the main flow
   - Batch updates reduce write operations
   - Server-side updates ensure reliability

4. **Cost Efficiency**:
   - Throttling reduces Firestore write operations
   - Batching multiple updates
   - Using server timestamp for consistency
