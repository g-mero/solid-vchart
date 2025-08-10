import { VChart } from '@visactor/vchart';
import { allThemeMap } from '@visactor/vchart-theme';
import { Button, ComboBox } from 'jige-ui';
import { createSignal, Match, Switch } from 'solid-js';
import { createWatch } from 'solid-tiny-utils';
import type { VChartType } from '~/types';
import { PlayAreaChart } from './charts/PlayAreaChart';
import { PlayBarChart } from './charts/PlayBarChart';
import { PlayHistogramChart } from './charts/PlayHistogramChart';
import { PlayLineChart } from './charts/PlayLineChart';
import { PlayPieChart } from './charts/PlayPieChart';
import { PlayRoseChart } from './charts/PlayRoseChart';
import { PlayScatterChart } from './charts/PlayScatterChart';

export function App() {
  const [type, setType] = createSignal<VChartType>('line');
  const [theme, setTheme] = createSignal<string>('light');
  const [changeDataSignal, setChangeDataSignal] = createSignal(0);

  createWatch(theme, (t) => {
    VChart.ThemeManager.setCurrentTheme(t);
  });

  return (
    <div class="flex flex-col">
      <div class="mb-1 flex gap-1">
        <ComboBox
          onChange={setType}
          options={[
            { label: 'Line Chart', value: 'line' },
            { label: 'Bar Chart', value: 'bar' },
            { label: 'Pie Chart', value: 'pie' },
            { label: 'Area Chart', value: 'area' },
            { label: 'Rose Chart', value: 'rose' },
            { label: 'Histogram Chart', value: 'histogram' },
            { label: 'Scatter Chart', value: 'scatter' },
          ]}
          size="small"
          style={{
            width: '120px',
          }}
          value={type()}
        />
        <Button
          label="change data"
          onClick={() => {
            setChangeDataSignal(changeDataSignal() + 1);
          }}
          size="small"
        />
        <ComboBox
          onChange={setTheme}
          options={['light', 'dark', ...allThemeMap.keys()]}
          size="small"
          style={{
            width: '150px',
          }}
          value={theme()}
        />
      </div>
      <Switch
        fallback={<PlayLineChart shouldChangeDataSignal={changeDataSignal()} />}
      >
        <Match when={type() === 'bar'}>
          <PlayBarChart shouldChangeDataSignal={changeDataSignal()} />
        </Match>
        <Match when={type() === 'pie'}>
          <PlayPieChart shouldChangeDataSignal={changeDataSignal()} />
        </Match>
        <Match when={type() === 'area'}>
          <PlayAreaChart shouldChangeDataSignal={changeDataSignal()} />
        </Match>
        <Match when={type() === 'histogram'}>
          <PlayHistogramChart shouldChangeDataSignal={changeDataSignal()} />
        </Match>
        <Match when={type() === 'rose'}>
          <PlayRoseChart shouldChangeDataSignal={changeDataSignal()} />
        </Match>
        <Match when={type() === 'scatter'}>
          <PlayScatterChart shouldChangeDataSignal={changeDataSignal()} />
        </Match>
      </Switch>
    </div>
  );
}
