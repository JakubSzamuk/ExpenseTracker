import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { COLORS } from '../constants/theme'
import { Ionicons } from '@expo/vector-icons';

const InfoCard = ({ text }) => {
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
        <Ionicons name="cash-outline" style={{ fontSize: 60, color: COLORS.primary, padding: 8, backgroundColor: COLORS.background, height: 76, width: 76, borderRadius: 38 }} />
      </View>
      
      <Text style={{ marginLeft: 4, fontSize: 20, color: COLORS.text }}>Current Savings:</Text>

      <View>
        <Text style={{
          fontSize: 40,
          color: COLORS.text
        }}>{text}</Text>
      </View>
      
    </TouchableOpacity>
  )
}

export default InfoCard