import {Button, FlatList, Image, Text, TextInput, View} from 'react-native';
import {useMutation, useQuery, gql} from '@apollo/client';
import {useState} from 'react';

type ItemType = {
  item: {
    id: string;
    name: string;
    photo: string;
    description: string;
  };
};

function Home(): JSX.Element {
  const [text, onChangeText] = useState('');

  const GET_LOCATIONS = gql`
    query GetLocations {
      locations {
        id
        name
        description
        photo
      }
    }
  `;

  const ADD_TODO = gql`
    mutation AddTodo($type: String!) {
      addTodo(type: $type) {
        id
        type
      }
    }
  `;

  const {
    data: locationsData,
    loading: locationsLoading,
    error: locationsError,
  } = useQuery(GET_LOCATIONS);

  const [addTodo, {data: todoData, loading: todoLoading, error: todoError}] =
    useMutation(ADD_TODO);

  const Item = ({item}: ItemType) => (
    <View>
      <Text>{item.name}</Text>
      <Image style={{width: 200, height: 200}} source={{uri: item.photo}} />
      <Text>About this location:</Text>
      <Text>{item.description}</Text>
    </View>
  );

  if (locationsLoading && todoLoading) return <Text>Loading...</Text>;
  if (locationsError || todoError)
    return (
      <Text>
        Error : {locationsError?.message}
        {todoError?.message}
      </Text>
    );

  return (
    <View>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder="Add todo..."
      />
      <Button
        title="send"
        onPress={() => {
          addTodo({variables: {type: text}});
          onChangeText('');
        }}
      />
      <FlatList
        data={locationsData?.locations}
        renderItem={Item}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

export default Home;
