import { Move } from "../classes/Move";
import { ClassNameEnum } from "../enums/ClassNameEnum";
import { EffectEnum } from "../enums/EffectEnum";

export const definedMoves = {
  // Priest Moves
  [ClassNameEnum.PRIEST]: {
    HEAL: new Move({ name: "Heal", effect: EffectEnum.HEALTH, amount: 10 }),
    SMITE: new Move({ name: "Smite", effect: EffectEnum.DAMAGE, amount: 8 }),
    BLESSING: new Move({
      name: "Blessing",
      effect: EffectEnum.EFFECT,
      amount: 90,
    }),
    DIVINE_SHIELD: new Move({
      name: "Divine Shield",
      effect: EffectEnum.EFFECT,
      amount: 70,
    }),
    PURIFY: new Move({ name: "Purify", effect: EffectEnum.EFFECT, amount: 50 }),
    HOLY_FIRE: new Move({
      name: "Holy Fire",
      effect: EffectEnum.DAMAGE,
      amount: 12,
    }),
    DEVOTION: new Move({
      name: "Devotion",
      effect: EffectEnum.EFFECT,
      amount: 80,
    }),
    PLEA: new Move({ name: "Plea", effect: EffectEnum.HEALTH, amount: 5 }),
    SACRED_WORD: new Move({
      name: "Sacred Word",
      effect: EffectEnum.EFFECT,
      amount: 60,
    }),
    HOLY_SMITE: new Move({
      name: "Holy Smite",
      effect: EffectEnum.DAMAGE,
      amount: 10,
    }),
  },

  [ClassNameEnum.KNIGHT]: {
    //Knight Moves
    SLASH: new Move({ name: "Slash", effect: EffectEnum.DAMAGE, amount: 8 }),
    BLOCK: new Move({ name: "Block", effect: EffectEnum.EFFECT, amount: 80 }),
    HEAVY_STRIKE: new Move({
      name: "Heavy Strike",
      effect: EffectEnum.DAMAGE,
      amount: 12,
    }),
    SHIELD_BASH: new Move({
      name: "Shield Bash",
      effect: EffectEnum.EFFECT,
      amount: 70,
    }),
    REINFORCE: new Move({
      name: "Reinforce",
      effect: EffectEnum.HEALTH,
      amount: 10,
    }),
    TAUNT: new Move({ name: "Taunt", effect: EffectEnum.EFFECT, amount: 60 }),
    RETALIATE: new Move({
      name: "Retaliate",
      effect: EffectEnum.DAMAGE,
      amount: 5,
    }),
    CHARGE: new Move({ name: "Charge", effect: EffectEnum.EFFECT, amount: 50 }),
    RALLY: new Move({ name: "Rally", effect: EffectEnum.HEALTH, amount: 8 }),
    FINAL_STAND: new Move({
      name: "Final Stand",
      effect: EffectEnum.HEALTH,
      amount: 20,
    }),
  },

  //Rouge
  [ClassNameEnum.ROUGE]: {
    BACKSTAB: new Move({
      name: "Backstab",
      effect: EffectEnum.DAMAGE,
      amount: 10,
    }),
    SMOKE_SCREEN: new Move({
      name: "Smoke Screen",
      effect: EffectEnum.EFFECT,
      amount: 70,
    }),
    SHADOW_STEP: new Move({
      name: "Shadow Step",
      effect: EffectEnum.EFFECT,
      amount: 60,
    }),
    QUICK_SLASH: new Move({
      name: "Quick Slash",
      effect: EffectEnum.DAMAGE,
      amount: 8,
    }),
    EVADE: new Move({ name: "Evade", effect: EffectEnum.EFFECT, amount: 80 }),
    LEECH: new Move({ name: "Leech", effect: EffectEnum.HEALTH, amount: 5 }),
    BLIND: new Move({ name: "Blind", effect: EffectEnum.EFFECT, amount: 90 }),
    POISON_DAGGER: new Move({
      name: "Poison Dagger",
      effect: EffectEnum.DAMAGE,
      amount: 6,
    }),
    SHADOW_STRIKE: new Move({
      name: "Shadow Strike",
      effect: EffectEnum.DAMAGE,
      amount: 12,
    }),
    PARALYZE: new Move({
      name: "Paralyze",
      effect: EffectEnum.EFFECT,
      amount: 50,
    }),
  },

  //Wizard
  [ClassNameEnum.WIZARD]: {
    FIREBALL: new Move({
      name: "Fireball",
      effect: EffectEnum.DAMAGE,
      amount: 12,
    }),
    FROST_NOVA: new Move({
      name: "Frost Nova",
      effect: EffectEnum.EFFECT,
      amount: 70,
    }),
    ARCANE_MISSILES: new Move({
      name: "Arcane Missiles",
      effect: EffectEnum.DAMAGE,
      amount: 8,
    }),
    TELEPORT: new Move({
      name: "Teleport",
      effect: EffectEnum.EFFECT,
      amount: 80,
    }),
    HEALING_AURA: new Move({
      name: "Healing Aura",
      effect: EffectEnum.HEALTH,
      amount: 10,
    }),
    MAGIC_SHIELD: new Move({
      name: "Magic Shield",
      effect: EffectEnum.HEALTH,
      amount: 15,
    }),
    LIGHTNING_BOLT: new Move({
      name: "Lightning Bolt",
      effect: EffectEnum.DAMAGE,
      amount: 10,
    }),
    TIME_WARP: new Move({
      name: "Time Warp",
      effect: EffectEnum.EFFECT,
      amount: 50,
    }),
    METEOR_STRIKE: new Move({
      name: "Meteor Strike",
      effect: EffectEnum.DAMAGE,
      amount: 15,
    }),
    MANA_BURN: new Move({
      name: "Mana Burn",
      effect: EffectEnum.EFFECT,
      amount: 90,
    }),
  },
};
