import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';




const styles = StyleSheet.create({
  expenseImage: (direction) => ({
    height: 48,
    transform: direction ? [] : [{scaleX: -1}, {scaleY: -1}],
    width: 48,
    padding: 8,
    backgroundColor: COLORS.secondary,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  }),
  expenseIcon: (direction) => ({
    color: COLORS.primary,
    fontSize: 32
  })
})
import { COLORS } from '../../constants/theme';
import { useRouter } from 'expo-router';



const Expense = ({ direction, recipient, amount, expenseId }) => {
  const router = useRouter()
  
  
  return (
    <View style={{
      flexDirection: "column",
      justifyContent: 'center',
      alignItems: 'center'
    }}
    >
      <TouchableOpacity style={{
        elevation: 1,
        shadowColor: "#000",
        backgroundColor: COLORS.tertiary,
        borderRadius: 32.5,
        height: 65,
        width: "100%",
        color: COLORS.text,
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',
      }}
        onPress={() => router.push(`/expenses/${expenseId}`)}
      > 
        <View style={styles.expenseImage(direction)}>
          <Ionicons name="paper-plane-outline" style={styles.expenseIcon(direction)} />
        </View>
        <Text style={{
          marginLeft: 8,
          fontSize: 24,
          color: COLORS.primary,
          fontFamily: "RobotoSlab",
        }}
          numberOfLines={1}
        >
          {recipient ? recipient : "No recipient"}
        </Text>
        <Text style={{
          fontSize: 20,
          color: COLORS.primary,
          fontFamily: "RobotoSlab",
          position: "absolute",
          right: 24,
        }}>
          {direction ? `-£${amount}` :  `+£${amount}`}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Expense
