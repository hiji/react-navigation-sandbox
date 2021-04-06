import React from 'react';
import {Button, Text, View} from 'react-native';
import {createStackNavigator, StackScreenProps} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";

type StackParamList = {
  Home: undefined,
  Details: undefined
};

function HomeScreen({ navigation } : StackScreenProps<StackParamList, 'Home'>) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Overview"}} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
