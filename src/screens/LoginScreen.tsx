import React, { useCallback } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useDashboardStore } from '../store/useDashboardStore';
import { colors } from '../constants/theme';
import { FontAwesome } from '@expo/vector-icons';

export default function LoginScreen() {
  const nav = useNavigation<any>();
  const initSession = useDashboardStore(s => s.initSession);

  const go = useCallback(() => {
    initSession();
    nav.navigate('Dashboard');
  }, [initSession, nav]);


  return (
    <ExpoLinearGradient
      colors={[colors.backgroundGradientTop, colors.backgroundGradientBottom]}
      style={tw`flex-1 items-center justify-center`}
    >
      <Image
        source={require('../../assets/image_bg_removed.png')}
        style={{ width: 420, height: 420, resizeMode: 'contain', marginBottom: 18 }}
      />

      <Text
        style={[
          tw`text-center text-white font-bold px-8`,
          { fontSize: 30, lineHeight: 32 },
        ]}
      >
        Optimize Your Money Management Effortlessly
      </Text>

      {/* Botones */}
      <View style={tw`w-10/12 mt-10`}>
        <TouchableOpacity
          onPress={go}
          style={[
            tw`flex-row items-center justify-center bg-white rounded-full py-3 mb-3`,
            { shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 3 },
          ]}
        >
          <FontAwesome name="apple" size={22} color="black" style={tw`mr-2`} />
          <Text style={[tw`font-semibold text-base`, { color: colors.textDark }]}>
            Continue with Apple
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={go}
          style={[
            tw`flex-row items-center justify-center rounded-full py-3 mb-3`,
            { backgroundColor: colors.primary },
          ]}
        >
          <FontAwesome name="google" size={20} color="white" style={tw`mr-2`} />

          <Text style={[tw`font-semibold text-base text-white`]}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={go}>
          <Text style={[tw`text-center mt-1 font-semibold`, { color: colors.primary }]}>
            Sign up!
          </Text>
        </TouchableOpacity>
      </View>
    </ExpoLinearGradient>
  );
}
