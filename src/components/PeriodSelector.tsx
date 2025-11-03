import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';
import { useDashboardStore, Period } from '../store/useDashboardStore';
import { PERIOD_LABELS } from '../utils/mock';
import { colors } from '../constants/theme';

const PERIODS: Period[] = ['1D', '1W', '1M', '1Y', 'ALL'];

export default function PeriodSelector() {
  const { period, setPeriod } = useDashboardStore();

  return (
    <View style={tw`flex-row items-center justify-around mx-4 mt-2`}>
      {PERIODS.map(p => {
        const active = period === p;
        return (
          <TouchableOpacity
            key={p}
            onPress={() => setPeriod(p)}
            style={[
              tw`px-3 py-1.5 rounded-lg`,
              {
                borderWidth: 1,
                borderColor: active ? colors.primary : colors.border,
                backgroundColor: active ? colors.primary : 'white',
              },
            ]}
          >
            <Text
              style={{
                color: active ? 'white' : colors.textDark,
                fontWeight: '600',
                fontSize: 13,
              }}
            >
              {PERIOD_LABELS[p]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
