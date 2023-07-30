import { ClassNameEnum } from "../enums/ClassNameEnum";
import { EffectEnum } from "../enums/EffectEnum";
import { ActionDelta } from "../types/ActionDelta";
import { Move } from "./Move";

export interface InitFighter {
  // Health Mechanics
  currentHP?: number;
  maxHP: number;

  // Leveling Mech
  currentExperience?: number;
  maxExperience?: number;
  level: number;

  // Attributes
  moves: Move[];
  className: ClassNameEnum;
}

export class Fighter {
  level: number;
  currentExperience: number;
  maxExperience: number;
  currentHP: number;
  maxHP: number;
  moves: Move[];
  className: ClassNameEnum;

  constructor(props: InitFighter) {
    this.level = props.level;
    this.currentExperience = props?.currentExperience ?? 0;
    this.maxExperience = props?.maxExperience ?? 100;

    this.currentHP = props.currentHP ?? props.maxHP;
    this.maxHP = props.maxHP;

    this.moves = props.moves;
    this.className = props.className;
  }

  get isDead(): boolean {
    return this.currentHP <= 0;
  }

  applyAction(action: ActionDelta): {
    updatedFighter: Fighter;
    outcomes?: ActionDelta[];
  } {
    switch (action.effect) {
      case EffectEnum.DAMAGE:
        this.takeDamage(action);
        break;
      case EffectEnum.EFFECT:
        this.applyEffect(action);
        break;
      case EffectEnum.HEALTH:
        this.computeHeal(action);
        break;
      case EffectEnum.EXPERIENCE:
        this.applyExperience(action);
        break;
      default:
        console.log("Unrecognized effect");
        break;
    }

    return { updatedFighter: this, outcomes: [] };
  }

  private takeDamage(action: ActionDelta) {
    const difference = this.currentHP - action.amount;

    if (difference < 0) {
      this.currentHP = 0;
    } else {
      this.currentHP -= action.amount;
    }
  }

  private computeHeal(action: ActionDelta) {
    const difference = this.currentHP + action.amount;

    if (difference > this.maxHP) {
      this.currentHP = this.maxHP;
    } else {
      this.currentHP += action.amount;
    }
  }

  private applyEffect(action: ActionDelta) {
    console.log("Nothing happens...");
  }

  private applyExperience(action: ActionDelta) {}
}
