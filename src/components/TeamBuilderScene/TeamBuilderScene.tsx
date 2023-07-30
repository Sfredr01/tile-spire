import { useContext, useState } from "react";
import "./team-builder-scene.style.css";
import { GameContext } from "../../App";
import { Fighter, InitFighter } from "../../classes/Fighter";
import { definedCharacterTypes } from "../../static/DefinedCharacterTypes";
import { generateRandomVariant } from "../../utils/generateRandomFighterVariant";

export const TeamBuilderScene = () => {
  const teamMaxAmount = 3;

  const { setContext } = useContext(GameContext);
  const [currentTeamSelection, setCurrentTeamSelection] = useState<Fighter[]>(
    []
  );

  const addSelectionToTeam = (initFighter: InitFighter) => {
    const newTeam = [...currentTeamSelection];

    // Dont allow to select more than 3 characters
    if (newTeam.length === teamMaxAmount) {
      return;
    }

    newTeam.push(generateRandomVariant(initFighter));

    setCurrentTeamSelection(newTeam);
  };

  const removeSelectionToTeam = (indexToRemove: number) => {
    const newTeam = [...currentTeamSelection];

    newTeam.splice(indexToRemove, 1);

    setCurrentTeamSelection(newTeam);
  };

  const confirmTeam = () => {
    setContext((currentContext) => ({
      ...currentContext,
      playerTeam: currentTeamSelection,
    }));
  };

  return (
    <div className="team-builder-window">
      <div className="display-container">
        <div className="fighter-options-container">
          {Object.entries(definedCharacterTypes).map(
            ([key, initFighter], i) => (
              <div
                className="fighter-option"
                key={`fighter_option_${i}`}
                onClick={() => addSelectionToTeam(initFighter)}
              >
                Name: {key}
              </div>
            )
          )}
        </div>
        <div className="slot-container">
          <div className="slot option" onClick={() => removeSelectionToTeam(0)}>
            {currentTeamSelection[0]
              ? currentTeamSelection[0].className
              : "Slot 1"}
          </div>
          <div className="slot option" onClick={() => removeSelectionToTeam(1)}>
            {currentTeamSelection[1]
              ? currentTeamSelection[1].className
              : "Slot 2"}
          </div>
          <div className="slot option" onClick={() => removeSelectionToTeam(2)}>
            {currentTeamSelection[2]
              ? currentTeamSelection[2].className
              : "Slot 3"}
          </div>
          <div
            className="slot"
            onClick={() => {
              if (currentTeamSelection.length === 3) {
                confirmTeam();
              }
            }}
          >
            Confirm Selection
          </div>
        </div>
      </div>
    </div>
  );
};
