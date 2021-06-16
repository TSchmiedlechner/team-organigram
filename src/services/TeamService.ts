import { ITeam } from "../models/ITeam";

export class TeamService {

    static getByName(teams: ITeam[], teamName: string): ITeam | undefined {

        for (const team of teams) {
            if (team.name === teamName)
                return team;
            if (team.teams) {
                const foundTeam = this.getByName(team.teams, teamName);
                if (foundTeam)
                    return foundTeam;
            }
        }

        return undefined;
    }
}