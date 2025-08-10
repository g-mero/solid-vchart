import { createSignal } from 'solid-js';
import { createWatch } from 'solid-tiny-utils';
import { PieChart } from '~/components';

export function PlayPieChart(props: { shouldChangeDataSignal: number }) {
  const getData = () =>
    Array.from({ length: 6 }, (_, i) => ({
      type: ['china', 'usa', 'japan', 'germany', 'france', 'uk'][i],
      value: Math.random() * 100,
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
    <PieChart
      data={[
        {
          id: 'id0',
          values: data(),
        },
      ]}
      height={400}
      spec={{
        outerRadius: 0.8,
        valueField: 'value',
        categoryField: 'type',
        title: {
          visible: true,
          text: 'Pie Chart Example',
        },
        legends: {
          visible: true,
          orient: 'left',
        },
        label: {
          visible: true,
        },
        tooltip: {
          mark: {
            content: [
              {
                key: (datum) => `${datum?.type}`,
                value: (datum) => `${datum?.value}%`,
              },
            ],
          },
        },
      }}
      width={800}
    />
  );
}
