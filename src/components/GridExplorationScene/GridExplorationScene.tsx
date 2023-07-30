import { useContext } from "react";
import "./grid-exploration-scene.style.css";
import { GameContext } from "../../App";
import { ClassNameEnum } from "../../enums/ClassNameEnum";
import { generateRandomVariant } from "../../utils/generateRandomFighterVariant";

export const GridExplorationScene = () => {
  const { setContext } = useContext(GameContext);

  const initBattle = () => {
    const enemyTeam = [
      generateRandomVariant({
        currentHP: 100,
        maxHP: 100,
        moves: [],
        level: 1,
        className: ClassNameEnum.ROUGE,
      }),
      generateRandomVariant({
        currentHP: 100,
        maxHP: 100,
        moves: [],
        level: 1,
        className: ClassNameEnum.ROUGE,
      }),
      generateRandomVariant({
        currentHP: 100,
        maxHP: 100,
        moves: [],
        level: 1,
        className: ClassNameEnum.ROUGE,
      }),
    ];

    setContext((currentContext) => ({
      ...currentContext,
      enemyTeam: enemyTeam,
    }));
  };

  return (
    <div className="explore-window">
      <div className="explore-area-container">
        <div className="explore-area-row">
          <div className="explore-stage" data-stage-type="fog" />
          <div className="explore-stage" data-stage-type="fog" />
          <div className="explore-stage" data-stage-type="fog" />
          <div className="explore-stage" data-stage-type="fog" />
          <div className="explore-stage" data-stage-type="fog" />
        </div>
        <div className="explore-area-row">
          <div className="explore-stage" data-stage-type="fog" />
          <div
            className="explore-stage"
            data-stage-type="eligible"
            onClick={initBattle}
          />
          <div
            className="explore-stage"
            data-stage-type="eligible"
            onClick={initBattle}
          />
          <div
            className="explore-stage"
            data-stage-type="eligible"
            onClick={initBattle}
          />
          <div className="explore-stage" data-stage-type="fog" />
        </div>
        <div className="explore-area-row">
          <div className="explore-stage" data-stage-type="fog" />
          <div
            className="explore-stage"
            data-stage-type="eligible"
            onClick={initBattle}
          />
          <div className="explore-stage" data-stage-type="active" />
          <div
            className="explore-stage"
            data-stage-type="eligible"
            onClick={initBattle}
          />
          <div className="explore-stage" data-stage-type="fog" />
        </div>
        <div className="explore-area-row">
          <div className="explore-stage" data-stage-type="fog" />
          <div
            className="explore-stage"
            data-stage-type="eligible"
            onClick={initBattle}
          />
          <div
            className="explore-stage"
            data-stage-type="eligible"
            onClick={initBattle}
          />
          <div
            className="explore-stage"
            data-stage-type="eligible"
            onClick={initBattle}
          />
          <div className="explore-stage" data-stage-type="fog" />
        </div>
        <div className="explore-area-row">
          <div className="explore-stage" data-stage-type="fog" />
          <div className="explore-stage" data-stage-type="fog" />
          <div className="explore-stage" data-stage-type="fog" />
          <div className="explore-stage" data-stage-type="fog" />
          <div className="explore-stage" data-stage-type="fog" />
        </div>
      </div>
    </div>
  );
};
