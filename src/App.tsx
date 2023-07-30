import React, { createContext, useEffect, useState } from "react";
import { BattleScene } from "./components/BattleScene/BattleScene";
import { Fighter } from "./classes/Fighter";
import { definedMoves } from "./static/DefinedMoves";
import { ActionDelta } from "./types/ActionDelta";
import { GridExplorationScene } from "./components/GridExplorationScene/GridExplorationScene";
import { Move } from "./classes/Move";
import { EffectEnum } from "./enums/EffectEnum";
import { TeamBuilderScene } from "./components/TeamBuilderScene/TeamBuilderScene";

interface Context {
  playerTeam: Fighter[];
  enemyTeam: Fighter[];
  actionsSubmitted: ActionDelta[];
}

const defaultContext = {
  context: {
    playerTeam: [
      // new Fighter({
      //   currentHP: 100,
      //   maxHP: 100,
      //   moves: [definedMoves.PUNCH],
      //   level: 1,
      // }),
      // new Fighter({
      //   currentHP: 100,
      //   maxHP: 100,
      //   moves: [
      //     new Move({
      //       name: "Divine Punishment",
      //       amount: 100,
      //       effect: EffectEnum.DAMAGE,
      //     }),
      //   ],
      //   level: 1,
      // }),
      // new Fighter({
      //   currentHP: 100,
      //   maxHP: 100,
      //   moves: [definedMoves.PUNCH],
      //   level: 1,
      // }),
    ],
    enemyTeam: [],
    actionsSubmitted: [],
  },
  setContext: () => {},
};

export const GameContext = createContext<{
  context: Context;
  setContext: React.Dispatch<React.SetStateAction<Context>>;
}>(defaultContext);

function App() {
  const [context, setContext] = useState<Context>({
    ...defaultContext.context,
  });

  return (
    <GameContext.Provider value={{ context, setContext }}>
      {context.playerTeam.length > 0 ? (
        <>
          {context.enemyTeam.length > 0 ? (
            <BattleScene />
          ) : (
            <GridExplorationScene />
          )}
        </>
      ) : (
        <TeamBuilderScene />
      )}
    </GameContext.Provider>
  );
}

export default App;
