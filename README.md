
# Real-time Chess Game

A real-time chess game application built with modern web technologies. This project allows users to play chess against each other in real-time with a clean and responsive interface.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Pages](#pages)
- [Custom Hooks](#custom-hooks)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time multiplayer chess game
- Responsive design with Tailwind CSS
- Drag-and-drop functionality for chess pieces
- Real-time notifications using React Toastify
- Comprehensive game logic with chess.js
- Smooth real-time communication with socket.io-client

## Technologies Used

- **Vite**: Used for project scaffolding and development server.
- **Tailwind CSS**: Utilized for styling the application.
- **React Router DOM**: Manages the application's routing.
- **React DnD Library**: Implements drag-and-drop functionality for chess pieces.
- **shadcn**: Provides UI components.
- **React Toastify**: Displays notifications within the app.
- **chess.js**: Handles the game logic and rules.
- **socket.io-client**: Manages real-time communication between clients and the server.

## Project Structure
## Pages

- **Landing Page** (`/`): The entry point of the application where users can start a new game or join an existing one.
- **Board Page** (`/board/:gameId`): The main game interface where users can play chess in real-time.

## Custom Hooks

- **useSocket**: This hook manages the socket connection, handling events for when the connection opens and closes. It ensures real-time updates and interactions are smoothly handled throughout the game.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/realtime-chess-game.git
   cd realtime-chess-game

## Images
![image](https://github.com/user-attachments/assets/cb0c32be-d915-462c-8b2b-1ba60c17c2bc)
![image](https://github.com/user-attachments/assets/c11ddbc8-175c-4da1-a6ed-95281cc7369a)
![image](https://github.com/user-attachments/assets/d18f8425-31a3-49ad-be8e-be86901886fd)



