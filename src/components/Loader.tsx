import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../utils/colors';

const Loader = () => {
    return (
        <View style={styles.centered}>
            <ActivityIndicator size="large" color={COLORS.theme} />
            <Text>Loading products...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default Loader