import { ITeam } from "../models/ITeam";
import raw from "raw.macro";
import yaml from 'js-yaml';

interface ImportedYaml {
    teams: ITeam[]
}

export class TeamService {

    get(): ITeam[] {
        const yamlContent = raw("../data/teams.yml");
        const importedYaml = yaml.safeLoad(yamlContent) as ImportedYaml;
        
        return importedYaml.teams;
    }
}