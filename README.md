# Ocean Turtle

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

# Prerequisite

1. Clone the [repo](https://github.com/EdwinKam/ocean-turtle).

2. Download [`.env.local`](https://drive.google.com/file/d/1uoBdR9y-Gi_WiQsqx7LVsHsgt3uEq2Tf/view?usp=drive_link) and place it inside project root directoy. Make sure you name it `.env.local`

3. install node 20.0.0, run `nvm use` to use that version

## iOS

1. Install [Xcode](https://apps.apple.com/us/app/xcode/id497799835).

2. Install Xcode Command Line Tools.

   ```sh
   $ sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
   ```

3. Install [Watchman](https://facebook.github.io/watchman/docs/install#macos).

   ```sh
   $ brew update
   $ brew install watchman
   ```

4. Download `GoogleService-Info.plist` from [Firebase Apple apps](https://console.firebase.google.com/u/0/project/ocean-app-a4c89/settings/general/ios:com.ocean.turtle.ios) -> `turtle ios` and place it inside project root directoy.

## Android

1. Install [Android Studio](https://developer.android.com/studio).

2. Follow [instructions](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated&mode=expo-go) on setting up Android SDK and emulator.

3. Download `google-servies.json` from [Firebase Android apps](https://console.firebase.google.com/u/0/project/ocean-app-a4c89/settings/general/android:com.ocean.turtle.android) -> `turtle android` and place it inside project root directoy.

## Getting Started

1. Install dependencies

   ```bash
   $ npm install
   ```

2. Prebuild your project

   ```bash
   $ npx expo prebuild --clean
   ```

3. Run the app on Android / iOS

   ```sh
   $ npx expo run:android
   $ npx expo run:ios
   ```

4. Start the development server

   ```bash
   $ npx expo start
   ```

   Once the development server boots up, make sure you are using `development build` by pressing the `s` key. Once you are in `development build`, press e.g. `i` key to start an iOS simulator.

## Local Development

Assuming you have finished the previous step, your changes to source file will immediately being reflected on the device you are running when you save.

When sending request to your local server (e.g. `localhost:8080`), setting env var `EXPO_PUBLIC__BACKEND_HOST = "http://localhost:8080"` will not work for Android emulator. In order to use a base url that can be shared by both iOS and Android in local development, you will need to run the following:

1. Get the ip address of your machine
   ```sh
   ipconfig
   ```
   Look for the value of inet of the en0 / en1 section (e.g. `192.168.X.X`). Use this as the base url of your request to your local server.
