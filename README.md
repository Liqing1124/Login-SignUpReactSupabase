# React Authentication App

This project is a React application bootstrapped with [Create React App](https://github.com/facebook/create-react-app) that implements user authentication using Supabase.

## Features

-   User registration and login
-   Protected routes for authenticated users
-   Supabase integration for authentication and data storage
-   Modern React practices with functional components and hooks

## Technologies Used

-   [React](https://reactjs.org/)
-   [React Router](https://reactrouter.com/)
-   [Supabase](https://supabase.com/)
-   [react-icons](https://react-icons.github.io/react-icons)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode. See the [Create React App documentation](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder. It optimizes the build for the best performance.

See the [Create React App documentation](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Project Structure

-   `src/`: Contains the main application code.
    -   `components/`: Reusable React components.
        -   `AuthForm.js`: Authentication form component (login/registration).
        -   `Home.js`: Home page component for authenticated users.
        -   `Login.js`: Login component.
        -   `Registration.js`: Registration component.
    -   `supabaseClient.js`: Initializes the Supabase client.
    -   `App.js`: Main application component with routing.

## Setup

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Set up a Supabase project and obtain your Supabase URL and API key.
4.  Configure the Supabase client in `src/supabaseClient.js` with your Supabase URL and API key.
5.  Start the development server: `npm start`

## Authentication Flow

The application uses Supabase for user authentication. The `AuthForm` component handles both login and registration. Upon successful authentication, the user is redirected to the `Home` page. Protected routes are implemented using React Router to ensure that only authenticated users can access certain parts of the application.

## Learn More

You can find more information in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

To learn Supabase, check out the [Supabase documentation](https://supabase.com/docs).
# Login-SignUpReactSupabase
