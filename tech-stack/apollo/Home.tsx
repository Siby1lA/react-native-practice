import {FlatList, Image, Text, View} from 'react-native';
import {useQuery, gql} from '@apollo/client';

type ItemType = {
  item: {
    id: string;
    name: string;
    photo: string;
    description: string;
  };
};

function Home(): JSX.Element {
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

  const {loading, error, data} = useQuery(GET_LOCATIONS);

  const Item = ({item}: ItemType) => (
    <View>
      <Text>{item.name}</Text>
      <Image style={{width: 200, height: 200}} source={{uri: item.photo}} />
      <Text>About this location:</Text>
      <Text>{item.description}</Text>
    </View>
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <FlatList
      data={data.locations}
      renderItem={Item}
      keyExtractor={item => item.id}
    />
  );
}

export default Home;
