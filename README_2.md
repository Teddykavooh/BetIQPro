# NOTE

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
