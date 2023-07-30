import { EffectEnum } from "../enums/EffectEnum";
import { TargetEnum } from "../enums/TargetEnum";

export interface ActionDelta {
  name: string;
  effect: EffectEnum;
  target: TargetEnum;
  origin: TargetEnum;
  amount: number;
}
