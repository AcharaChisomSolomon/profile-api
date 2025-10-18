# Profile API

RESTful API endpoint that returns user profile with dynamic cat facts.

## Setup

1. Install dependencies: `npm install`
2. Create `.env` file with your details
3. Start server: `npm start`

## Endpoints

- `GET /me` - Profile with cat fact

## Example Response

```json
{
  "status": "success",
  "user": {
    "email": "john@example.com",
    "name": "John Doe",
    "stack": "Node.js/Express"
  },
  "timestamp": "2025-10-18T10:30:45.123Z",
  "fact": "The technical term for a cat’s hairball is a bezoar."
}
```
