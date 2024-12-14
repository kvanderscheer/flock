# 🐦 Flock

An interactive flocking simulation built with Nuxt 3, implementing Craig Reynolds' Boids algorithm. Watch as autonomous agents follow simple rules to create complex, emergent flocking behavior.

## 🚀 Features

- Real-time flocking simulation with adjustable parameters:
  - Dynamic flock size control
  - Adjustable movement speed
  - Customizable flocking behaviors:
    - Separation: Avoid crowding neighbors
    - Alignment: Steer towards average heading
    - Cohesion: Steer towards center of neighbors
  - Configurable perception radius for each boid
  - Adjustable maximum steering force
  - Interactive mouse influence:
    - Customizable influence radius
    - Toggle mouse attraction/repulsion

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm, yarn, or pnpm

## ⚡ Quick Start

1. Clone the repository:

```bash
git clone https://github.com/kvanderscheer/flock.git
cd flock
```

2. Install dependencies:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

3. Start the development server:

```bash
npm run dev
```

The simulation will be available at `http://localhost:3000`

## 🛠️ Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

The simulation behavior can be customized by modifying the following parameters:

- `flockSize`: Number of boids in the simulation
- `speed`: Base movement speed of the boids
- `separationWeight`: Strength of separation behavior
- `alignmentWeight`: Strength of alignment behavior
- `cohesionWeight`: Strength of cohesion behavior
- `perceptionRadius`: How far each boid can see
- `maxForce`: Maximum steering force
- `mouseInfluenceRadius`: Range of mouse interaction
- `mouseAttraction`: Toggle between attraction and repulsion

## 🚀 Deployment

Flock can be deployed on any platform that supports Nuxt 3. For detailed deployment instructions, check out the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](link-to-issues).

## 📝 License

This project is MIT licensed.

## 👥 Authors

- **Kurt VanderScheer** - [GitHub Profile](https://github.com/kvanderscheer)

---

Built with [Nuxt 3](https://nuxt.com) 🐦
