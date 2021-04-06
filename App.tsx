import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {createStackNavigator, StackScreenProps} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";

type StackParamList = {
  Home: { post?: string } | undefined,
  Details: { itemId?: number, otherParam?: string },
  CreatePost: undefined,
};

type HomeScreenProps = StackScreenProps<StackParamList, 'Home'>;
type DetailsScreenProps = StackScreenProps<StackParamList, 'Details'>;
type CreatePostScreenProps = StackScreenProps<StackParamList, 'CreatePost'>;

function HomeScreen({ route, navigation } : HomeScreenProps) {
  useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);
  
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button 
        title="Go to Details" 
        onPress={() => {
          navigation.navigate('Details', {
            otherParam: 'anything you want here',
          });
        }}
      />
      <Button title="Create post" onPress={() => navigation.navigate('CreatePost')} />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
  );
}

function DetailsScreen({ route, navigation } : DetailsScreenProps) {
  const { itemId, otherParam } = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details', {
          itemId: Math.floor(Math.random() * 100),
        })}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

function CreatePostScreen({ route, navigation }: CreatePostScreenProps) {
  const [postText, setPostText] = useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white'}}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate('Home', { post: postText });
        }}
      />
    </>
  )
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "My home",
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="Details" component={DetailsScreen} initialParams={{ itemId: 42 }} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
