import { createSignal } from 'solid-js';
import { createWatch } from 'solid-tiny-utils';
import { LineChart } from '~/components';

export function PlayLineChart(props: { shouldChangeDataSignal: number }) {
  const getData = () =>
    Array.from({ length: 10 }, (_, i) => ({
      time: `${i * 2}:00`,
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
    <LineChart
      data={{
        values: data(),
      }}
      height={400}
      spec={{
        xField: 'time',
        yField: 'value',
      }}
      width={800}
    />
  );
}
