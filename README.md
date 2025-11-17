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
1. `Offline Mode syncing/caching`: User sends message being offline, then backend-based sync of messages when the user comes online (use-case: unstable-network areas).
2. `Backend UI updates`: The backend team pushes a new UI design, and the app adapts instantly (use-case: festive season).
3. `Loader Animations`: Cool animations for loading, typing, and skeleton animation.
4. `Chat List`: Browse all conversations.
5. `Search`: Use the search bar to filter contacts by name (working).
6. `Send Messages`: Tap any contact to open chat and send messages.
7. `Settings`: Tap icon in top-right corner to access profile info, account info, etc..

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

Made by [Ayush](https://murdock9803.github.io/Ayush-Portfolio/), Thank You!
