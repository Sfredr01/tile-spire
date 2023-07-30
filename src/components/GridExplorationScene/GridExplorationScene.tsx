import { useContext } from "react";
import "./grid-exploration-scene.style.css";
import { GameContext } from "../../App";
import { ClassNameEnum } from "../../enums/ClassNameEnum";
import { generateRandomVariant } from "../../utils/generateRandomFighterVariant";
import seedrandom from "seedrandom";

type StageType = "fog" | "eligible" | "active" | "store";

// Generate a 2D array of noise values
function generateNoiseMap(
  width: number,
  height: number,
  seed: string
): number[][] {
  const rng = seedrandom(seed);
  const noiseMap: number[][] = [];

  for (let y = 0; y < height; y++) {
    noiseMap[y] = [];
    for (let x = 0; x < width; x++) {
      noiseMap[y][x] = rng();
    }
  }

  return noiseMap;
}

// Map noise values to stage types
function mapNoiseToStages(
  noiseMap: number[][],
  threshold: number
): StageType[][] {
  const stageMap: StageType[][] = [];

  for (let y = 0; y < noiseMap.length; y++) {
    stageMap[y] = [];
    for (let x = 0; x < noiseMap[y].length; x++) {
      const noiseValue = noiseMap[y][x];
      if (noiseValue < threshold) {
        // TODO: Implement store
        // stageMap[y][x] = noiseValue < threshold * 0.2 ? "store" : "eligible";
        stageMap[y][x] = "eligible";
      } else {
        stageMap[y][x] = "fog";
      }
    }
  }

  return stageMap;
}

export const GridExplorationScene = () => {
  const { context, setContext } = useContext(GameContext);

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

  // Generate the procedurally generated map HTML
  function generateMapElements(stageMap: StageType[][]): JSX.Element[][] {
    const mapElements: JSX.Element[][] = [];

    for (let y = 0; y < stageMap.length; y++) {
      mapElements[y] = [];
      for (let x = 0; x < stageMap[y].length; x++) {
        const stageType = stageMap[y][x];
        const onClickHandler = stageType === "eligible" ? initBattle : () => {};

        mapElements[y][x] = (
          <div
            key={`position_${y}_${x}`}
            className="explore-stage"
            data-stage-type={stageType}
            onClick={onClickHandler}
          />
        );
      }
    }

    return mapElements;
  }

  function generateProceduralMap(
    width: number,
    height: number,
    seed: string,
    threshold: number
  ): JSX.Element[][] {
    const noiseMap = generateNoiseMap(width, height, seed);
    const stageMap = mapNoiseToStages(noiseMap, threshold);
    return generateMapElements(stageMap);
  }

  const mapSize = 5;
  const threshold = 0.6;

  const mapElements = generateProceduralMap(
    mapSize,
    mapSize,
    context.mapSeed,
    threshold
  );

  return (
    <div className="explore-window">
      <div className="explore-area-container">
        {mapElements.map((rowElements, rowIndex) => (
          <div key={`row_${rowIndex}`} className="explore-area-row">
            {rowElements}
          </div>
        ))}
      </div>
    </div>
  );
};
