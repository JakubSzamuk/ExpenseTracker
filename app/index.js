import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from "../constants/theme"
import InfoCard from '../components/Info';
import Main from '../components/Main';

const Home = () => {
  const router = useRouter()
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.background }}>
      <Stack.Screen 
        style={{
          backgroundColor: COLORS.background,
          overflow: "visible"
        }}
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: COLORS.background },
          headerRight: () => (
              <TouchableOpacity>
                <View style={{
                  height: 56,
                  width: 56, 
                  backgroundColor: COLORS.secondary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 28,
                  elevation: 20
                }}>
                  <Ionicons style={{ fontSize: 50, color: COLORS.text, textAlign: 'center', textAlignVertical: 'center' }} name="add-outline" />
                </View>
              </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity>

            </TouchableOpacity>
          )
        }}
      />
      <ScrollView style={{ backgroundColor: COLORS.background }}>
        <View style={{ backgroundColor: COLORS.background, flexDirection: "row", justifyContent: 'space-evenly' }}>
          <InfoCard />
          <InfoCard />
        </View>
        <View style={{
          marginTop: 40,
          backgroundColor: COLORS.background,
          padding: 8
        }}>
          <Main />
        </View>
      </ScrollView>
    </SafeAreaView>
  )}
export default Home