import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native'
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
              <TouchableOpacity
                onPress={() => router.push("/newDoc")}
              >
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
          headerLeft: () => {
            <Image
              style={{
                height: 50,
                resizeMode: "contain"
              }}
              source={require("../assets/Logo.png")}
            />
          }
        }}
      />
      <ScrollView style={{ backgroundColor: COLORS.background,
        width: '100%',
        height: '100%'
      }}>
        <Text style={{
          fontSize: 38,
          marginLeft: 8,
          fontFamily: "RobotoSlab",
          color: COLORS.secondary
        }}>
          Welcome to your dashboard,
        </Text>
        <View style={{ backgroundColor: COLORS.background, flexDirection: "row", justifyContent: 'space-evenly' }}>
          <InfoCard />
          <InfoCard icon={"inbound"} />
        </View>
        <View style={{
          marginTop: 40,
          backgroundColor: COLORS.background,
          padding: 8
        }}>
          <Main />
          <View>
            <TouchableOpacity>
              <Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )}
export default Home