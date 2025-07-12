import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from '../store/cartStore';

// Define your screen parameters
export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { productId: number };
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          // options={({ navigation }) => ({
          //   title: 'Products',
          //   headerRight: () => {
          //     const { items } = useCartStore(); // Access cart items from store
          //     const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

          //     return (
          //       <TouchableOpacity
          //         style={{ marginRight: 15 }}
          //         onPress={() => navigation.navigate('Cart')}
          //       >
          //         <Text style={{ fontSize: 18 }}>🛒 ({totalItems})</Text>
          //       </TouchableOpacity>
          //     );
          //   },
          // })}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={({ route }) => ({
            title: route.params.productId ? 'Product Details' : 'Details',
          })}
        />
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Your Cart' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;