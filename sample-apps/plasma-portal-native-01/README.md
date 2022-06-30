# plasma-portal-native

## Setup
- `expo init project-name`
  - Choose a blank TypeScript project
- `yarn add fhirclient`
- `expo install expo-auth-session expo-random`
- `yarn add @react-navigation/native`
- `expo install react-native-screens react-native-safe-area-context`
  - https://reactnavigation.org/docs/getting-started/
- `yarn add @react-navigation/native-stack`
- `yarn add @react-navigation/drawer`
- `expo install react-native-gesture-handler react-native-reanimated`
  - https://reactnavigation.org/docs/drawer-navigator#installation
- `yarn add plasma-fhir-app-utils`
- `yarn add @react-native-picker/picker`
  - https://github.com/react-native-picker/picker
  - TODO: Want this to be dependency of component library
- Update babel.config.js
  - https://stackoverflow.com/questions/67130651/reanimated-2-failed-to-create-a-worklet-maybe-you-forgot-to-add-reanimateds-ba
- `expo install expo-splash-screen`
  - ERM: TODO: Don't want this
- `yarn add react-native-url-polyfill`
- Copy `/hooks/useCachedResources`
- `npm install debug`
- Add `constants/Config.ts` (and update .gitignore)
- `app.json`
  - Set `slug` = `plasmafhir-native`
  - Set `"scheme": "myapp",`
- `expo r -c`
  - Press `i` to open in iOS

---
- `yarn add plasma-fhir-react-client-context`



Gets rid of the navigation error, but doesn't let me launch the app
- Update dependencies in `package.json` to be:
  - `"@types/react": "~18.0.8",`
  - `npm install`
  - https://stackoverflow.com/questions/71816116/stack-navigator-cannot-be-used-as-a-jsx-component


