import { createSignal } from 'solid-js';
import { createWatch } from 'solid-tiny-utils';
import { HistogramChart } from '~/components';

export function PlayHistogramChart(props: { shouldChangeDataSignal: number }) {
  const getData = () =>
    Array.from({ length: 50 }, (_, i) => {
      const x0 = -400 + i * 20;
      return {
        x0,
        x1: x0 + 20,
        frequency:
          Math.floor(Math.random() * 100) + (25 - Math.abs(25 - i)) * 50,
      };
    });
  const [data, setData] = createSignal(getData());

  createWatch(
    () => props.shouldChangeDataSignal,
    () => {
      setData(getData());
    },
    { defer: true }
  );

  return (
    <HistogramChart
      data={{
        id: 'id0',
        values: data(),
      }}
      height={400}
      spec={{
        xField: 'x0',
        x2Field: 'x1',
        yField: 'frequency',
        bar: {
          style: {
            stroke: 'white',
            lineWidth: 1,
          },
        },
        title: {
          text: 'Histogram Chart',
        },
        tooltip: {
          visible: true,
          mark: {
            title: {
              key: 'title',
              value: 'frequency',
            },
            content: [
              {
                key: (datum) => `${datum?.x0} - ${datum?.x1}`,
                value: (datum) => `${datum?.frequency}`,
              },
            ],
          },
        },
      }}
      width={800}
    />
  );
}
