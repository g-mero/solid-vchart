import { createSignal } from 'solid-js';
import { createWatch } from 'solid-tiny-utils';
import { RadarChart } from '~/components';

export function PlayRadarChart(props: { shouldChangeDataSignal: number }) {
  const getData = () =>
    Array.from({ length: 10 }, (_, i) => ({
      key: `key_${i}`,
      value: Math.floor(Math.random() * 100),
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
    <RadarChart
      data={{
        values: data(),
      }}
      height={400}
      spec={{
        categoryField: 'key',
        valueField: 'value',
        area: {
          visible: true, // 展示面积
        },
      }}
      width={800}
    />
  );
}
