import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS } from '../../constants/theme'

const ExpenseDetails = () => {
  const params = useSearchParams()
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
          <Text>Hello World {params.id}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )}
export default ExpenseDetails