import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { COLORS } from '../../constants/theme'

const ListHome = () => {
  const router = useRouter()
  
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
            >
              <Text>Back</Text>
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.background
          }
        }}
      />
      <ScrollView>
        <View>
          <Text>Test</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ListHome

const styles = StyleSheet.create({})