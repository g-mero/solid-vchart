import type {
  ChartSpecMap,
  IChartSpec,
  IInitOption,
  VChart,
} from '@visactor/vchart';
import type { Ref } from 'solid-js';

export type VChartType =
  | 'common' // 组合图
  | 'area' // 面积图
  | 'line' // 折线图
  | 'bar' // 柱状图
  | 'bar3d' // 3D 柱状图
  | 'histogram' // 直方图
  | 'histogram3d' // 3D 直方图
  | 'rangeColumn' // 区间柱图
  | 'rangeColumn3d' // 3D 区间柱图
  | 'rangeArea' // 区间面积图
  | 'map' // 地图
  | 'pie' // 饼图
  | 'pie3d' // 3D 饼图
  | 'radar' // 雷达图
  | 'rose' // 玫瑰图
  | 'scatter' // 散点图
  | 'sequence' // 时序图
  | 'circularProgress' // 环形进度条
  | 'linearProgress' // 条形进度条
  | 'wordCloud' // 词云
  | 'wordCloud3d' // 3D 词云
  | 'funnel' // 漏斗图
  | 'funnel3d' // 3D 漏斗图
  | 'waterfall' // 瀑布图
  | 'boxPlot' // 箱型图
  | 'gauge' // 仪表盘
  | 'sankey' // 桑基图
  | 'treemap' // 矩形树图
  | 'sunburst' // 旭日图
  | 'circlePacking' // circlePacking
  | 'heatmap'; // 热力图

type FullChartSpecMap = ChartSpecMap & {
  bar3d: ChartSpecMap['bar'];
  line3d: ChartSpecMap['line'];
  area3d: ChartSpecMap['area'];
  pie3d: ChartSpecMap['pie'];
  funnel3d: ChartSpecMap['funnel'];
  wordCloud3d: ChartSpecMap['wordCloud'];
  boxPlot: ChartSpecMap['boxplot'];
  circularProgress: ChartSpecMap['circleProgress'];
};

export type TypedChartProps<T extends VChartType> = {
  type: T;
  data: (T extends keyof FullChartSpecMap
    ? FullChartSpecMap[T]
    : IChartSpec)['data'];
  spec?: Omit<
    T extends keyof FullChartSpecMap ? FullChartSpecMap[T] : IChartSpec,
    'type' | 'data'
  >;
  options?: IInitOption;
  extraComponents?: (() => void)[];
  ref?: Ref<HTMLCanvasElement | null>;
  refVChart?: (vchartInst: VChart | null) => void;
  width?: number | undefined;
  height?: number | undefined;
};
