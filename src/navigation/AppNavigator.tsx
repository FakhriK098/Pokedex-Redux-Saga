import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from '@features/home/ui/HomePage';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: 'Pokedex' }}
        />
        {/* <Stack.Screen
          name="Detail"
          component={DetailPage}
          options={{ title: 'Pokemon Detail' }}
        />
        <Stack.Screen
          name="Search"
          component={SearchPage}
          options={{ title: 'Search Pokemon' }}
        />
        <Stack.Screen
          name="Compare"
          component={ComparePage}
          options={{ title: 'Compare Pokemon' }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
