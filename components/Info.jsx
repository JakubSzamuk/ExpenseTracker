import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS } from '../constants/theme'
import { Ionicons } from '@expo/vector-icons';

const InfoCard = ({ text, icon }) => {

  let totalPlaceholderAmount = 0

  const [totalAmount, setTotalAmount] = useState(0)
  const retrieveData = async () => {
    let currentIndex = parseInt(await AsyncStorage.getItem("currentIndex"))
    for (let i = 0; i <= currentIndex; i++) {
      let logExpense = await AsyncStorage.getItem(`expenseObject${i}`)
      if (logExpense) {
        let amount = parseInt(JSON.parse(logExpense).amount)
        let direction = JSON.parse(logExpense).direction
        console.log(amount, direction)
        if (direction == true) {
          totalPlaceholderAmount = totalPlaceholderAmount - amount
        }
        else {
          totalPlaceholderAmount = totalPlaceholderAmount + amount
        }
      }
    }

    setTotalAmount(totalPlaceholderAmount)
  }


  const retrieveNextPaymentData = async () => {
    let currentIndex = parseInt(await AsyncStorage.getItem("currentIndex"))
    for (let i = 1; i <= currentIndex; i++) {
      let logExpense = await AsyncStorage.getItem(`expenseObject${i}`)
      if (logExpense && JSON.parse(logExpense).doRepeat == true) {
        let repeatFrequency = JSON.parse(logExpense).repeat
        console.log(repeatFrequency)
      }
    }
  }





  useEffect(() => {
    if (icon) {
      retrieveNextPaymentData()
    }
    else {
      retrieveData()
    }
  }, [])





  return (
    <View
      style={{
        backgroundColor: COLORS.secondary,
        overflow: 'visible',
        borderRadius: 8,
        height: 300,
        width: "45%",
        padding: 8,
        elevation: 6,
        marginTop: 24
      }}
    >
      <View style={{ alignItems: 'center', width: '100%', flexDirection: 'column', marginTop: 30 }}>
        <Ionicons name={icon ? "trending-up-outline" : "cash-outline"} style={styles.iconStyle(icon)} />
      </View>
      
      <Text style={{ marginLeft: 4, fontSize: 18, color: COLORS.primary, marginTop: 16, fontFamily: "RobotoSlab" }}>{icon ? "Next payment in:" : "Current Savings:"}</Text>

      <View>
        <Text style={{
          fontSize: 40,
          color: COLORS.primary
        }}>{totalAmount}</Text>
      </View>
      
    </View>
  )
}

export default InfoCard

const styles = StyleSheet.create({
  iconStyle: (icon) => ({
    fontSize: icon ? 55 : 60, 
    color: COLORS.primary, 
    padding: 8, 
    backgroundColor: COLORS.background, 
    height: 76, 
    width: 76, 
    borderRadius: 38
  })

})