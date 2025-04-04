# React Authentication App

A modern React application that implements secure user authentication using Supabase. This application features a clean, responsive UI with enhanced security features.

## Features

- User registration with email validation and password strength requirements
- Secure login with password visibility toggle
- Protected routes for authenticated users
- Automatic logout after 1 minute of inactivity for enhanced security
- Form validation with real-time feedback
- Responsive design with modern UI components
- Supabase integration for authentication and data storage

## Technologies Used

- [React 19](https://reactjs.org/)
- [React Router 7](https://reactrouter.com/)
- [Supabase](https://supabase.com/) for authentication and backend
- [React Icons](https://react-icons.github.io/react-icons)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Hero Icons](https://heroicons.com/) for UI elements

## Project Structure

- `src/`: Contains the main application code
  - `components/`: Reusable React components
    - `Login.js`: Handles user login with validation
    - `Registration.js`: Manages user registration with form validation
    - `Home.js`: Protected home page with auto-logout functionality
    - `AuthForm.css`: Styling for authentication components
  - `supabaseClient.js`: Initializes the Supabase client
  - `App.js`: Main application component with routing logic

## Authentication Flow

1. Users can register with email and password, with real-time validation
2. Login is secured with Supabase authentication
3. Upon successful authentication, users are redirected to the Home page
4. Protected routes ensure only authenticated users can access certain parts of the application
5. Users are automatically logged out after 1 minute of inactivity for security

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up a Supabase project and obtain your Supabase URL and API key
4. Create a `.env` file in the project root with your Supabase credentials:
   ```
   REACT_APP_SUPABASE_URL=your-supabase-project-url
   REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
5. Start the development server:
   ```
   npm start
   ```

## Available Scripts

- `npm start`: Runs the app in development mode at [http://localhost:3000](http://localhost:3000)
- `npm test`: Launches the test runner in interactive watch mode
- `npm run build`: Builds the app for production to the `build` folder

## Security Features

- Password strength validation during registration
- Automatic session timeout after inactivity
- Protected routes with React Router
- Environment variables for sensitive API keys

## Learn More

- [React Documentation](https://reactjs.org/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Router Documentation](https://reactrouter.com/docs/en/v7)
