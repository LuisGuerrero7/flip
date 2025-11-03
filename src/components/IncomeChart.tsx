import React, { useMemo } from 'react';
import { View, Text, Dimensions } from 'react-native';
import tw from 'twrnc';
import { LineChart } from 'react-native-gifted-charts';
import { useDashboardStore, Period } from '../store/useDashboardStore';
import { colors } from '../constants/theme';
import { formatTooltipDate, formatTooltipMoney } from '../utils/format';

type ChartPoint = {
  value: number;
  label: string;
  customData: { date: Date; y: number };
};

const screenW = Dimensions.get('window').width;

function labelFor(period: Period, d: Date, i: number, len: number) {
  switch (period) {
    case '1D': {
      const step = Math.max(3, Math.floor(len / 4));
      if (i % step !== 0) return '';
      const h = d.getHours();
      const ampm = h < 12 ? 'am' : 'pm';
      const hour12 = ((h + 11) % 12) + 1;
      return `${hour12}${ampm}`;
    }
    case '1W': {
      const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return DAYS[d.getDay()];
    }
    case '1M': {
      const day = d.getDate();
      return [ 1, 5,10, 15,20, 25, 30].includes(day) ? String(day) : '';
    }
    case '1Y': {
      const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return MON[d.getMonth()];
    }
    case 'ALL': {
      return i % 2 === 0
        ? d.toLocaleDateString('en-US', { month: 'short' })
        : '';
    }
  }
}

export default function IncomeChart() {
  const { data, period, currency } = useDashboardStore();
  const series = data[period];

  const innerWidth = screenW - 64;

  const chartData: ChartPoint[] = series.map((p, i) => ({
    value: p.y,
    label: labelFor(period, p.x, i, series.length),
    customData: { date: p.x, y: p.y },
  }));

  const total = useMemo(
    () => series.reduce((a, b) => a + b.y, 0),
    [series]
  );

  const initialSpacing = 12;
  const endSpacing = 12;
  const spacing =
    chartData.length > 1
      ? Math.max(
          10,
          (innerWidth - initialSpacing - endSpacing) / (chartData.length - 1)
        )
      : 40;

  return (
    <View
      style={[
        tw`mx-4 mt-5 p-4 `,
      ]}
    >

      <View style={tw`flex-row justify-between items-center mb-2`}>
        <Text style={{ color: colors.textDark, fontSize: 15, fontWeight: '600' }}>
          Income
        </Text>
        <Text style={{ color: colors.textGray, fontSize: 15, fontWeight: '600' }}>
          {formatTooltipMoney(total, currency)}
        </Text>
      </View>

     <LineChart
        data={chartData}
        areaChart
        curved
        height={220}
        width={innerWidth}
        color={colors.accent}
        thickness={2.2}
        startFillColor={colors.accent}
        endFillColor={colors.accent}
        startOpacity={0.18}
        endOpacity={0.02}
        hideDataPoints                              

        backgroundColor="white"
        yAxisThickness={0}
        xAxisThickness={0}
        noOfSections={4}
        rulesType="solid"
        rulesColor="#E2E8F0"
        rulesThickness={0.5}
        yAxisTextStyle={{ color: colors.textGray, fontSize: 10 }}
        xAxisLabelTextStyle={{ color: colors.textGray, fontSize: 11, marginTop: 10}}  
        xAxisLabelsHeight={24}                                                         

        initialSpacing={12}
        endSpacing={12}
        spacing={
          chartData.length > 1
            ? Math.max(10, (innerWidth - 24) / (chartData.length - 1))
            : 40
        }
        showScrollIndicator={false}

        pointerConfig={{
          activatePointersOnLongPress: true,

          pointerStripUptoDataPoint: true,
          pointerStripColor: '#94A3B8',
          pointerStripWidth: 1,

          pointerColor: '#3B82F6',
          radius: 5,

          pointerVanishDelay: 2000,
          autoAdjustPointerLabelPosition: true,
          pointerLabelWidth: 126,
          pointerLabelHeight: 58,

          pointerLabelComponent: (items: any[]) => {
            const d = items?.[0]?.item?.customData;
            if (!d) return null;
            return (
              <View
                style={{
                  backgroundColor: '#E0EAFF',
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#C7D2FE',
                }}
              >
                <Text style={{ color: '#111827', fontSize: 12, fontWeight: '700' }}>
                  {formatTooltipMoney(d.y, currency)}
                </Text>
                <Text style={{ color: '#374151', fontSize: 11, marginTop: 4 }}>
                  {formatTooltipDate(d.date)}
                </Text>
              </View>
            );
          },
        }}
      />

    </View>
  );
}
