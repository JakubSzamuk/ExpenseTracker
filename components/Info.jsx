import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

import { COLORS } from '../constants/theme'
import { Ionicons } from '@expo/vector-icons';

const InfoCard = ({ text, icon }) => {
  return (
    <TouchableOpacity
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
        }}>{text}</Text>
      </View>
      
    </TouchableOpacity>
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