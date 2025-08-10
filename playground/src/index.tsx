import { App } from './App';
import './style.css';
import 'uno.css';

import { VChart } from '@visactor/vchart';
import { allThemeMap } from '@visactor/vchart-theme';
import { JigeProvider } from 'jige-ui';
import { render } from 'solid-js/web';

// register themes
allThemeMap.forEach((theme, name) => {
  VChart.ThemeManager.registerTheme(name, theme);
});

const getDom = () => {
  const el = document.getElementById('app');
  if (!el) {
    throw new Error('Failed to find the app element');
  }
  return el;
};

render(
  () => (
    <JigeProvider>
      <App />
    </JigeProvider>
  ),
  getDom()
);
