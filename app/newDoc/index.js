import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS } from '../../constants/theme'

const AddDoc = () => {
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
        <View
          style={{
            height: "100%",
            backgroundColor: COLORS.background,
            width: "100%",
          }}
        >
          <Text>Hello World</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )}
export default AddDoc