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
      recipient: "Bank",
      id: 1,
    },
    {
      type: "inbound",
      amount: "20000",
      recipient: "Freelance",
      id: 2,
    },
    {
      type: "outbound",
      amount: "500",
      recipient: "Friend",
      id: 3,
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
      <View style={{
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center'
      }}>
        <Text style={{
          fontFamily: "RobotoSlab",
          fontSize: 30,
          marginLeft: 10,
          color: COLORS.primary,
        }}>
          Recent Expenses:
        </Text>
        <TouchableOpacity style={{
          position: 'absolute',
          right: 8,
          top: '50%',
        }}>
          <Text style={{
            color: COLORS.primary,
            fontFamily: "RobotoSlab",
            opacity: .6,
          }}>See all</Text>
        </TouchableOpacity>
      </View>
      {currentData.length > 0 ? null : (<Text
        style={{
          fontFamily: "RobotoSlab",
          fontSize: 18,
          marginLeft: 8,
          color: COLORS.primary,
        }}
      >Nothing to show, tap the add button</Text>)}
      <FlatList 
        ItemSeparatorComponent={() => (
          <View style={{
            height: 8
          }}></View>
        )}
        style={{
          padding: 8,
          minHeight: 40,
        }}
        data={currentData}
        renderItem={({ item }) => (
          <Expense direction={item.type} recipient={item.recipient} amount={item.amount} expenseId={item.id} />
        )}
      />
    </View>
  )
}

export default Main