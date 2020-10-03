import { ITeam } from "../models/ITeam";
import yaml from 'js-yaml';

interface ImportedYaml {
    teams: ITeam[]
}

export class TeamService {

    async getAsync(): Promise<ITeam[]> {
        const response = await fetch(`${process.env.PUBLIC_URL}/data/teams.yml`);
        const body = await response.text();
        const importedYaml = yaml.safeLoad(body) as ImportedYaml;

        return importedYaml.teams;
    }
}