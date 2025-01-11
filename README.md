# Prefab Microfrontends

This project demonstrates the use of **React microfrontends** with a host application and three separate microfrontend modules: Header, Footer, and AppContent. The architecture leverages **Webpack 5's Module Federation** for seamless integration. Styling is handled using **Tailwind CSS** and **ShadCN/UI**. Additionally, the project uses **concurrently** to manage multiple module servers efficiently.

## Features

- Modular architecture with React microfrontends.
- Styling powered by Tailwind CSS and ShadCN/UI.
- Dynamic module imports using Webpack Module Federation.
- Development servers managed via concurrently.
- Easy setup and clear configuration.
- Code quality tools: Prettier, ESLint, and Babel.

## Design Decisions

### Why Microfrontends

Microfrontends split a large application into smaller, independently deployable modules. Key benefits include:

- **Scalability**: Teams can work on different parts of the application independently.
- **Flexibility**: Each microfrontend can use its own tech stack.
- **Faster Development**: Modular approach reduces development bottlenecks.
- **Improved Maintainability**: Changes in one microfrontend do not affect others.

### Why ShadCN/UI Over Material UI

ShadCN/UI provides a lightweight and customisable component library that integrates seamlessly with Tailwind CSS. Unlike Material UI, which imposes opinionated styles and adds significant bundle size, ShadCN/UI is:

- **Highly Customisable**: Tailored to your specific design needs.
- **Performance Optimised**: Minimal impact on bundle size.
- **Utility-First Design**: Leverages the power of Tailwind CSS for streamlined development.

### Why Tailwind CSS

Tailwind CSS is a utility-first CSS framework that simplifies the process of creating responsive and consistent designs. Key benefits include:

- **Speed**: Develop styles rapidly using utility classes.
- **Consistency**: Achieve uniform design without the need for custom CSS.
- **Responsive Design**: Built-in support for mobile-first and responsive design.
- **Maintainability**: Simplifies the management of complex styles.

### Why Prettier, ESLint, and Babel

- **Prettier**: Enforces consistent code formatting, making the codebase easier to read and maintain.
- **ESLint**: Identifies and fixes common coding errors, ensuring adherence to coding standards.
- **Babel**: Transpiles modern JavaScript syntax into compatible code for older environments, enabling the use of the latest language features.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/prefab-microfrontends.git
   ```
2. Navigate to the project directory:
   ```bash
   cd prefab-microfrontends
   ```
3. Install dependencies for all modules:
   ```bash
   npm install
   ```

### Running the Application

1. Start all microfrontends and the host application:

   ```bash
   npm start
   ```

   This command uses **concurrently** to run multiple development servers in parallel (to run the dev scripts in all modules simultaneously), reducing setup complexity.

   | Module                | Port | Description                |
   | --------------------- | ---- | -------------------------- |
   | **Host (MFE Host)**   | 8080 | Integrates all MFEs        |
   | **Header Module**     | 8081 | Header microfrontend       |
   | **Footer Module**     | 8082 | Footer microfrontend       |
   | **AppContent Module** | 8083 | Main content microfrontend |

2. Open your browser and navigate to:

   ```
   http://localhost:8080
   ```

   The application will be accessible on port 8080.

## Configuration Details

Webpack's **Module Federation Plugin** is used to manage the integration of microfrontends into the host application. The `remotes` configuration determines which microfrontends are dynamically imported. For example:

```js
const remotes = {
  prefab_header_module: `prefab_header_module@http://localhost:8081/remoteEntry.js`,
  prefab_footer_module: `prefab_footer_module@http://localhost:8082/remoteEntry.js`,
  prefab_appcontent_module: `prefab_appcontent_module@http://localhost:8083/remoteEntry.js`,
};
```

The host dynamically resolves these URLs and loads the remote modules at runtime. To prevent caching issues during development, a cache-busting query parameter is appended to the URLs.

This logic allows the host to remain decoupled from the specifics of the microfrontends' implementations, enabling independent development and deployment of each module.

## Directory Structure

The project is organised as follows:

```
prefab-microfrontends/
│
├── prefab-header-module/      # Header microfrontend
├── prefab-mfehost-module/     # Host application
├── prefab-footer-module/      # Footer microfrontend
└── prefab-appcontent-module/  # AppContent microfrontend
│
│
└── shared-styles/              # Shared styles and Tailwind configuration
    ├── tailwind.config.ts      # Shared Tailwind configuration
    ├── global.css              # Global styles for Tailwind
    ├── components/             # Shared styled components (optional)
    └── tsconfig.json           # TypeScript configuration if needed
```

## Shared Styles module

The objective is to reduce duplication of effort, and ensure consistency (single source of truth), i.e. ensure that the components and styles are consumable by other microfrontends.

- Global styles (CSS or SCSS)
- Reusable UI components (React, styled-components, etc.)

## Development Notes

- **No Licence Granted**: This project is proprietary. No permission is granted to reuse or distribute this code.
- **No Contributions Requested**: Contributions are neither requested nor accepted at this time.
- Ensure that ports 8080, 8081, 8082, and 8083 are free for the application to function correctly.

## Troubleshooting

- If styles are not applied, verify that Tailwind CSS is configured correctly.
- Ensure that all modules are running by checking the output of the `npm start` command.
- Clear your browser cache to see the latest updates.

---

Thank you for exploring Prefab Microfrontends!
