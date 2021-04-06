import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Button, Image, Text, TextInput, View} from 'react-native';
import {createStackNavigator, StackHeaderTitleProps, StackScreenProps} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";

type StackParamList = {
  Home: { post?: string } | undefined,
  Details: { itemId?: number, otherParam?: string },
  CreatePost: undefined,
  MyModal: undefined,
};

type HomeScreenProps = StackScreenProps<StackParamList, 'Home'>;
type DetailsScreenProps = StackScreenProps<StackParamList, 'Details'>;
type CreatePostScreenProps = StackScreenProps<StackParamList, 'CreatePost'>;
type ModalScreenProps = StackScreenProps<StackParamList, 'MyModal'>;

function HomeScreen({ route, navigation } : HomeScreenProps) {
  useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  const [count, setCount] = useState(0);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Update count"
          onPress={() => setCount(c => c + 1)} />
      )
    })
  })

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Text>Count: {count}</Text>
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
      <Button
        onPress={() => navigation.navigate('MyModal')}
        title="Open Modal"
      />
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

function LogoTitle(props: StackHeaderTitleProps) {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
    />
  )
}

function ModalScreen({ navigation }: ModalScreenProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();


function MainStackScreen() {
  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          headerTitle: props => <LogoTitle {...props} />,
        })}
      />
      <MainStack.Screen name="Details" component={DetailsScreen} initialParams={{ itemId: 42 }} />
      <MainStack.Screen name="CreatePost" component={CreatePostScreen}/>
    </MainStack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Main" component={MainStackScreen} />
        <RootStack.Screen name="MyModal" component={ModalScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;