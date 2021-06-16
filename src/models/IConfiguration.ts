import { ITeam } from "./ITeam";

export interface IConfiguration {
    orgName: string;
    orgShortDescription: string;
    orgDescription?: string;
    teams?: ITeam[]
}