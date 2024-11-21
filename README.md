# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

# Prereq

1. downlaod xcode
2. download android sdk
3. clone this repo
4. then download `google-servies.json` and `GoogleService-Info.plist` from https://console.firebase.google.com/u/1/project/ocean-app-a4c89/settings/general/ios:com.ocean.turtle.ios -> `turtle android` and `turtle ios` and paste to root folder
5. download `.env.local` from https://drive.google.com/file/d/1IjDtl_xEptHgX3KzuUtrhHVSbSBJAuzD/view?usp=drive_link and paste to root. Make sure you name it `.env.local`

## First time developer

1. build the ios project
   ```bash
   npx expo prebuild --clean
   ```

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

3. select platform, eg: i for iOS
   note: if you get this error `Xcode must be fully installed before you can continue`, run this `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`
