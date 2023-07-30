import { EffectEnum } from "../enums/EffectEnum";
import { TargetEnum } from "../enums/TargetEnum";
import { ActionDelta } from "../types/ActionDelta";

type InitMove = { name: string; effect: EffectEnum; amount: number };

export class Move {
  name: string;
  effect: EffectEnum;
  amount: number;

  constructor(props: InitMove) {
    this.name = props.name;
    this.effect = props.effect;
    this.amount = props.amount;
  }

  execute({
    target,
    origin,
  }: {
    target: TargetEnum;
    origin: TargetEnum;
  }): ActionDelta {
    return {
      name: this.name,
      effect: this.effect,
      amount: this.amount,
      target,
      origin,
    };
  }
}
