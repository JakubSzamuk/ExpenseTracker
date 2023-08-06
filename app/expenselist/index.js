import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { COLORS } from '../../constants/theme'
import Expense from '../../components/listcomponents/Expense'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';



const ListHome = () => {
  const router = useRouter()
  
  const [expenseArray, setExpenseArray] = useState("")

  let currentArray = []
  const retrieveData = async () => {
    let currentIndex = parseInt(await AsyncStorage.getItem("currentIndex"))
    let count = 0
    for (let i = currentIndex; i > 0; i -= 1) {
      let currentExpense = await AsyncStorage.getItem(`expenseObject${i}`)
      if (currentExpense != null) {
        currentArray[count] = JSON.parse(currentExpense)
        count++
      }
    }
    setExpenseArray(currentArray)
  }    
  useEffect(() => {
    retrieveData()
  }, [])


  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
            >
              <Ionicons name='arrow-back-outline' style={{
                fontSize: 30,
                color: COLORS.secondary
              }} />
            </TouchableOpacity>
          ),
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.background
          }
        }}
      />
      <ScrollView style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.background
      }}>
        <View style={{
          padding: 8,
          alignItems: 'center',
          width: '100%',
          position: 'relative'
        }}>
          <View style={{
            backgroundColor: COLORS.secondary,
            padding: 8,
            width: '98%',
            elevation: 4,
            borderRadius: 4,
            marginTop: 10
          }}>
            <Text style={{
              color: COLORS.primary,
              fontFamily: "RobotoSlab",
              fontSize: 24,
              position: 'absolute',
              left: 8,
              marginTop: 8
            }}>All of your logged expenses:</Text>

            {true ? (<FlatList 
              ItemSeparatorComponent={() => (
                <View style={{
                  height: 8
                }}></View>
              )}
              style={{
                padding: 8,
                minHeight: 40,
                marginTop: 40
              }}
              key={expense => expense.index}
              data={expenseArray}
              renderItem={({ item }) => (
                <Expense direction={item.direction} recipient={item.recipient} amount={item.amount} expenseId={item.index} />
              )}
            />) : (
              <Text style={{
                color: COLORS.primary,
                fontFamily: "RobotoSlab",
                fontSize: 24
              }}>Nothing to show, go back and hit the add button!</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ListHome

const styles = StyleSheet.create({})