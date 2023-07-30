import { useContext, useEffect } from "react";
import { BattleModal } from "../BattleModal/BattleModal";
import "./battle-scene.style.css";
import { Context, GameContext } from "../../App";
import { Fighter } from "../../classes/Fighter";
import { TargetEnum } from "../../enums/TargetEnum";
import { clockWiseSwap } from "../../utils/clockwiseSwap";
import { EffectEnum } from "../../enums/EffectEnum";
import { ActionDelta } from "../../types/ActionDelta";

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
        <div className="health-text">{healthPercentage}%</div>
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

interface CurrentApplicationData {
  currentTeamBeingTargetted: "playerTeam" | "enemyTeam";
  currentTargetFighter: Fighter;
  currentOriginTeam: "playerTeam" | "enemyTeam";
  currentOriginFighter: Fighter;
}

const getCurrentActionApplicationData = (
  context: Context,
  currentAction: ActionDelta
): CurrentApplicationData => {
  const currentTeamBeingTargeted =
    currentAction.target === TargetEnum.PLAYER ? "playerTeam" : "enemyTeam";

  const currentOriginTeam =
    currentAction.origin === TargetEnum.PLAYER ? "playerTeam" : "enemyTeam";

  return {
    currentTeamBeingTargetted: currentTeamBeingTargeted,
    currentTargetFighter: context[currentTeamBeingTargeted][1],
    currentOriginTeam: currentOriginTeam,
    currentOriginFighter: context[currentOriginTeam][1],
  };
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
        const {
          currentTeamBeingTargetted,
          currentTargetFighter,
          currentOriginTeam,
          currentOriginFighter,
        } = getCurrentActionApplicationData(context, currentAction);

        if (currentOriginFighter.isDead) {
          const newTeam = clockWiseSwap(context[currentOriginTeam]);

          setContext((currentContext) => ({
            ...currentContext,
            [currentOriginTeam]: newTeam,
            actionsSubmitted: modifiedListOfActions,
          }));
          return;
        }

        // Apply action to active target
        currentTargetFighter.applyAction(currentAction);

        if (currentTargetFighter.isDead) {
          const newTeam = clockWiseSwap(context[currentTeamBeingTargetted]);

          if (newTeam.some((fighter) => !fighter.isDead)) {
            setContext((currentContext) => ({
              ...currentContext,
              [currentTeamBeingTargetted]: newTeam,
              actionsSubmitted: modifiedListOfActions,
            }));
            return;
          }
        }

        // Basic Enemy behavior, If player does anything, enemy attack
        if (currentAction.origin === TargetEnum.PLAYER && context.enemyTeam) {
          const enemyAction = currentTargetFighter.moves[0].execute({
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
              const { updatedFighter: fullyHealedFighter } =
                fighter.applyAction({
                  name: "RESET",
                  effect: EffectEnum.HEALTH,
                  amount: fighter.maxHP,
                  origin: TargetEnum.PLAYER,
                  target: TargetEnum.PLAYER,
                });

              const experienceCalculated =
                currentContext.enemyTeam.reduce((prev, curr) => {
                  const levelDifference = curr.level / fighter.level;

                  return prev + levelDifference;
                }, 0) *
                (fighter.maxExperience / 3);

              const { updatedFighter: experiencedFighter } =
                fullyHealedFighter.applyAction({
                  name: "BATTLE_EXPERIENCE",
                  effect: EffectEnum.EXPERIENCE,
                  amount: experienceCalculated,
                  origin: TargetEnum.PLAYER,
                  target: TargetEnum.PLAYER,
                });

              return experiencedFighter;
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
