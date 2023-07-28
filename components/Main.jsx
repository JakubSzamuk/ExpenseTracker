import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'
import { Ionicons } from '@expo/vector-icons';
import Expense from './listcomponents/Expense';
import { LinearGradient } from 'expo-linear-gradient';

const Main = () => {


  const currentData = [
    {
      type: "outbound",
      amount: "50",
      recipient: "Bank"
    },
    {
      type: "inbound",
      amount: "20000",
      recipient: "Freelance"
    },
    {
      type: "outbound",
      amount: "500",
      recipient: "Friend"
    }
]

  return (
    <View style={{
      backgroundColor: COLORS.secondary,
      elevation: 4,
      shadowColor: COLORS.accent,
      padding: 8,
      borderRadius: 8,
      flexDirection: 'column',
    }}>
      <Text style={{
        fontFamily: "RobotoSlab",
        fontSize: 30,
        marginLeft: 10,
        color: COLORS.text,
      }}>
        Recent Expenses:
      </Text>
      <FlatList 
        ItemSeparatorComponent={() => (
          <View style={{
            height: 8
          }}></View>
        )}
        style={{
          padding: 8
        }}
        data={currentData}
        renderItem={({ item }) => (
          <Expense direction={item.type} recipient={item.recipient} amount={item.amount} />
        )}
        
      />

    </View>
  )
}

export default Main