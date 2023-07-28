import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';




const styles = StyleSheet.create({
  expenseImage: (direction) => ({
    height: 48,
    transform: direction == "inbound" ? [{scaleX: -1}, {scaleY: -1}] : [],
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



const Expense = ({ direction, recipient, amount }) => {
  return (
    <View style={{
      flexDirection: "column",
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <TouchableOpacity style={{
        elevation: 4,
        backgroundColor: COLORS.background,
        borderRadius: 32.5,
        height: 65,
        width: "100%",
        color: COLORS.text,
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',
      }}> 
        <View style={styles.expenseImage(direction)}>
          <Ionicons name="paper-plane-outline" style={styles.expenseIcon(direction)} />
        </View>
        <Text style={{
          marginLeft: 8,
          fontSize: 24,
          color: COLORS.secondary,
          fontFamily: "RobotoSlab"
        }}>
          {recipient}
        </Text>
        <Text style={{
          fontSize: 20,
          color: COLORS.secondary,
          fontFamily: "RobotoSlab",
          position: "absolute",
          right: 24,
        }}>
          {direction == "inbound" ? `+£${amount}` : `-£${amount}`}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Expense
