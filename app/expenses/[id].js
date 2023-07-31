import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS } from '../../constants/theme'
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';


const ExpenseDetails = () => {
  const params = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    getInfo()
  }, [])
  const [expenseData, setExpenseData] = useState()
  const getInfo = async () => {
    let data = await AsyncStorage.getItem(`expenseObject${params.id}`)
    if (data != null) {
      setExpenseData(JSON.parse(data))
    }
  }
  console.log(expenseData)
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
          {expenseData ? (
            <View style={{
              backgroundColor: COLORS.background,
              padding: 8
            }}>
              <Text style={{
                color: COLORS.secondary,
                fontFamily: "RobotoSlab",
                fontSize: 32
              }}>{expenseData.title ? expenseData.title : "Untitled"}</Text>
              <View style={{
                flexDirection: 'row',
                position: 'relative',
                alignItems: 'center',
                marginTop: 16,
              }}>
                <Text style={styles.expenseDetail}>{expenseData.date ? expenseData.date : "No specified Date"}</Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'absolute',
                  right: 8
                }}>
                  <View style={styles.expenseImage(expenseData.direction)}>
                    <Ionicons name="paper-plane-outline" style={styles.expenseIcon(expenseData.direction)} />
                  </View>

                  <Text style={styles.expenseDetail}>{expenseData.direction ? "Outbound" : "Inbound"}</Text>
                </View>
              </View>
              <View style={{
                justifyContent: 'center',
                width: '100%',
                flexDirection: 'row',
                marginTop: 16,
                backgroundColor: COLORS.secondary,
                borderRadius: 4,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Text style={{
                  color: COLORS.primary,
                  fontFamily: "RobotoSlab",
                  fontSize: 40,

                }}>{expenseData.direction ? `-${expenseData.amount}` : `+${expenseData.amount}`}</Text>
                <Text style={{
                  fontFamily: "RobotoSlab",
                  color: COLORS.secondary,
                  fontSize: 20,
                  right: 8,
                  top: 56,
                  position: 'absolute',
                  marginLeft: 8
                }}>{expenseData.direction ? "to" : "from"} {expenseData.recipient ? expenseData.recipient : "Unspecified"}</Text>
              </View>
              <View>
                <Text style={{
                  color: COLORS.secondary,
                  fontFamily: "RobotoSlab",
                  fontSize: 18,
                  marginTop: 40,
                }}>{expenseData.details ? expenseData.details : "No details"}</Text>
              </View>
              {expenseData.doRepeat ? (
                <View style={{
                  backgroundColor: COLORS.secondary,
                  padding: 8,
                  borderRadius: 4,
                  marginTop: 20,
                  elevation: 4,
                }}>
                  <Text style={{
                    color: COLORS.primary,
                    fontFamily: "RobotoSlab",
                    fontSize: 24,
                  }}>Repeated payment details:</Text>
                  <Text style={{
                    fontFamily: "RobotoSlab",
                    color: COLORS.primary,
                    fontSize: 20,
                    marginTop: 12,
                  }}>This payment is repeated {expenseData.repeat} </Text>
                  <Text style={{
                    color: COLORS.primary,
                    fontFamily: "RobotoSlab",
                    fontSize: 18,
                    marginTop: 8,
                  }}>The Tax charged on this Amount is {expenseData.taxAmount ? expenseData.taxAmount + "%" : "the standard Tax rate"}</Text>
                </View>
              ) : null}
            </View>
          ) : (
            <Text>Oops Something went wrong</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )}
export default ExpenseDetails

const styles = StyleSheet.create({
  expenseDetail: {
    fontFamily: "RobotoSlab",
    color: COLORS.secondary,
    fontSize: 24
  },
  expenseImage: (direction) => ({
    height: 48,
    transform: direction ? [] : [{scaleX: -1}, {scaleY: -1}],
    width: 48,
    padding: 8,
    backgroundColor: COLORS.secondary,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  }),
  expenseIcon: (direction) => ({
    color: COLORS.primary,
    fontSize: 32
  })
})