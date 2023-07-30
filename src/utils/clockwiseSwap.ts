import { Fighter } from "../classes/Fighter";

export const clockWiseSwap = (team: Fighter[]): Fighter[] => {
  const newTeam = [...team];
  const lastFighterInPlayerTeam = newTeam.pop();
  if (typeof lastFighterInPlayerTeam !== "undefined") {
    newTeam.splice(0, 0, lastFighterInPlayerTeam);
  }
  return newTeam;
};
