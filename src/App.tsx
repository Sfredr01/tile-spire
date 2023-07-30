import React, { createContext, useEffect, useState } from "react";
import { BattleScene } from "./components/BattleScene/BattleScene";
import { Fighter } from "./classes/Fighter";
import { ActionDelta } from "./types/ActionDelta";
import { GridExplorationScene } from "./components/GridExplorationScene/GridExplorationScene";
import { TeamBuilderScene } from "./components/TeamBuilderScene/TeamBuilderScene";

export interface Context {
  playerTeam: Fighter[];
  enemyTeam: Fighter[];
  actionsSubmitted: ActionDelta[];
}

const defaultContext = {
  context: {
    playerTeam: [],
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
