import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Dimensions, StatusBar, Platform } from 'react-native';
import { NativeStackScreenProps  } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { fetchProducts } from '../API/productApi';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Headers';
import { useFocusEffect } from '@react-navigation/native'; // <-- Import this
import { COLORS } from '../utils/colors';
import Loader from '../components/Loader';

type ProductListScreenProps = NativeStackScreenProps <RootStackParamList, 'ProductList'>;

const { width } = Dimensions.get('window');
const numColumns = 2;

const ProductListScreen = ({ navigation }: ProductListScreenProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleCart = () => {
    navigation.navigate('Cart');
  }
  // Memoize the render function for FlatList
  const renderProduct = useCallback(({ item }: { item: Product }) => (
    <ProductCard product={item} onPress={() => navigation.navigate('ProductDetail', { productId: item.id })} />
  ), [navigation]); // `navigation` dependency ensures it's only recreated if navigation object changes (rare)

  if (loading) {
    return (
      <Loader />
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <Header 
            title='Product List'
            // onLeftPress={handleGoBack}
            onCartPress={handleCart}
        />
        <SearchBar
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
        />
        {filteredProducts.length === 0 && (
            <Text style={styles.noResultsText}>No products found for your search.</Text>
        )}
        <FlatList
            data={filteredProducts}
            renderItem={renderProduct} // Use the memoized renderProduct
            keyExtractor={(item) => item.id.toString()}
            numColumns={numColumns}
            contentContainerStyle={styles.listContainer}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 5,
    paddingBottom: 50
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  }
});

export default ProductListScreen;

