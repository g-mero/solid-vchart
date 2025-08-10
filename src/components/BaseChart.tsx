import { mergeRefs } from '@solid-primitives/refs';
import { type IChartSpec, type ISpec, VChart } from '@visactor/vchart';
import { type Component, createMemo, createSignal } from 'solid-js';
import { createWatch } from 'solid-tiny-utils';
import type { TypedChartProps, VChartType } from '../types';

function BaseChart<T extends VChartType>(props: TypedChartProps<T>) {
  const [refDom, setRefDom] = createSignal<HTMLCanvasElement | null>(null);
  const [chartInst, setChartInst] = createSignal<VChart | null>(null);
  const spec = createMemo(() => {
    const s: IChartSpec = {
      type: props.type,
    };

    return { ...props.spec, ...s, data: props.data } as ISpec;
  });

  createWatch(refDom, (el) => {
    if (!el) {
      return;
    }
    const inst = new VChart(spec(), { renderCanvas: el });
    setChartInst(inst);
    inst.renderSync();
  });

  createWatch(chartInst, (inst) => {
    props.refVChart?.(inst);
  });

  createWatch(
    spec,
    (s) => {
      chartInst()?.updateSpec(s);
    },
    {
      defer: true,
    }
  );

  // register extra components
  createWatch(
    () => [...(props.extraComponents || [])],
    (comps) => {
      // biome-ignore lint/correctness/useHookAtTopLevel: this is not a hook
      VChart.useRegisters(comps);
    }
  );

  return (
    <canvas
      height={props.height}
      ref={mergeRefs(props.ref, setRefDom)}
      width={props.width}
    />
  );
}

export function createTypedChart<T extends VChartType>(
  type: T,
  components: (() => void)[]
): Component<Omit<TypedChartProps<T>, 'type'>> {
  VChart.useRegisters(components);
  return (props) => {
    return <BaseChart {...props} type={type} />;
  };
}
