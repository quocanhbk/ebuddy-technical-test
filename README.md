# EBUDDY Technical Test

This is a monorepo project using Turborepo, containing a Next.js frontend, Express.js backend, and shared TypeScript types. The project uses Firebase for authentication and data storage.

## Prerequisites

- Node.js >= 18
- npm >= 8
- Java JDK >= 11 (required for Firebase Emulators)
- Firebase CLI (`npm install -g firebase-tools`)

## Project Structure

```
packages/
  ├── frontend/     # Next.js frontend application
  ├── backend/      # Express.js backend application
  └── shared/       # Shared TypeScript types
```

## Installation

1. Install dependencies for all packages:

```bash
npm run install:all
```

2. Set up environment variables:

   Copy the example environment files and update them with your values:

   ```bash
   # Frontend
   cp packages/frontend/.env.example packages/frontend/.env.local
   # Backend
   cp packages/backend/.env.example packages/backend/.env
   ```

   For frontend (`packages/frontend/.env.local`):

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_API_URL=http://localhost:5500/api
   NEXT_PUBLIC_NODE_ENV=local
   ```

   For backend (`packages/backend/.env`):

   ```
   NODE_ENV=local
   PORT=5500
   FIREBASE_DATABASE_URL=your_database_url
   FIREBASE_SERVICE_ACCOUNT=your_service_account_json
   ```

   > Note: For the backend's `FIREBASE_SERVICE_ACCOUNT`, you need to paste your Firebase service account JSON. You can get this from Firebase Console > Project Settings > Service Accounts > Generate New Private Key.

## Development

1. Start the Firebase Emulators

```bash
firebase emulators:start --project <your-firebase-project-id>
```

2. Start all services:

```bash
npm run dev:all
```

This command will start:

- Frontend development server (http://localhost:3000)
- Backend development server (http://localhost:5500)
- Shared package in watch mode

Or start services individually:

```bash
# Start frontend
npm run dev:frontend

# Start backend
npm run dev:backend

# Start shared package in watch mode
npm run dev:shared
```

## Firebase Emulator

The project uses Firebase Emulators for local development:

- Authentication Emulator: http://localhost:9099
- Firestore Emulator: http://localhost:8081
- Emulator UI: http://localhost:4000

> Note: Firebase Emulators require Java JDK version 11 or higher. Make sure you have Java installed before running the emulators.

## Testing the Application

1. Visit http://127.0.0.1:4000/auth and create a new user
2. Visit http://localhost:3000/login
3. Login with the user you just created
4. After logging in, you'll be redirected to the profile page
5. You can view and update your user data

## Available Scripts

- `npm run install:all` - Install dependencies for all packages
- `npm run build` - Build all packages
- `npm run dev:all` - Start all services without emulators
- `npm run dev:frontend` - Start frontend development server
- `npm run dev:backend` - Start backend development server
- `npm run dev:shared` - Start shared package in watch mode
- `firebase emulators:start --project <your-firebase-project-id>` - Start Firebase emulators

## Features

- Full authentication flow with Firebase Auth
- User data management with Firestore
- Protected routes
- Type safety with shared types
- Material-UI components
- Redux for state management
- API integration between frontend and backend
