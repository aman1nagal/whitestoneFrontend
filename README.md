Task Management Application - Frontend
Overview
This is the frontend of a real-time task management application built using Next.js. The frontend allows users to view, create, update, and delete tasks, with real-time updates when tasks are modified. The app uses WebSocket to ensure all task changes are reflected across clients instantly. User authentication is implemented to ensure that only authorized users can access their tasks.

Features
Task Management: Users can view, create, update, and delete tasks.
Real-Time Updates: The UI updates in real-time using Socket.IO-client when tasks are created, updated, or deleted.
User Authentication: Login and registration forms allow users to manage their own tasks securely.
State Management: The application uses Redux Toolkit for global state management.

Real-Time Collaborative Editing: Task changes made by one user are reflected in real-time for all other connected users.
Tech Stack
Next.js (12.6) for server-side rendering and React framework
React.js for component-based UI
Redux Toolkit for state management
Socket.IO-client for real-time WebSocket communication
Tailwind CSS for styling
JWT for managing user authentication
Getting Started
Prerequisites
Make sure you have the following installed:

Node.js (v14 or later)
npm or yarn
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/https://github.com/aman1nagal/whitestoneFrontend
cd task-management-frontend
Install dependencies:

bash
Copy code
npm install
Create a .env.local file to store environment variables:

bash
Copy code
NEXT_PUBLIC_API_URL=http://localhost:5000 # URL of the backend API
Run the development server:

bash
Copy code
npm run dev
The application will run at http://localhost:3000.

Scripts
npm run dev: Runs the development server.
npm run build: Builds the application for production.
npm run start: Starts the production server.
Real-Time Updates
The application uses Socket.IO for real-time communication. When a task is created, updated, or deleted, the changes are pushed to all connected clients instantly. Socket.IO is initialized on both the client and server to handle this communication.

To integrate WebSocket support with Redux Toolkit, the following setup is used:

Redux state is updated whenever a WebSocket event (e.g., task-created, task-updated) is emitted.
This ensures that the UI reflects real-time task updates across all users.
State Management
Redux Toolkit is used for managing the global state of the application. Here's how state is managed:

Tasks Slice: Handles CRUD operations for tasks and stores them in the Redux store.
Authentication Slice: Manages user authentication state, including JWT tokens for secure access.
Authentication
JWT (JSON Web Tokens) is used for authentication. After a successful login, a JWT is stored in local storage, and the token is sent with each request to verify the user's identity. Public and protected routes are handled using React hooks like useEffect to check user login status.

UI Design
Tailwind CSS is used for designing a responsive and modern UI.
The design ensures that the application is user-friendly and works across multiple devices.
Folder Structure
bash
Copy code
├── components # Reusable UI components
├── pages # Next.js pages (e.g., tasks, login, register)
├── store # Redux slices for state management
├── styles # Global styles (including Tailwind CSS)
└── utils # Utility functions (e.g., authentication, API requests)

License
This project is licensed under the MIT License.
