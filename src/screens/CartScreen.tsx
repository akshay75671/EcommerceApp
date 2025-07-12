import React, { useCallback } from 'react'; // Import useCallback
import { View, Text, FlatList, StyleSheet, Button, Alert, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useCartStore } from '../store/cartStore';
import CartItemComponent from '../components/CartItem'; // Already memoized earlier
import Header from '../components/Headers';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../utils/colors';

type ProductDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Cart'>;

const { height } = Dimensions.get('window');
const CartScreen = ({ navigation }: ProductDetailScreenProps) => {
  const cartItems = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);
  
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const handleGoBack = () => {
    navigation.goBack()
  }

  const renderCartItem = useCallback(({ item }: { item: any }) => (
    <CartItemComponent
      item={item}
      onRemove={() => removeItem(item.id)}
      onIncrease={() => increaseQuantity(item.id)}
      onDecrease={() => decreaseQuantity(item.id)}
    />
  ), [removeItem, increaseQuantity, decreaseQuantity]); 

  return (
    <View style={styles.container}>
      <Header 
          title=''
          onLeftPress={handleGoBack}
          // onCartPress={handleCart}
      />

      {cartItems.length === 0 ? (
        <View style={{ justifyContent:'center', alignItems:'center', marginTop: height * 0.25}}>
          <Image source={require('../Assets/cartEmpty1.png')} style={styles.emptyCart}/>
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem} 
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
          />
    
          <SafeAreaView style={[styles.summaryContainer, { paddingTop: -25 }]}>
            <View style={styles.bottomActions}>
              <Text style={styles.totalText}>${totalPrice.toFixed(2)}</Text>
      
              <TouchableOpacity style={styles.addToCartButton} onPress={() => {}}>
                <Text style={styles.addToCartButtonText}>Proceed to Checkout</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  emptyCart:{
    width: 200,
    height:200,
    resizeMode: 'contain'
  },
  emptyCartText: {
    textAlign: 'center',
    // marginTop: 50,
    fontSize: 18,
    color: COLORS.darkGray,
  },
  listContent: {
    paddingBottom: 150,
    paddingHorizontal: 10
  },
  summaryContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderColor: COLORS.gray,
    paddingVertical: 10, 
    paddingHorizontal: 10,
    shadowColor:COLORS.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8, // Android shadow
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  clearCartButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#dc3545',
    borderRadius: 5,
  },
  clearCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addToCartButton: {
    backgroundColor: '#86BB5A', // Green button color
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: 'row', // For icon and text
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5, 
  },
});

export default CartScreen;