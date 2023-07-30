import { InitFighter } from "../classes/Fighter";
import { ClassNameEnum } from "../enums/ClassNameEnum";
import { definedMoves } from "./DefinedMoves";

export const definedCharacterTypes: { [k in ClassNameEnum]: InitFighter } = {
  [ClassNameEnum.KNIGHT]: {
    level: 1,
    maxHP: 200,
    moves: [],
    className: ClassNameEnum.KNIGHT,
  },
  [ClassNameEnum.PRIEST]: {
    level: 1,
    maxHP: 200,
    moves: [],
    className: ClassNameEnum.PRIEST,
  },
  [ClassNameEnum.ROUGE]: {
    level: 1,
    maxHP: 200,
    moves: [],
    className: ClassNameEnum.ROUGE,
  },
  [ClassNameEnum.WIZARD]: {
    level: 1,
    maxHP: 200,
    moves: [],
    className: ClassNameEnum.WIZARD,
  },
};
