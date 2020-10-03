import { ITeamMember } from "./ITeamMember";
import { ITeamPosition } from "./ITeamPosition";

export interface ITeam {
    name: string;
    shortName: string;
    description?: string;
    shortDescription: string;
    members: ITeamMember[],
    position: ITeamPosition,
    slackChannelName?: string,
    slackChannelId?: string,
    slackTeamId?: string,
    reportsTo?: string,
    imageUrl?: string
}