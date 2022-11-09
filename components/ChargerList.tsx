import {useState, useEffect} from 'react';
import { FlatList, View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';



const ChargerList = () => {
    const [data, setData] = useState([{title: '', address: ''}]);
    const [countryCode, onCodeChange] = useState<string | undefined>(undefined);
    const [results, setResults] = useState([])
    const [number, onChangeNumber] = useState(null);
  
    const key = 'd960089c-5ed1-4e4f-8c0e-556f76b2f3c6';



/* Here, I have posted a very basic get request which retrieves the first 10 results for chargers in the US (but for other countries,
  we could validate the user's location and assign based on that. I've installed a community package and added location permissions for Android
  users). 
 
 If I was building out the full application, I would first authenticate the user with a post request, 
 grab the token and store it in a store like Redux. Then I would have the user enter their zip code with a validator, post a GET request
 with the exact longitude/latitude and have a allow the user to enter a distance with a dropdown for choosing either M/KM (and adding that to the 
  GET request body). It looks like the user can filter by zip code, but I would have to look at the documentation closer 


//The folders would look like this:
services
- fetchData (would include this in a useEffect)
Screens 
 - Landing
     (Components)
     <Login/> <SignUp/> <ForgotPassword/> 
 - Dashboard
*/



const onSubmit = () => {
    fetch(`https://api.openchargemap.io/v3/poi?key=d960089c-5ed1-4e4f-8c0e-556f76b2f3c6/?output=json&compact=true`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          countryCode: 'US',
          maxresults: '10',
          //distance
          //longitude
          //latitude
        })
        }).then(response => response.json())
        .then(res => { 
            setData([...data, {title: res?.AddressInfo?.title, address: res?.addressInfo?.addressLine1}]) 
        })
}


const Item = ({ item }) => (
    <View style={styles.button}>
      <Text style={styles.text}>{item?.title}</Text>
      <Text style={styles.text}>{item?.address}</Text>
    </View>
  );

  const renderItem = ({ item }) => {
    // const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    // const color = item.id === selectedId ? 'white' : 'black';

    /* Here we could have an expandable item, so when the user clicks on the title,
    it expands and provides details such as address, distance, maybe even a link to 
    Google maps  */

    return (
        <Item
          item={item}
        //   onPress={() => setSelectedId(item.id)}
        />
      );
    };
  

    return (
        <SafeAreaView>
            <Text style={styles.text}>Find a charging port near you!</Text>
            <TextInput
                style={styles.input}
                placeholder={"Enter your zip code here!"}
                onChangeText={onCodeChange}
                value={countryCode}>
            </TextInput>
            <TouchableOpacity
                style={styles.button}
                onPress={onSubmit}>
                    <Text>Get Charger List</Text>
            </TouchableOpacity>
            <FlatList
                data={results}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id}>
            </FlatList>
          
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    input: {
      height: 40,
      marginVertical: 20,
      marginTop: 20,
      borderWidth: 1,
      padding: 10,
    },
    text: {
      marginTop: 40,
      fontSize: 18,
      alignSelf: 'center',
      fontColor: 'black',
      fontWeight: '500',
    },
    button: {
        alignItems: 'center',
        backgroundColor: "#DDDDDD",
        padding: 10    
    }
  });


export default ChargerList;