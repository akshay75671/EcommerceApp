import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator'; 
import { fetchProductById } from '../API/productApi'; 
import { Product } from '../types'; 
import { useCartStore } from '../store/cartStore'; 

import Header from '../components/Headers';
import { COLORS } from '../utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import Loader from '../components/Loader';

type ProductDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }: ProductDetailScreenProps) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1); 

  const addItemToCart = useCartStore((state) => state.addItem);
  const cartItemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const data = await fetchProductById(productId);
      
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getProductDetails();
  }, [productId]);

  const handleAddToCart = useCallback(() => {
    if (product) {
     
      for (let i = 0; i < quantity; i++) {
        addItemToCart(product);
      }
     
    }
  }, [product, quantity, addItemToCart]);

  const increaseQuantity = useCallback(() => setQuantity((prev) => prev + 1), []);
  const decreaseQuantity = useCallback(() => setQuantity((prev) => Math.max(1, prev - 1)), []); 

  const handleCart = () => {
    navigation.navigate('Cart');
  }

  const handleGoBack = () => {
    navigation.goBack()
  }

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
    <View style={styles.fullScreenContainer}>
      {/* Custom Header */}
      <Header 
          title='Product Detail'
          onLeftPress={handleGoBack}
          onCartPress={handleCart}
      />
      {!product ?  (
          <View style={styles.centered}>
            <Image source={require('../Assets/ProductNotFound.png')} style={styles.noProductImage}/>
            <Text style={styles.emptyText}>Product not found.</Text>
          </View>
        )
        : 
        <View style={styles.container}>
          <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: product?.image }} style={styles.productImage} resizeMode="contain" />
            </View>

            <View style={styles.detailsCard}>
              <Text style={styles.productTitle}>{product?.title}</Text>
          
              <View style={styles.priceRow}>
                <Text style={styles.priceCurrency}>$</Text>
                <Text style={styles.priceInteger}>{product?.price?.toFixed(2).split('.')[0]}</Text>
                <Text style={styles.priceSeparator}>.</Text>
                <Text style={styles.priceDecimal}>{product?.price?.toFixed(2).split('.')[1]}</Text>
                <View style={styles.deliveryTag}>
                  <Text style={styles.starIcon}>⭐</Text>
                <Text style={styles.productRating}>{product?.rating?.rate?.toFixed(1)} Rating</Text>
                </View>

              </View>

              <Text style={styles.guaranteeText}>
                {product?.description}
              </Text>
            </View>
          </ScrollView>
          <SafeAreaView style={[styles.fixedBottomBar, { paddingTop: -25 }]}>
            <View style={styles.bottomActions}>
              <View style={styles.quantitySelector}>
                <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
                <Text style={styles.addToCartButtonText}>Add to cart</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      }

      
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.white
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
  noProductImage:{
    width: 200,
    height:200,
    resizeMode: 'contain'
  },
  emptyText:{
    textAlign: 'center',
    // marginTop: 50,
    fontSize: 18,
    color: COLORS.darkGray,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    position: 'relative', 
  },
  productImage: {
    width: width * 0.7, 
    height: width * 0.7,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
    marginTop: -20, 
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productWeight: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  productQuantityLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 15,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  priceCurrency: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2A5D37', 
    marginRight: 2,
  },
  priceInteger: {
    fontSize: 32, 
    fontWeight: 'bold',
    color: '#2A5D37',
  },
  priceSeparator: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2A5D37',
    marginHorizontal: 1,
  },
  priceDecimal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2A5D37',
  },
  deliveryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F6EF', 
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 'auto', 
  },
  deliveryIcon: {
    fontSize: 16,
    marginRight: 5,
    color: '#2A5D37',
  },
  deliveryText: {
    fontSize: 12,
    color: '#2A5D37',
    fontWeight: 'bold',
  },
  attributeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  colorSwatch: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto', 
  },
  starIcon: {
    fontSize: 12,
    marginRight: 5,
  },
  productRating: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
  guaranteeText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 100,
  },
  readMoreText: {
    color: '#007bff', 
    fontWeight: 'bold',
  },
  bottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    overflow: 'hidden',
  },
  quantityButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#86BB5A', 
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: 'row', 
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5, 
  },
  fixedBottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderColor: COLORS.gray,
    paddingVertical: 10, 
    paddingHorizontal: 20,
    shadowColor:COLORS.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8, // Android shadow
  },
});

export default ProductDetailScreen;