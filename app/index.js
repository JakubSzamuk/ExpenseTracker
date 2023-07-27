import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from "../constants/theme"
import InfoCard from '../components/Info';

const Home = () => {
  const router = useRouter()
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.background }}>
      <Stack.Screen 
        style={{
          backgroundColor: COLORS.background
        }}
        options={{
          headerTitle: "Money Manager",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: COLORS.background },
          headerRight: () => (
              <TouchableOpacity>
                <Ionicons style={{ fontSize: 40 }} name="add-outline" />
              </TouchableOpacity>
          )
        }}
      />
      <ScrollView style={{ backgroundColor: COLORS.background }}>
        <View style={{ backgroundColor: COLORS.background }}>
          <InfoCard text={"Hello World"} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )}
export default Home