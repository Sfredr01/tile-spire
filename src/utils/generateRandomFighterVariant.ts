import { Fighter, InitFighter } from "../classes/Fighter";
import { Move } from "../classes/Move";
import { ClassNameEnum } from "../enums/ClassNameEnum";
import { definedMoves } from "../static/DefinedMoves";

export const generateRandomVariant = (
  propInitFighter: InitFighter
): Fighter => {
  const initFighter: InitFighter = { ...propInitFighter, moves: [] };

  const listOfMovesToRandomize: Move[] = Object.values(
    definedMoves[propInitFighter.className]
  );

  for (let i = 0; i < 3; i++) {
    const indexToSlice = Math.floor(
      Math.random() * listOfMovesToRandomize.length
    );

    const [randomMove] = listOfMovesToRandomize.splice(indexToSlice, 1);

    initFighter.moves.push(randomMove);
  }

  return new Fighter(initFighter);
};
