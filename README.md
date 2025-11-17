## ChatApp - Quick Setup Guide
1. Install Dependencies
```
cd ChatAppOffline
npm install
```

2. Start Development Server
```
npx expo start
```

Or with cache cleared:
```
npx expo start -c
```

3. Run on Your Phone
```
Once the server starts, you'll see a QR code in your terminal.

On Android:

Open Expo Go app on your phone

Tap "Scan QR code"

Point camera at the QR code in terminal
```

## Features
- `Chat List`: Browse all conversations
- `Search`: Use search bar to filter contacts
- `Send Messages`: Tap any contact to open chat and send messages
- `Offline Mode`: Turn on Airplane Mode to test offline functionality
- `Settings`: Tap ⚙️ icon in top-right corner

## Project Structure
```
ChatAppOffline/
├── src/
│   ├── components/      # components
│   ├── screens/         # ChatList, Chat, Settings screens
│   ├── services/        # Database, network, config, sync
│   ├── utils/           # Demo data, Utility functions 
│   └── navigation/      # App navigation
├── App.js               # Main entry point
└── package.json
```

Made by Ayush, Thank You!