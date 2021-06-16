import { IConfiguration } from "../models/IConfiguration";
import { ITeam } from "../models/ITeam";

interface ID3Data {
    name: string,
    isTeamOwner?: boolean,
    isProductOwner?: boolean,
    children?: ID3Data[]
}

export class D3DataConverter {

    static convert(config: IConfiguration): any {
        const hasSingleParentCircle = config.teams?.length && config.teams.length === 1;        
        const children = hasSingleParentCircle ? config.teams![0].teams?.map(x => this.mapTeam(x)) : config.teams?.map(x => this.mapTeam(x));
        const members =  hasSingleParentCircle ? config.teams![0].members : [];
        
        return {
            name: "",
            children: [...members||[], ...children||[]]
        };
    }

    private static mapTeam(team: ITeam): ID3Data {
        const members = team.members?.map(x => { return { name: x.name, isProductOwner: x.isProductOwner, isTeamOwner: x.isTeamOwner } as ID3Data });
        const subTeams = team.teams?.map(x => this.mapTeam(x))

        return {
            name: team.name,
            children: [...members||[], ...subTeams||[]]
        };
    }
}