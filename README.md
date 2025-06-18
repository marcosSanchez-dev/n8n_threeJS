# 🎙️ Voice-to-3D Scene Generator

This project allows you to **create and update 3D scenes with your voice** using a Telegram bot. It combines **AI, automation and 3D visualization** to generate real-time graphics based on simple voice instructions.

## 🚀 How It Works

1. You speak to a Telegram bot.
2. Your voice is transcribed with OpenAI Whisper.
3. The transcription is sent to GPT to generate a JSON scene.
4. n8n sends the scene to a local Three.js visualizer.
5. The scene updates every 3 seconds with new instructions.

> Example voice prompt:  
> **"One red sphere, one blue cube, and one green cone. Make them shiny."**

## 🛠️ Tech Stack

- 🎛️ **n8n** – Automation workflow engine
- 🤖 **OpenAI Whisper** – Voice-to-text transcription
- 🧠 **GPT-3.5 Turbo** – JSON scene generation
- 🧱 **Three.js** – 3D visualization
- 📱 **Telegram Bot** – Voice input interface
- 💡 **OSC (optional)** – Send light signals to MadMapper

## 📦 Folder Structure

.
├── public/ # Frontend files (Three.js viewer)
│ ├── index.html
│ └── main.js # Loads and renders scene.json
├── server.js # Local API to serve scene.json
├── scene.json # Generated scene from n8n
├── workflows/ # n8n exported workflows (optional)
└── README.md

markdown
Copiar
Editar

## 📸 Preview

![demo](https://your-demo-image-or-gif-url)

## ✨ Features

- Voice-based interaction via Telegram
- 3D objects: `sphere`, `cube`, `cone`
- Custom properties: `color`, `position`, `size`, `material`, `roughness`, `metalness`
- Scene updates every 3 seconds
- Dynamic camera animation
- Basic lighting and shadow simulation

## 📋 Example Prompts

- **"Add a silver sphere in the center with a shiny surface"**
- **"Place a green cone on the left and a blue cube on the right"**
- **"Three soft-color spheres floating in space"**

## 🧠 How to Use

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/voice-to-3d.git
   cd voice-to-3d
Install dependencies:

bash
Copiar
Editar
npm install
Start both servers:

bash
Copiar
Editar
npm start
In n8n, set up your Telegram trigger → Whisper → GPT → HTTP Request (POST to localhost:3001/scene).

Visit your 3D viewer at:

arduino
Copiar
Editar
http://localhost:3000
🔐 Requirements
Node.js 18+

n8n running (can be local or cloud)

Telegram bot token

OpenAI API key

Optional: MadMapper with OSC setup

🙌 Credits
Created by Marcos Sánchez — exploring voice, code, and real-time 3D visuals.
