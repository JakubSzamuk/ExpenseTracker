import { View, Text, ScrollView, SafeAreaView, TextInput, Switch, FlatList, StyleSheet } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS } from '../../constants/theme'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';



const AddDoc = () => {
  const router = useRouter()

  const [expenseSwitch, setExpenseSwitch] = useState(false)
  
  
  const [amount, setAmount] = useState(0)
  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")
  const [date, setDate] = useState("")
  const [taxAmount, setTaxAmount] = useState("")
  const [recipientText, setRecipientText] = useState("")

  const handleStandard = (frequency) => {
    switch (frequency) {
      case "Daily":
        return 365
      case "Weekly":
        return 52
      case "Monthly":
        return 12
      case "Yearly":
        return 1
    }
  }
  const handleTaxCalc = (amount) => {
    let final = 0
    if (amount > 12570 && amount <= 50270) {
      final = 12570 + (((amount - 12570) * 0.8) - ((amount - 12570) * 0.12))
      return final
    }
    else if (amount > 50270 && amount <= 125140) {
      final = 38206 + ((amount - 50270) * 0.6 - ((amount - 12570) * 0.02))
    }
    else if (amount > 125140) {
      final = 76603 + ((amount - 125140) * 0.55 - ((amount - 12570) * 0.02))
    }
    else {
      final = amount
    }
    return Math.floor(final)
  }
  
  
  const handleSubmit = () => {
    let actualAmount = amount

    if (repeated) {
      if (taxToggle && !standardToggle) {
        actualAmount = (amount - (amount * (taxAmount / 100)))
      }
      else if (taxToggle && standardToggle) {
        actualAmount =  Math.floor(handleTaxCalc(amount * handleStandard(repeatSelect)) / handleStandard(repeatSelect))
      }
    }
    

    sendData(actualAmount)

    console.log(actualAmount)
  }

  const sendData = async (actualMoney) => {


    try {
      let index
      try {
        index = await AsyncStorage.getItem("currentIndex")
      } catch {
        console.log("oops")
      }
      let currentIndex
      if (index) {
        currentIndex = parseInt(index) + 1
        await AsyncStorage.setItem("currentIndex", currentIndex.toString())
      }
      else {
        currentIndex = 1
        await AsyncStorage.setItem("currentIndex", currentIndex.toString())
      }

      let expenseObject = {
        "recipient": recipientText,
        "direction": expenseSwitch,
        "title": title,
        "details": details,
        "date": date,
        "amount": actualMoney,
        "doRepeat": repeated,
        "repeat": repeatSelect,
        "index": currentIndex,
        "taxAmount": taxAmount,
      }
  
      await AsyncStorage.setItem(`expenseObject${currentIndex}`, JSON.stringify(expenseObject))
      router.push("/")
      
    } catch (e) {
      console.log("oops")
      do {
        index = await AsyncStorage.getItem("currentIndex")
        let current = await AsyncStorage.getItem(`expenseObject${index}`)
        if (!current) {
          await AsyncStorage.setItem("currentIndex" , index - 1)
        }
      } while (!current)
      
    }
    
    
    
  }
  
  const [repeated, setRepeated] = useState(false)
  const [repeatSelect, setRepeatSelect] = useState("Daily")
  const [taxToggle, setTaxToggle] = useState(false)
  const [standardToggle, setStandardToggle] = useState(false)
  
  const frequency = [
    "Daily",
    "Weekly",
    "Monthly",
    "Yearly"
  ]

  const retrieveObjects = async () => {
    let currentIndex = (await AsyncStorage.getItem("currentIndex"))
    for (let i = 1; i <= currentIndex; i-=-1) {
      let currentExpense = await AsyncStorage.getItem(`expenseObject${i}`)
      console.log(currentExpense)
    }
    console.log(currentIndex)
  }
  const deleteObjects = async () => {
    await AsyncStorage.clear()
  }
  return (
    <SafeAreaView style={{
      backgroundColor: COLORS.background
    }}>
      <Stack.Screen 
        options={{
          headerTitle: "Log an expense",
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
          headerShadowVisible: false,
          headerTitleStyle: {
            color: COLORS.secondary,
            fontFamily: "RobotoSlab",
            fontSize: 34
          },
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTitleAlign: 'center'
        }}
      />
      <ScrollView>
        <View
          style={{
            height: "100%",
            backgroundColor: COLORS.background,
            width: "100%",
            marginTop: 20
          }}
        >

          <View style={
            {
              backgroundColor: COLORS.secondary,
              width: '90%',
              marginLeft: 8,
              marginBottom: 16,
              minHeight: 48,
              padding: 8,
              justifyContent: 'center'
            }
          }>
            <View style={{
              alignItems: 'center',
              flexDirection: 'row',
              position: 'relative',
              borderRadius: 2,
              width: '100%',
            }}>
              <Text style={{
                fontFamily: "RobotoSlab",
                color: COLORS.primary,
                marginLeft: 8
              }}>Repeated Expense?</Text>
              <Switch style={{
                position: 'absolute',
                right: 8
              }} 
                onValueChange={() => setRepeated(!repeated)}
                value={repeated}
              />
            </View>
            {repeated && (
              <View style={{
                width: "100%"
              }}>
                <Text style={{
                  fontFamily: "RobotoSlab",
                  color: COLORS.primary,
                  marginTop: 16,
                  marginLeft: 8
                }}>How often does this expense apply?</Text>
                <FlatList
                  data={frequency}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.navigateButton(repeatSelect, item)} onPress={() => setRepeatSelect(item)}>
                      <Text style={styles.buttonText(repeatSelect, item)}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={{
                      width: 8
                    }}></View>
                  )}
                  horizontal
                />
                <View style={{
                  position: 'relative',
                  alignItems: 'center',
                  marginTop: 16,
                  flexDirection: 'row'
                }}>
                  <Text style={{
                    fontFamily: "RobotoSlab",
                    color: COLORS.primary,
                    marginLeft: 8,
                  }}>Is there any tax?</Text>
                  <Switch style={{
                    position: 'absolute',
                    right: 8
                  }}
                    value={taxToggle}
                    onValueChange={() => setTaxToggle(!taxToggle)}
                  />
                </View>
                <View style={[styles.taxInput(taxToggle), {
                  position: 'relative',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: 16,
                  width: "100%"
                  
                }]}>
                  <TextInput
                    style={[styles.taxInput(taxToggle, standardToggle), {
                      width: "38%",
                      backgroundColor: COLORS.tertiary,
                      padding: 8,
                    }]}
                    editable={taxToggle && !standardToggle}
                    autoFocus={taxToggle}
                    inputMode='decimal'
                    placeholder='Percentage Tax'
                    value={taxToggle ? standardToggle ? "N/A" : taxAmount : "0"}
                    onChangeText={(text) => setTaxAmount(text)}
                  />
                  <View style={{
                      position: 'absolute',
                      right: 0,
                      flexDirection: 'row',
                    }}>
                    <Text style={{
                      width: 150,
                      marginLeft: 4,
                      color: COLORS.primary,
                      fontFamily: "RobotoSlab"
                    }}>Would you like to use *standard UK Wage tax rates?</Text>
                    <Switch editable={taxToggle} value={standardToggle} onValueChange={() => setStandardToggle(!standardToggle)} />
                  </View>
                </View>
                  {standardToggle && (<Text style={{
                    color: COLORS.primary,
                    fontFamily: "RobotoSlab",
                    marginTop: 16
                  }}>*Please bear in mind that this is a rough estimate, taxes vary, and the calculator does not take into account unpaid days, and can be slightly incorrect even if Yearly payment is selected</Text>)}
              </View>
            )}
          </View>
          
          <View>
            <TextInput style={{
              backgroundColor: COLORS.secondary,
              elevation: 4,
              color: COLORS.primary,
              marginLeft: 8,
              fontFamily: "RobotoSlab",
              width: "90%",
              padding: 8,
              color: COLORS.primary,
              borderRadius: 2,
            }} 
              value={recipientText}
              onChangeText={(text) => setRecipientText(text)}
              placeholder={!expenseSwitch ? 'Sender' : 'Recipient'}
            />
            <View style={{
              alignItems: 'center',
              flexDirection: 'row',
              width: "90%",
              marginLeft: 8,
              borderRadius: 2,
              backgroundColor: COLORS.secondary,
              marginTop: 8
            }}>
              <Switch onValueChange={() => setExpenseSwitch(!expenseSwitch)} value={expenseSwitch} />
              <Text style={{
                fontFamily: "RobotoSlab",
                fontSize: 18,
                marginLeft: 8,
                color: COLORS.primary
              }}>{expenseSwitch == true ? "Outbound" : "Inbound"}</Text>
            </View>
            <Text style={{
              fontFamily: "RobotoSlab",
              fontSize: 28,
              marginLeft: 8,
              color: COLORS.secondary
            }}>Amount</Text>
            <TextInput onChangeText={(text) => setAmount(text)} style={{
              backgroundColor: COLORS.secondary,
              elevation: 4,
              color: COLORS.primary,
              marginLeft: 8,
              fontFamily: "RobotoSlab",
              width: "90%",
              padding: 8,
              color: COLORS.primary,
              borderRadius: 2,
            }} 
              inputMode='decimal'
              placeholder='Amount'
            />
            <Text style={{
              fontFamily: "RobotoSlab",
              fontSize: 28,
              marginTop: 40,
              marginLeft: 8,
              marginBottom: 4,
              color: COLORS.secondary
            }}>Expense Details</Text>
            <View style={{
              borderRadius: 2,
              width: "90%",
              elevation: 4,
              backgroundColor: COLORS.secondary,
              marginLeft: 8,
            }}>
              <TextInput style={{
                color: COLORS.primary,
                fontFamily: "RobotoSlab",
                width: "100%",
                padding: 8,
                color: COLORS.primary,
              }} 


                onChangeText={(text) => setTitle(text)}
                placeholder='Title'
              />
              <View style={{
                justifyContent:'center',
                alignItems: 'center',
              }}>
                <View style={{
                  width: '80%',
                  height: 2,
                  backgroundColor: COLORS.tertiary
                }}></View>
              </View>
              <TextInput style={{
                color: COLORS.primary,
                fontFamily: "RobotoSlab",
                width: "100%",
                padding: 8,
                height: 84,
                textAlignVertical: 'top',
                color: COLORS.primary,
              }} 
                onChangeText={(text) => setDetails(text)}
                multiline={true}
                placeholder='Details'
              />
              <View style={{
                justifyContent:'center',
                alignItems: 'center',
              }}>
                <View style={{
                  width: '80%',
                  height: 2,
                  backgroundColor: COLORS.tertiary
                }}></View>
              </View>

              <TextInput style={{
                color: COLORS.primary,
                fontFamily: "RobotoSlab",
                width: "100%",
                padding: 8,
                color: COLORS.primary,
              }} 
                onChangeText={(text) => setDate(text)}
                placeholder='Date'
              />


            </View>
            <View style={{
              width: "100%",
              alignItems: 'center',
              marginTop: 24
            }}>
              <TouchableOpacity style={{
                padding: 8,
                backgroundColor: COLORS.secondary,
                paddingHorizontal: 24,
                borderRadius: 4,
              }}
                onPress={handleSubmit}
              >
                <Text style={{
                  color: COLORS.primary,
                  fontFamily: "RobotoSlab",
                  fontSize: 24
                }}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={retrieveObjects}>
                <Text>Retrieve</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteObjects}>
                <Text>Delete</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )}
export default AddDoc

const styles = StyleSheet.create({
  navigateButton: (repeatSelect, item) => ({
    padding: 12,
    backgroundColor: repeatSelect === item ? COLORS.primary : COLORS.tertiary,
    borderRadius: 6,
    marginTop: 12
  }),
  buttonText: (repeatSelect, item) => ({
    fontSize: 18,
    color: repeatSelect === item ? COLORS.Text : COLORS.primary,
  }),
  taxInput: (taxToggle, standardToggle) => ({
    opacity: taxToggle ? standardToggle ? .2 : 1 : .2,
    color: COLORS.primary,
    fontFamily: "RobotoSlab",
  })
})