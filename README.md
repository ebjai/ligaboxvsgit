# ligaboxvsgit

A Node.js project configured for development in Visual Studio Code.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Visual Studio Code](https://code.visualstudio.com/)
- Git

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/ebjai/ligaboxvsgit.git
   cd ligaboxvsgit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Open in VS Code**
   ```bash
   code .
   ```

4. **Install recommended extensions**
   - When you open the project in VS Code, you'll be prompted to install recommended extensions
   - Or manually install them from the Extensions view (Ctrl+Shift+X)

## Available Scripts

- `npm start` - Run the application
- `npm run build` - Build the project
- `npm test` - Run tests with Jest
- `npm run lint` - Lint code with ESLint
- `npm run dev` - Run in development mode with auto-reload

## VS Code Features

### Build Tasks
- Press `Ctrl+Shift+B` to run the build task
- All available tasks can be accessed via `Terminal > Run Task...`

### Debugging
- Press `F5` to start debugging
- Breakpoints can be set by clicking in the gutter
- Two debug configurations available:
  - Launch Program
  - Run Tests

### Testing
- Run tests using `npm test`
- Debug tests using the "Run Tests" launch configuration

## Project Structure

```
ligaboxvsgit/
├── .vscode/          # VS Code configuration
│   ├── settings.json # Editor settings
│   ├── tasks.json    # Build tasks
│   ├── launch.json   # Debug configurations
│   └── extensions.json # Recommended extensions
├── src/              # Source code
│   └── index.js      # Main entry point
├── tests/            # Test files
│   └── sample.test.js
├── docs/             # Documentation
├── package.json      # Node.js dependencies
└── README.md         # This file
```

## Development Workflow

1. Make changes to files in the `src/` directory
2. Run tests with `npm test`
3. Lint your code with `npm run lint`
4. Debug using VS Code's built-in debugger (F5)
5. Commit and push your changes

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

ISC