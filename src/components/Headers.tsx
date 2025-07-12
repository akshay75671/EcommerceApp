import React from 'react'; // Import React
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { useCartStore } from '../store/cartStore';
import { COLORS } from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons'

interface HeaderProps {
  title: string,
  onLeftPress?: () => void | undefined,
  onCartPress?: () => void | undefined
}

const Header = ({ title, onCartPress, onLeftPress } :HeaderProps ) => {
    const { items } = useCartStore(); // Access cart items from store
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <View style={styles.header}>
            {onLeftPress && 
                <TouchableOpacity onPress={() => onLeftPress()} style={styles.headerIcon}>
                    <Ionicons name={'arrow-back'} size={20} color={COLORS.theme}/>
                </TouchableOpacity>
            }
            <Text style={styles.headerTitle}>{title}</Text>
            {onCartPress && 
                <View>
                    <TouchableOpacity onPress={() => onCartPress()} style={styles.headerIcon}>
                        <Ionicons name={'cart'} size={20} color={COLORS.theme}/>
                    </TouchableOpacity>
                    <View style={styles.cartCount}>
                        <Text style={{ fontSize: 10, color:COLORS.white }}>{totalItems}</Text>
                    </View>
                </View>
            }
        </View>
       
    );
}

const styles = StyleSheet.create({
    header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.theme, 
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 10, 
    paddingTop: Platform.OS === 'android' ? 35 : 15,
  },
  headerIcon: {
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 20,
  },
  headerIconText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',

  },
  cartCount:{
    position:'absolute', 
    right: 0, 
    top: 0,
    width:18, 
    height:18, 
    padding:2, 
    backgroundColor:COLORS.lightPink,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center'
  }
})
export default Header