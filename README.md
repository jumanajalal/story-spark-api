🌙 Story Weaver

Story Weaver is a React + Vite application that lets you generate, continue, and save AI-powered stories across different genres.
It’s styled with Tailwind CSS and shadcn/ui, and powered by a backend API deployed on Render.

👉 Live API URL: https://story-spark-api-3.onrender.com

🚀 Features

Generate creative story prompts with AI

Continue stories dynamically

Save and view your personal story library

Simple, mystical UI with a magical theme

🛠️ Tech Stack

Vite (bundler)

React + TypeScript

Tailwind CSS (styling)

shadcn/ui (components)

Backend API: FastAPI on Render

📦 Getting Started
Prerequisites

Node.js (v18+ recommended)

npm

Installation

Clone the repository

git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>


Install dependencies

npm install


Run the development server

npm run dev


Open http://localhost:5173 in your browser.

🌐 API Configuration

The frontend talks to the backend API using an environment variable.

Create a .env file in the root of your project:

VITE_API_URL=https://story-spark-api-3.onrender.com


In your React code, access it with:

const API_URL = import.meta.env.VITE_API_URL;
fetch(`${API_URL}/story`);

🚢 Deployment

You can deploy the frontend to any static hosting provider:

GitHub Pages

Render (Static Site)

Vercel / Netlify

For example, with Render:

Connect your GitHub repo.

Choose "Static Site" deployment.

Build Command: npm run build

Publish Directory: dist

Add environment variable: VITE_API_URL=https://story-spark-api-3.onrender.com

🌍 Custom Domain

To connect a custom domain (e.g. storyweaver.com), set it up in your hosting provider’s settings.

👩‍💻 Contributors

@jumanajalal

@lovable-dev[bot]

✨ Where stories come to life. Built with passion for storytellers.
