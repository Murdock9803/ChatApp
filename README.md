### SmartChatApp

## Screenshots
#### Screen - Chats List and Chat

<div style="display: flex; gap: 10px;">
  <img src="https://github.com/user-attachments/assets/2627a683-e675-4f37-8206-b933fee46d95" width="32%"/>
  <img src="https://github.com/user-attachments/assets/e79ff062-848a-456b-be81-1043d8e27cf5" width="32%"/>
  <img src="https://github.com/user-attachments/assets/22f2ad26-b593-41c3-b02f-32ace7bc2e90" width="32%"/>
</div>

#### Screen - Settings

<div style="display: flex; gap: 10px;">
  <img src="https://github.com/user-attachments/assets/86d38c1d-fd33-4a56-8c42-2d61e5a499aa" width="32%"/>
  <img src="https://github.com/user-attachments/assets/9bb4f6a0-55b4-4b70-bab5-ccfee941c6d4" width="32%"/>
</div>



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

## Quick Local Setup Guide
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

Made by [Ayush](https://murdock9803.github.io/Ayush-Portfolio/), Thank You!
