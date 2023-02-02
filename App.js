import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AuthorInput from './components/inputAuthor'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style = {{ marginBottom: 30 }}>Google Book API :</Text>
      <StatusBar style="auto" />
      <AuthorInput/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'aqua',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
