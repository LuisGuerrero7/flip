import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { colors } from '../constants/theme';

export default function Header({ greeting }: { greeting: string }) {
  return (
    <View style={[tw`flex-row items-center justify-between px-5 mb-2 pt-15`]}>
      <View style={tw`flex-row items-center`}>
        <Image
          source={require('../../assets/image_bg_removed.png')}
          style={{ width: 36, height: 36, borderRadius: 18, marginRight: 10 }}
        />
        <Text style={{ color: colors.textDark, fontSize: 15, fontWeight: '600' }}>
          {greeting}
        </Text>
      </View>
      <TouchableOpacity style={tw`p-2`}>
        <Text style={{ fontSize: 18 }}>🔔</Text>
      </TouchableOpacity>
    </View>
  );
}
