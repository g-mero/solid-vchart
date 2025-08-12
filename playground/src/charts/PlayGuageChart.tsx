import { createSignal } from 'solid-js';
import { createWatch } from 'solid-tiny-utils';
import { GaugeChart } from '~/components';

export function PlayGaugeChart(props: { shouldChangeDataSignal: number }) {
  const getData = () =>
    Array.from({ length: 1 }, (_, i) => ({
      type: `${i * 2}:00`,
      value: Math.random(),
    }));
  const [data, setData] = createSignal(getData());

  createWatch(
    () => props.shouldChangeDataSignal,
    () => {
      setData(getData());
    },
    { defer: true }
  );

  return (
    <GaugeChart
      data={{
        values: data(),
      }}
      height={400}
      spec={{
        radiusField: 'value',
        categoryField: 'type',
        valueField: 'value',
        outerRadius: 0.8,
        innerRadius: 0.5,
        startAngle: -180,
        endAngle: 0,
      }}
      width={800}
    />
  );
}
