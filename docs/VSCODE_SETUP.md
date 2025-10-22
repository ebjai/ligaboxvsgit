# Getting Started with VS Code

This guide will help you set up and use this project in Visual Studio Code.

## Opening the Project

### Method 1: Using the Workspace File
1. Open VS Code
2. Go to `File > Open Workspace from File...`
3. Select `ligaboxvsgit.code-workspace`

### Method 2: Opening the Folder
1. Open VS Code
2. Go to `File > Open Folder...`
3. Select the `ligaboxvsgit` folder

## First Time Setup

1. **Install Dependencies**
   - Open the integrated terminal (`Ctrl+` ` or `View > Terminal`)
   - Run: `npm install`

2. **Install Recommended Extensions**
   - When prompted, click "Install" on the notification about recommended extensions
   - Or press `Ctrl+Shift+X` to open Extensions view and install manually

## Common Tasks

### Running the Application
- **From Terminal**: `npm start`
- **Using Tasks**: `Ctrl+Shift+P` → `Tasks: Run Task` → `Start`

### Building the Project
- **Quick**: Press `Ctrl+Shift+B` (default build task)
- **From Terminal**: `npm run build`

### Running Tests
- **From Terminal**: `npm test`
- **Using Tasks**: `Ctrl+Shift+P` → `Tasks: Run Test Task`

### Debugging

#### Debug the Main Application
1. Press `F5` or click the Run icon in the sidebar
2. Select "Launch Program" configuration
3. Set breakpoints by clicking in the gutter next to line numbers

#### Debug Tests
1. Press `F5` or click the Run icon in the sidebar
2. Select "Run Tests" configuration
3. Tests will run in debug mode

### Linting
- **From Terminal**: `npm run lint`
- Linting errors will also appear in the Problems panel (`Ctrl+Shift+M`)

## Keyboard Shortcuts

- `Ctrl+Shift+B` - Build
- `F5` - Start Debugging
- `Ctrl+Shift+D` - Open Debug view
- `Ctrl+` ` - Toggle Terminal
- `Ctrl+Shift+P` - Command Palette
- `Ctrl+P` - Quick Open File

## Tips

1. **Format on Save**: Files will automatically format when you save (enabled by default)
2. **Auto Fix**: Some linting issues can be auto-fixed on save
3. **IntelliSense**: Get code completion by typing `Ctrl+Space`
4. **Git Integration**: Use the Source Control view (`Ctrl+Shift+G`) for Git operations

## Troubleshooting

### Dependencies Not Installing
- Make sure you have Node.js installed
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

### Build or Tests Failing
- Check the Problems panel (`Ctrl+Shift+M`) for detailed error messages
- Check the Terminal output for more information

### Extensions Not Working
- Reload VS Code: `Ctrl+Shift+P` → `Developer: Reload Window`
- Make sure extensions are enabled
