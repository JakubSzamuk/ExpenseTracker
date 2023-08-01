import { View, Text, FlatList, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../constants/theme'
import { Ionicons } from '@expo/vector-icons';
import Expense from './listcomponents/Expense';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const Main = () => {
  let currentArray = []
  const router = useRouter()
  const [expenseArray, setExpenseArray] = useState("")
  const retrieveData = async () => {
    let currentIndex = parseInt(await AsyncStorage.getItem("currentIndex"))
    let count = 0
    for (let i = currentIndex; i >= currentIndex - 3; i -= 1) {
      let currentExpense = await AsyncStorage.getItem(`expenseObject${i}`)
      if (currentExpense != null) {
        currentArray[count] = JSON.parse(currentExpense)
        count++
      }
    }
    setExpenseArray(currentArray)
  }    
  if (expenseArray.length > 0) {
    console.log(expenseArray)
  }

  const [refreshing, setRefreshing] = useState(false)
  

  useEffect(() => {
    retrieveData()
  }, [])    

  return (
    <ScrollView style={{
      backgroundColor: COLORS.secondary,
      elevation: 4,
      shadowColor: COLORS.accent,
      padding: 8,
      borderRadius: 8,
      flexDirection: 'column',
    }}
    refreshControl={
      <RefreshControl onRefresh={retrieveData} refreshing={refreshing} />
    }
    >
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
        }}
          onPress={() => router.push("expenselist")}
        >
          <Text style={{
            color: COLORS.primary,
            fontFamily: "RobotoSlab",
            opacity: .6,
          }}>See all</Text>
        </TouchableOpacity>
      </View>
      {expenseArray.length > 0 && expenseArray[0] != undefined ? (<FlatList 
        ItemSeparatorComponent={() => (
          <View style={{
            height: 8
          }}></View>
        )}
        style={{
          padding: 8,
          minHeight: 40,
        }}
        key={expense => expense.index}
        data={expenseArray}
        renderItem={({ item }) => (
          <Expense direction={item.direction} recipient={item.recipient} amount={item.amount} expenseId={item.index} />
        )}
      />) : (<Text
        style={{
          fontFamily: "RobotoSlab",
          fontSize: 18,
          marginLeft: 8,
          marginTop: 16,
          color: COLORS.primary,
        }}
      >Nothing to show, tap the add button</Text>)}
    </ScrollView>
  )
}

export default Main