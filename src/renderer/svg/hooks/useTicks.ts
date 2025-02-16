import { computed, type Ref } from "vue";
import { roundTo } from "../../../utils/math";

export interface Tick {
  offset: number;
  label: number;
}

export default function useTicks(
  start: Ref<number>,
  length: Ref<number>,
  precision: Ref<number>
) {
  const ticks = computed(() => {
    const ticks = [];

    let nearestStart = roundTo(-start.value, precision.value);

    for (let i = 0, offset = 0; offset < length.value; i++) {
      offset = i * precision.value + nearestStart + start.value;

      ticks.push({
        offset,
        label: nearestStart + i * precision.value,
      });
    }

    return ticks;
  });

  return ticks;
}
