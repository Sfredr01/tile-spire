import { useContext, useEffect } from "react";
import { BattleModal } from "../BattleModal/BattleModal";
import "./battle-scene.style.css";
import { GameContext } from "../../App";
import { Fighter } from "../../classes/Fighter";
import { TargetEnum } from "../../enums/TargetEnum";
import { clockWiseSwap } from "../../utils/clockwiseSwap";
import { EffectEnum } from "../../enums/EffectEnum";

const InfoHeader = ({
  maxHP,
  currentHP,
  currentExperience,
  maxExperience,
  level,
  className,
}: Pick<
  Fighter,
  | "maxHP"
  | "currentHP"
  | "currentExperience"
  | "maxExperience"
  | "level"
  | "className"
>) => {
  const healthPercentage = (currentHP / maxHP) * 100;
  const experiencePercentage = (currentExperience / maxExperience) * 100;

  return (
    <>
      <div>{className}</div>
      <div className="health-container">
        <div className="health-bar" style={{ width: `${healthPercentage}%` }} />
      </div>
      <div>
        <div className="level-container">
          <div
            className="experience-bar"
            style={{ width: `${experiencePercentage}%` }}
          />
          <div className="level-text">Level: {level}</div>
        </div>
      </div>
    </>
  );
};

const FighterComponent = ({ fighter }: { fighter: Fighter }) => {
  const maxDeathOpacity = 30;

  return (
    <div
      className="fighter-stage"
      style={{
        opacity: `${fighter.isDead ? maxDeathOpacity : 100}%`,
      }}
    >
      <InfoHeader
        className={fighter.className}
        maxHP={fighter.maxHP}
        currentHP={fighter.currentHP}
        maxExperience={fighter.maxExperience}
        currentExperience={fighter.currentExperience}
        level={fighter.level}
      />
    </div>
  );
};

export const BattleScene = () => {
  const { context, setContext } = useContext(GameContext);

  useEffect(() => {
    if (context.actionsSubmitted.length > 0) {
      if (context.playerTeam.every((fighter) => fighter.isDead)) {
        window.location.reload();
      }

      const modifiedListOfActions = [...context.actionsSubmitted];
      const currentAction = modifiedListOfActions.pop();

      if (currentAction) {
        const currentTeamBeingTargeted =
          currentAction.target === TargetEnum.PLAYER
            ? "playerTeam"
            : "enemyTeam";

        const currentOriginTeam =
          currentAction.origin === TargetEnum.PLAYER
            ? "playerTeam"
            : "enemyTeam";

        const currentOriginFighter = context[currentOriginTeam][1];

        if (currentOriginFighter.isDead) {
          alert("actioning fighter is dead!");
          const newTeam = clockWiseSwap(context[currentOriginTeam]);

          setContext((currentContext) => ({
            ...currentContext,
            [currentOriginTeam]: newTeam,
            actionsSubmitted: modifiedListOfActions,
          }));
          return;
        }

        // Apply action to active target
        context[currentTeamBeingTargeted][1].applyAction(currentAction);

        // Basic Enemy behavior, If player does anything, enemy attack
        if (currentAction.origin === TargetEnum.PLAYER && context.enemyTeam) {
          const enemyAction = context.enemyTeam[1].moves[0].execute({
            target: TargetEnum.PLAYER,
            origin: TargetEnum.ENEMY,
          });

          modifiedListOfActions.push(enemyAction);

          // if all enemies are dead, end the battle
        }

        // Handle if all enemies are dead
        if (context.enemyTeam.every((fighter) => fighter.isDead)) {
          setContext((currentContext) => ({
            ...currentContext,
            actionsSubmitted: [],
            enemyTeam: [], // Clear Enemy Team
            playerTeam: currentContext.playerTeam.map((fighter) => {
              // Heal Player Team
              const { updatedFighter } = fighter.applyAction({
                name: "RESET",
                effect: EffectEnum.HEALTH,
                amount: fighter.maxHP,
                origin: TargetEnum.PLAYER,
                target: TargetEnum.PLAYER,
              });

              return updatedFighter;
            }),
          }));
          return;
        }

        // Apply actions to the context
        setContext((currentContext) => ({
          ...currentContext,
          actionsSubmitted: modifiedListOfActions,
        }));
      }
    }
  }, [context]);

  return (
    <div className="battle-window">
      <div className="fight-area player">
        {context.playerTeam.map((playerFighter, i) => (
          <FighterComponent
            fighter={playerFighter}
            key={`player_position_${i}`}
          />
        ))}
      </div>

      <div className="fight-area enemy">
        {context.enemyTeam &&
          context.enemyTeam.map((enemyFighter, i) => (
            <FighterComponent
              fighter={enemyFighter}
              key={`enemy_position_${i}`}
            />
          ))}
      </div>

      <BattleModal />
    </div>
  );
};
