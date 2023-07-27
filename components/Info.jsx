import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { COLORS } from '../constants/theme'
import { Ionicons } from '@expo/vector-icons';

const InfoCard = ({ text }) => {
  return (
    <TouchableOpacity
      style={{ 
        backgroundColor: "rgba(0, 0, 0, .1)",
        overflow: 'visible',
        borderRadius: 8,
        height: 300,
        width: "45%",
        padding: 8,
        elevation: 1
      }}
    >
      <View style={{ alignItems: 'center', width: '100%', flexDirection: 'column', marginTop: 30 }}>
        <Ionicons name="cash-outline" style={{ fontSize: 60, color: COLORS.primary }} />
      </View>
      <Text style={{ marginLeft: 4, fontSize: 20 }}>Current Savings:</Text>
    </TouchableOpacity>
  )
}

export default InfoCard