import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from "expo-router";
import { getUserChats } from '../../utils/firebaseUtils';
import { default as Menu } from "../../components/common/Footer";
import { format } from "date-fns";


const Messages = () => {
  const { data, isLoading } = getUserChats()
  const router = useRouter();

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={()=>router.push({ pathname: `/Message/${item.userId}` })}>
            <Image style={styles.image} source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar4.png' }} />
            <View style={styles.textContainer}>
              <Text style={styles.nameText}>{item?.userName}</Text>
              <Text style={styles.phoneText}>{item?.lastMessage} - {format(item?.timestamp, "h:mm a")}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item?.userId}
      />
      )}
      <Menu/>
    </View>
  )
}

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    backgroundColor: '#eee',
    padding: 8,
    marginTop: 0,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  textContainer: {
    marginLeft: 16,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phoneText: {
    fontSize: 16,
    color: '#999',
  },
})
