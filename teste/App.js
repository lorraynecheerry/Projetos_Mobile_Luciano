
// import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
// import apiLocal from './apiLocal';
// import { useState } from 'react';
//  import React, { useState } from 'react';
// import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// import apiLocal from './apiLocal';

// const SearchBar = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = async () => {
//     try {
//       // Faça uma solicitação para a API do backend com o termo de pesquisa
//       const response = await apiLocal.get(`/ListarClientes`);
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error('Erro ao pesquisar:', error);
//     }
//   };
//   async function handleIdProd(id){
//     alert(id)

//   }

//   return (

//       <View  style={styles.container} >
//       <TextInput 
//         placeholder="Digite sua pesquisa"
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//       />
//       <Button  title="Pesquisar" onPress={handleSearch} />


//       {/* Exibir os resultados da pesquisa */}
//       <FlatList 
//         data={searchResults}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//          <TouchableOpacity onPress={() => handleIdProd(item.id)}><Text>{item.nome}</Text></TouchableOpacity>

//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop:250
//   },
// });


// export default SearchBar;



import React, { useState } from 'react';
import { View, TextInput, Text, ScrollView } from 'react-native';

import apiLocal from './apiLocal';


const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const fetchResults = async (searchQuery) => {
    try {
      const response = await apiLocal.get(`/ListarClientes`);
      setResults(response.data);
    } catch (error) {
      console.error('Erro ao buscar resultados:', error);
    }
  };
  const handleSearch = (text) => {
    setQuery(text);
    fetchResults(text);
  };
  return (
    <ScrollView>

   
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 54, padding: 5 }}
        onChangeText={handleSearch}
        value={query}
        placeholder="Digite sua pesquisa..."
      />
      {results.filter((val) => {
        if (setQuery === '') {
          return val
        } else if (val.nome) {
          return val
        }
      }).map((result, index) => (
      <Text key={index}>{result.nome}</Text>
      ))}

    </View>
    </ScrollView>
  );
};
export default SearchBar;