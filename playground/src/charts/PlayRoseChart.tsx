import { createSignal } from 'solid-js';
import { createWatch } from 'solid-tiny-utils';
import { RoseChart } from '~/components';

export function PlayRoseChart(props: { shouldChangeDataSignal: number }) {
  const getData = (type: string) =>
    Array.from({ length: 6 }, (_, i) => ({
      time: `${i * 2}:00`,
      value: Math.floor(Math.random() * 100),
      type,
    }));
  const [data, setData] = createSignal([
    ...getData('count'),
    ...getData('sales'),
  ]);

  createWatch(
    () => props.shouldChangeDataSignal,
    () => {
      setData([...getData('count'), ...getData('sales')]);
    },
    { defer: true }
  );

  return (
    <RoseChart
      data={{
        id: 'id0',
        values: data(),
      }}
      height={400}
      spec={{
        categoryField: ['time', 'type'],
        valueField: 'value',
        seriesField: 'type',
        outerRadius: 0.9,
        axes: [
          {
            orient: 'angle',
            domainLine: { visible: true },
            grid: { visible: true, alignWithLabel: false },
            label: {
              visible: true,
            },
          },
          {
            orient: 'radius',
            grid: { visible: true, smooth: true },
          },
        ],
        crosshair: {
          categoryField: {
            visible: true,
            line: {
              type: 'rect',
            },
          },
        },
      }}
      width={800}
    />
  );
}
