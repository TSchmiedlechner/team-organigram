import yaml from 'js-yaml';
import { IConfiguration } from "../models/IConfiguration";

export class ConfigurationService {

    static async getAsync(): Promise<IConfiguration> {
        const response = await fetch(`${process.env.PUBLIC_URL}/data/teams.yml`);
        const body = await response.text();
        return yaml.load(body) as IConfiguration;
    }
}