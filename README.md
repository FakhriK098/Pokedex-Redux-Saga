**Pokedex (React Native)**

Browse, search, and filter Pokémon using the PokéAPI. Built with React Native, TypeScript, Redux, and Redux-Saga.

## Features

- **Home grid**: Infinite scroll list with pull-to-refresh.
- **Search**: Navigate to search and quickly find Pokémon by name.
- **Detail view**: Stats, abilities, types, sprites, and evolution chain.
- **Filters**: Filter by type, move, and color via a bottom sheet modal.
- **Theming helpers**: Dynamic color contrast for better readability.

## Tech Stack

- **React Native 0.81** + **React 19** + **TypeScript**
- **Navigation**: `@react-navigation/native` + native stack
- **State**: `redux` + `redux-saga`
- **Networking**: `axios`
- **Env**: `react-native-dotenv`
- **UI utils**: `react-native-modalize`, `tinycolor2`

## Prerequisites

- Node.js >= 18 and a package manager (`yarn` or `npm`)
- React Native environment set up (Android Studio and/or Xcode)
- Ruby + Bundler for iOS (CocoaPods)

## Quick Start

1) Install dependencies

```sh
yarn
# or
npm install
```

2) Configure environment variables

Create a `.env` file in the project root (one already exists in development) with at least:

```env
BASE_URL=https://pokeapi.co/api/v2
BASE_URL_IMAGE=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/
```

These are read via `@env` (see `babel.config.js`).

3) Start Metro

```sh
yarn start
# or
npm start
```

4) Run the app

- Android

```sh
yarn android
# or
npm run android
```

- iOS (first time per machine or after native deps change)

```sh
bundle install
cd ios && bundle exec pod install && cd -
yarn ios
# or
npm run ios
```

## Scripts

- `start`: Start Metro bundler
- `android` / `ios`: Build and run the app
- `lint`: Run ESLint
- `test`: Run Jest tests

## Project Structure

```
src/
  app/            # store setup (redux + saga)
  core/           # api, models, repository, store (actions, reducers, sagas)
  features/       # screens (home, search, detail, modalFilter)
  navigation/     # AppNavigator + types
  components/     # shared UI components
  themes/         # colors and theme helpers
  utils/          # helpers (e.g., id parsing)
```

Key files:

- `src/core/api/index.ts`: Axios instance using `BASE_URL` from `.env`
- `src/core/repository/pokedexRepository.ts`: PokéAPI calls and adapters
- `src/app/store.ts`: Redux store with saga middleware
- `src/navigation/AppNavigator.tsx`: Routes and screen registration

## Notes

- Module aliases are configured in `babel.config.js` via `babel-plugin-module-resolver`.
- Environment variables are loaded using `react-native-dotenv` with module name `@env`.

## Troubleshooting

- Clear Metro cache: `yarn start --reset-cache`
- Android build issues: `cd android && ./gradlew clean && cd -`
- iOS pod issues: `cd ios && bundle exec pod repo update && bundle exec pod install && cd -`

## License

This project is for learning/demo purposes. Add a license if you plan to distribute.
