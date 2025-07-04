# 4Cast - Fantasy Sports Draft Application

Welcome to **4Cast**, a modern and interactive fantasy sports drafting application. This platform provides a comprehensive suite of tools for commissioners to set up a league and for players to participate in a live, dynamic draft.

---

### Table of Contents
- [Key Features](#key-features)
- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

---

## Key Features ✨

- **Commissioner Dashboard**: A dedicated interface for league commissioners to manage all draft settings.
  - **League Setup**: Configure league name, team count (6-15 teams), and time per pick.
  - **Draft Types**: Choose between a "Balanced Draft" (classic snake style) or an "Auction Draft" for budget-based bidding.
  - **Category Selection**: Customize the draft by selecting from a wide range of official NBA categories.
  - **Live Chat**: A pre-draft chat for league members to communicate.
- **Player-Specific Tools**:
  - **Category Spend**: In auction drafts, players can strategically allocate a budget of 500 units across all categories.
  - **Selection Ranking**: Players can create personalized rankings for all draftable selections (players/teams) within each category. This is powered by a smooth, intuitive drag-and-drop interface to help guide their draft strategy.
- **Live Draft Room**: (In Development) The main event where the real-time draft takes place, with a dynamic draft board and pick-by-pick updates.
- **Dynamic & Responsive UI**: Built with modern tools for a seamless experience on desktops, tablets, and mobile devices.

---

## Tech Stack 🛠️

This project is built with a modern, type-safe, and efficient stack:

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![ShadCN UI](https://img.shields.io/badge/shadcn--ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![DND Kit](https://img.shields.io/badge/dnd--kit-2779ff?style=for-the-badge)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

---

## Getting Started 🚀

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (v18 or later) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone <YOUR_GIT_URL>
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd kevin
    ```
3.  **Install dependencies:**
    ```sh
    npm install
    ```
4.  **Run the development server:**
    ```sh
    npm run dev
    ```
This will start the development server, typically at `http://localhost:5173`.

---

## Project Structure 📂

<details>
  <summary><strong>Click to view the project structure</strong></summary>
  
  Here is a brief overview of the key directories:

- `src/components`: Contains all the reusable UI components, organized by feature (e.g., `lobby`, `draft`, `ui`).
- `src/pages`: Contains the top-level page components that are mapped to routes.
- `src/contexts`: Holds the React context providers, like `LeagueContext` for global state management.
- `src/lib`: Core application logic, type definitions (`types.ts`), and central data definitions (`category-details.ts`).
- `src/data`: Contains mock data used for development, such as `initialPlayers.ts`.

</details>
