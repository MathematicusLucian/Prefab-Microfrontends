const path = require("path");

module.exports = {
  name: "shared-styles",
  filename: "shared-styles.js",
  exposes: {
    // Expose the shared styles module to other microfrontends
    './ui': path.resolve(__dirname, 'src/components/ui'),  // Exposing UI components
    './styles': path.resolve(__dirname, 'src/styles'),    // Exposing global styles
    './utils': path.resolve(__dirname, 'src/lib/utils'),  // Exposing utility functions
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
    // Any other libraries to share between microfrontends (e.g., tailwindcss, etc.)
  },
};
