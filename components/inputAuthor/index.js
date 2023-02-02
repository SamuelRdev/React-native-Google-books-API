import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, Image, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Linking } from 'react-native';

const AuthorInput = () => {
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}`);
    const json = await response.json();
    setData(json);
    setLoading(false);
  };

  const BookItem = ({ title, publicationYear, description, coverImage, buyLink, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, {marginVertical: 20, borderWidth: 1}]}>
        <Image source={{ uri: coverImage }} style={styles.image}/>
        <Text style={{ marginVertical: 10, fontWeight: "bold", textDecorationLine: 'underline'}}>Titre :</Text>
        <Text>{title} ({publicationYear})</Text>
        <Text style={{ marginVertical: 10, fontWeight: "bold", textDecorationLine: 'underline' }}>Description :</Text>
        <Text style={{textAlign:'center'}}>{description?.substring(0, 80)}...</Text>
        <Text style={{ marginVertical: 10, fontWeight: "bold", textDecorationLine: 'underline' }}>Acheter :</Text>
        <Text
            style={{ color: 'blue' }}
            onPress={() => Linking.openURL(buyLink)}>
            Buy on Google
        </Text>
        </View>
    </TouchableOpacity>
  );

  const BookDetailScreen = ({route}) => {
    const book = route.params;
    return (
      <View>
        <Text>Titre: {book.title}</Text>
        <Text>Année de publication: {book.publicationYear}</Text>
        <Text>Description: {book.description}</Text>
      </View>
    );
  };

  if(data){
    console.log(data)
  }
  
  const handleClear = () => {
    setData(null);
  };

  const styles = StyleSheet.create({
    item:{
      width: '50%',
      height: 150,
    },
    button:{
      backgroundColor: 'red',
      textAlign: 'center',
      marginTop: 10,
      padding: 7,
      color: '#FFF',
      textTransform: 'uppercase',
      borderRadius: 3
    },
    card:{
      flex: 1,
      borderColor: '#D3D3D3',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 50,
      // height: 200,
      padding: 30
    },
    image:{
      width: 100,
      height: 100,
    }
  });
  

  return (
    <View>
      <TextInput
        value={author}
        onChangeText={text => setAuthor(text)}
        placeholder="Rechercher un auteur"
        style = {{ marginBottom: 30 }}
      />
      <Button onPress={handleSubmit} title="Submit" />
      {loading ? (
        <ActivityIndicator/>
      ) : (
        data && (
          <SafeAreaView style={[styles.container,{ height: "100%", width: "100%"}]}>
            <Text onPress={handleClear} title="Clear" style = {styles.button}>Effacer</Text>
            {data.totalItems != 0 ? (
              <FlatList
                data={data.items}
                renderItem={({ item }) => (
                  <BookItem
                    title={item.volumeInfo.title}
                    publicationYear={item.volumeInfo.publishedDate}
                    description={item.volumeInfo.description}
                    coverImage={item.volumeInfo.imageLinks?.thumbnail}
                    buyLink = {item.volumeInfo.infoLink}
                    // onPress={() => Linking.openURL(item.volumeInfo.infoLink)}
                  />
                )}
                keyExtractor={item => item.id}
              />
            ) : (
              <Text style={{ color: "red", marginTop: 10 }}>L'auteur n'existe pas.</Text>
            )}
          </SafeAreaView>
        )
      )}
    </View>
  );
};

export default AuthorInput;