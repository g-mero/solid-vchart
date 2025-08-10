import { createSignal } from 'solid-js';
import { createWatch } from 'solid-tiny-utils';
import { ScatterChart } from '~/components';

export function PlayScatterChart(props: { shouldChangeDataSignal: number }) {
  const getData = () =>
    Array.from({ length: 50 }, (_, i) => ({
      x: i * 5,
      y: Math.floor(Math.random() * 100),
      type: `user_${i}`,
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
    <ScatterChart
      data={{
        id: 'id0',
        values: data(),
      }}
      height={400}
      spec={{
        xField: 'x',
        yField: 'y',
        seriesField: 'type',
        point: {
          style: {
            size: 10,
          },
        },
      }}
      width={800}
    />
  );
}
