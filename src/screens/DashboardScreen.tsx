import React from 'react';
import { View, ScrollView } from 'react-native';
import tw from 'twrnc';
import { useDashboardStore } from '../store/useDashboardStore';
import { colors } from '../constants/theme';
import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import PeriodSelector from '../components/PeriodSelector';
import IncomeChart from '../components/IncomeChart';

export default function DashboardScreen() {
  const userName = useDashboardStore(s => s.userName);

  return (
    <View style={[tw`flex-1`, { backgroundColor: colors.bgLight }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-12 pt-4`}
      >
        <Header greeting={`Good morning, ${userName}!`} />
        <BalanceCard />
        <PeriodSelector />
        <IncomeChart />
      </ScrollView>
    </View>
  );
}
