# BetIqPro

- **NOTE:**

  - > Node version used: `v17.0.0`
  - > Recommended version: `<= v18.0.0`
  - > Download link: <https://nodejs.org/dist/>

- To initialise the project:

  1. Make sure node is installed. `node -v`
  2. Make sure npm is installed as well. `npm -v`
  3. Install expo globally just to be sure: `npm install --global expo-cli`
  4. Install project dependencies: `npm install`
  5. Start project: `npx expo start`

- If at some point you run into this error:

  > Some dependencies are incompatible with the installed expo package version:
  >
  > - The fix is: `npx expo install --fix`

  - The above error could result from differing versions to that of expo.

## For dev purposes

  > `npm install -g firebase-tools`

- To use you physical device:

  - > `adb devices` - Check if it is read

  - > `adb reverse tcp:8081 tcp:8081`

- Others:
  - > `npx expo run:android` - create android native build
  - > `npx expo run:android --variant release` - Production builds locally
  - > `npx expo prebuild --clean` - rebuild after changes
  - > `sudo npm install -g eas-cli`
  - > `eas login`
  - > `eas build:configure`
  - > `eas build -p android`
  - > `eas build -p android --profile preview`
  - > Check out your most recent commit before executing `npx expo run:[android|ios]` - revert to expo
  - > `npm install` - restore node modules

- Goodluck!!!
