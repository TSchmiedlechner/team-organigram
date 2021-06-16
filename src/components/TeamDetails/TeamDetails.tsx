import { FC, ReactElement } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import './TeamDetails.css'
import slack from './slack.png';
import { ITeam } from '../../models/ITeam';

interface TeamDetailsProps {
    team: ITeam
}

export const TeamDetails: FC<TeamDetailsProps> = ({ team }): ReactElement => {

    const slackLink = team.slackChannelId && team.slackTeamId ? `slack://channel?team=${team.slackTeamId}&id=${team.slackChannelId}` : null;

    return (
        <div className='parent-container'>
            <Grid container justify='space-between'>
                <Grid item>
                    <Typography variant="h5" className='team-name'>{team.name}</Typography>

                </Grid>
                {slackLink &&
                    <Grid item>
                        <Button className='slack-link' variant="contained" color='default' href={slackLink} startIcon={<img src={slack} width={16} />}>
                            Contact us via Slack
                        </Button>
                    </Grid>
                }
            </Grid>

            {team.description &&
                <div className='team-description' dangerouslySetInnerHTML={{ __html: team.description! }}>
                </div>
            }

        </div>
    );
}

