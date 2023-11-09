# Dependency Documentation

## NOTE

Some dependencies are incompatible with the installed expo version i.e 49.0:

> @expo/webpack-config@18.1.3 - expected version: ^19.0.0
>
> expo-splash-screen@0.10.3 - expected version: ~0.20.5
>
> react-native@0.72.5 - expected version: 0.72.6
>
> react-native-gesture-handler@2.13.3 - expected version: ~2.12.0
>
> react-native-reanimated@3.5.4 - expected version: ~3.3.0
>
> react-native-safe-area-context@4.7.3 - expected version: 4.6.3
>
> react-native-screens@3.26.0 - expected version: ~3.22.0

Your project may not work correctly until you install the correct versions of the packages.

Fix with: `npx expo install --fix`

## NOTE_2

> Some dependencies are incompatible with the installed expo package version:
>
>- expo-asset - expected version: ~8.4.6 - actual version installed: 8.10.1
>- expo-constants - expected version: ~13.0.1 - actual version installed: 14.4.2
>- expo-splash-screen - expected version: ~0.14.1 - actual version installed: 0.10.3
>- expo-updates - expected version: ~0.11.7 - actual version installed: 0.18.16
>- react-native-gesture-handler - expected version: ~2.1.0 - actual version installed: 2.12.1
>- react-native-reanimated - expected version: ~2.3.1 - actual version installed: 3.0.2
>- react-native-safe-area-context - expected version: 3.3.2 - actual version installed: 4.6.3
>- react-native-screens - expected version: ~3.10.1 - actual version installed: 3.22.1

Your project may not work correctly until you install the correct versions of the packages.

To install the correct versions of these packages, please run: `expo install [package-name ...]`

## NOTE_3

> WARN  [2023-11-09T08:31:46.483Z]  @firebase/auth: Auth (10.5.2):
You are initializing Firebase Auth for React Native without providing
AsyncStorage. Auth state will default to memory persistence and will not
persist between sessions. In order to persist auth state, install the package
"@react-native-async-storage/async-storage" and provide it to
initializeAuth:

> import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

## NOTE_4
* b component error is caused by the component dashboard, eliminated by commenting the dashboard screen

## NOTE_5
* In Kali OS drawer seems to work well without issues.
* > node version: `v18.13.0`

