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
    let tempArray = []
    let count = 0
    for (let i = 1; i <= currentIndex; i++) {
      let logExpense = await AsyncStorage.getItem(`expenseObject${i}`)
      if (logExpense && JSON.parse(logExpense).doRepeat == true) {
        let repeatFrequency = JSON.parse(logExpense).repeat
        let repeatDate = JSON.parse(logExpense).date
        
        let repeatAmount = JSON.parse(logExpense).amount
        let save = JSON.parse(logExpense).savedDate

        tempArray[count] = { frequency: repeatFrequency, date: repeatDate, amount: repeatAmount, savedDate: save, origin: i }
        count++
      }
    }
    tempArray = tempArray.sort(function(a, b) {
      a = a.date.split("/").reverse().join("")
      b = b.date.split("/").reverse().join("")

      return a > b ? 1 : -1
    })
    for (let i = 0; i < tempArray.length; i++) {
      let currentTest = tempArray[i]
      
      if (currentTest.frequency == "Daily") {
        let currentDateMoment = new Date()
        let formatMoment = currentDateMoment.getDate() + "/" + (currentDateMoment.getMonth() + 1) + "/" + currentDateMoment.getFullYear()
        let expenseCurrent = await AsyncStorage.getItem(`expenseObject${currentTest.origin}`)
        console.log(expenseCurrent)
        if (!JSON.parse(expenseCurrent).savedDate.includes(formatMoment)) {
          let editExpense = JSON.parse(expenseCurrent).savedDate
          editExpense.push(formatMoment.toString())
          

          let expenseObject = {
            ...JSON.parse(expenseCurrent),
            ...{
              "doRepeat": false,
            }
          }
          console.log(expenseObject)
          let momentaryIndex = parseInt(await AsyncStorage.getItem("currentIndex"))
          await AsyncStorage.setItem(`expenseObject${momentaryIndex + 1}`, JSON.stringify(expenseObject))
          await AsyncStorage.setItem("currentIndex", (momentaryIndex + 1).toString())



          let newVersion = { ...JSON.parse(expenseCurrent), ...{ savedDate: editExpense } }
          await AsyncStorage.setItem(`expenseObject${currentTest.origin}`,  JSON.stringify(newVersion))
        }
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