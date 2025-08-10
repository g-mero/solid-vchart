import {
  registerAreaChart,
  registerBarChart,
  registerCartesianCrossHair,
  registerDomTooltipHandler,
  registerHistogramChart,
  registerLineChart,
  registerPieChart,
  registerRoseChart,
  registerScatterChart,
  registerTooltip,
} from '@visactor/vchart';
import { createTypedChart } from './BaseChart';

const toolTipAndCrossHair = [
  registerTooltip,
  registerCartesianCrossHair,
  registerDomTooltipHandler,
];

const LineChart = /* #__PURE__ */ createTypedChart('line', [
  registerLineChart,
  ...toolTipAndCrossHair,
]);

const BarChart = /* #__PURE__ */ createTypedChart('bar', [
  registerBarChart,
  ...toolTipAndCrossHair,
]);

const PieChart = /* #__PURE__ */ createTypedChart('pie', [
  registerPieChart,
  ...toolTipAndCrossHair,
]);

const AreaChart = /* #__PURE__ */ createTypedChart('area', [
  registerAreaChart,
  ...toolTipAndCrossHair,
]);

const RoseChart = /* #__PURE__ */ createTypedChart('rose', [
  registerRoseChart,
  ...toolTipAndCrossHair,
]);

const HistogramChart = /* #__PURE__ */ createTypedChart('histogram', [
  registerHistogramChart,
  ...toolTipAndCrossHair,
]);

const ScatterChart = /* #__PURE__ */ createTypedChart('scatter', [
  registerScatterChart,
  ...toolTipAndCrossHair,
]);

export {
  LineChart,
  BarChart,
  PieChart,
  AreaChart,
  RoseChart,
  HistogramChart,
  ScatterChart,
};
