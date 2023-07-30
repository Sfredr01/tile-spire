import { useContext, useEffect, useState } from "react";
import "./battle-modal.style.css";
import { GameContext } from "../../App";
import { TargetEnum } from "../../enums/TargetEnum";
import { clockWiseSwap } from "../../utils/clockwiseSwap";
import { EffectEnum } from "../../enums/EffectEnum";

interface Option {
  name: string;
  action: () => void;
}

enum MenuTypes {
  MAIN_MENU = "MAIN_MENU",
  ITEM_MENU = "ITEM_MENU",
  MOVE_MENU = "MOVE_MENU",
}

export const BattleModal = () => {
  const { context, setContext } = useContext(GameContext);

  const [options, setOptions] = useState<Option[]>([]);
  const [currentMenu, setCurrentMenu] = useState<MenuTypes>(
    MenuTypes.MAIN_MENU
  );

  useEffect(() => {
    const potentialOptions: Option[] = [];

    switch (currentMenu) {
      case MenuTypes.MOVE_MENU:
        context.playerTeam[1].moves.forEach((move) => {
          potentialOptions.push({
            name: move.name,
            action: () => {
              const modifiedListOfActions = [...context.actionsSubmitted];

              const actionToBeTaken = move.execute({
                target:
                  move.effect === EffectEnum.HEALTH
                    ? TargetEnum.PLAYER
                    : TargetEnum.ENEMY,
                origin: TargetEnum.PLAYER,
              });

              modifiedListOfActions.push(actionToBeTaken);

              setContext((currentContext) => ({
                ...currentContext,
                actionsSubmitted: modifiedListOfActions,
              }));
              setCurrentMenu(MenuTypes.MAIN_MENU);
            },
          });
        });
        break;
      case MenuTypes.ITEM_MENU:
        // TODO: Remove hardcode
        break;
      case MenuTypes.MAIN_MENU:
      default:
        potentialOptions.push({
          name: "Moves",
          action: () => changeMenu(MenuTypes.MOVE_MENU),
        });
        // potentialOptions.push({
        //   name: "Items",
        //   action: () => changeMenu(MenuTypes.ITEM_MENU),
        // });
        potentialOptions.push({
          name: "Swap",
          action: () => {
            //Clock-wise swap logic
            const newPlayerTeam = clockWiseSwap(context.playerTeam);

            setContext((currentContext) => ({
              ...currentContext,
              playerTeam: newPlayerTeam,
            }));
          },
        });
        potentialOptions.push({
          name: "Pass",
          action: () => {
            setContext((currentContext) => ({
              ...currentContext,
              enemyTeam: [],
            }));
          },
        });
        break;
    }

    if (options !== potentialOptions) {
      setOptions(potentialOptions);
    }
  }, [currentMenu, context]);

  const changeMenu = (menuSelection: MenuTypes) => {
    if (menuSelection === currentMenu) {
      return;
    }

    setCurrentMenu(menuSelection);
  };

  return (
    <div
      className="battle-modal-container"
      style={context.actionsSubmitted.length !== 0 ? { display: "none" } : {}}
    >
      {options.length > 0 &&
        options.map((option, i) => (
          <div
            className={"block-button"}
            key={`${option.name}_${i}`}
            onClick={option.action}
          >
            <div>{option.name}</div>
          </div>
        ))}

      {currentMenu !== MenuTypes.MAIN_MENU && (
        <div
          className={"block-button"}
          onClick={() => changeMenu(MenuTypes.MAIN_MENU)}
        >
          <div>Go Back</div>
        </div>
      )}
    </div>
  );
};
