import React from 'react'; // Import React
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Product } from '../types';
import { COLORS } from '../utils/colors';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const cardWidth = (width / 2) - 15; // Roughly half screen width minus padding/margin

// Use React.memo here
const ProductCard = React.memo(({ product, onPress }: ProductCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="contain" />
      <View style={styles.infoContainer}>
        <Text style={styles.productName} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 5,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: cardWidth,
  },
  productImage: {
    width: '90%',
    height: 120,
    marginBottom: 10,
  },
  infoContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
    color: COLORS.theme,
  },
  productPrice: {
    fontSize: 14,
    color: COLORS.lightPink,
    fontWeight: '600',
    textAlign: 'left',
  },
});

export default ProductCard;