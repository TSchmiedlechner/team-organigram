import { ITeamMember } from "./ITeamMember";
import { ITeamPosition } from "./ITeamPosition";

export interface ITeam {
    name: string;
    shortName: string;
    shortDescription: string;
    description?: string;
    roleDescription?: string;
    members: ITeamMember[],
    position: ITeamPosition,
    slackChannelName?: string,
    slackChannelId?: string,
    slackTeamId?: string,
    reportsTo?: string,
    imageUrl?: string
}