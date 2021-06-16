import { ITeamMember } from "./ITeamMember";

export interface ITeam {
    name: string;
    shortDescription: string;
    description?: string;
    members?: ITeamMember[],
    slackChannelId?: string,
    slackTeamId?: string,
    teams?: ITeam[]
}