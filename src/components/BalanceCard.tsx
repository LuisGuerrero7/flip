import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { colors } from '../constants/theme';
import { useDashboardStore } from '../store/useDashboardStore';
import { formatMoney } from '../utils/format';

export default function BalanceCard() {
  const { currency, setCurrency, balance } = useDashboardStore();

  return (
    <View
      style={[
        tw`mx-4 p-4 mb-4 pt-7`,
        { },
      ]}
    >
      <View style={tw`flex-row items-center justify-between`}>
        <Text style={[tw`text-sm font-medium`, { color: colors.textGray, fontSize: 20 }]}>
          Your Active Balance
        </Text>

        <TouchableOpacity
          onPress={() => setCurrency(currency === 'USD' ? 'PEN' : 'USD')}
          style={[
            tw`border rounded-md px-3 py-1`,
            { borderColor: colors.border, backgroundColor: '#d1ddffff', height: 32 },
          ]}
        >
          <Text style={{ color: colors.primary, fontSize: 13, padding: 'auto', margin: 'auto' }}>
            {currency === 'USD' ? 'US Dollar' : 'Soles'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={[
          tw`mt-2 font-bold pt-5`,
          { color: colors.primary, fontSize: 45, lineHeight: 38, alignSelf: 'center' },
        ]}
      >
        {formatMoney(balance, currency)}
      </Text>
    </View>
  );
}
