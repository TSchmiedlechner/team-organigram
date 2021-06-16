import { FC, ReactElement } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { PanoramaFishEye, Group } from '@material-ui/icons';
import './OrgStatistics.css'

interface OrgStatisticsProps {
    numberOfMembers: number;
    numberOfTeams: number;
}

export const OrgStatistics: FC<OrgStatisticsProps> = ({ numberOfMembers, numberOfTeams }): ReactElement => {
    return (
        <Grid container justify="center" spacing={3}>
            <Grid item md={3}>
                <Paper className='statistic-container' elevation={3} square={true}>
                    <Group color='primary' />
                    <Typography color="textSecondary" gutterBottom>
                        {numberOfMembers} org members
                    </Typography>
                </Paper>
            </Grid>
            <Grid item md={3}>
                <Paper className='statistic-container' elevation={3} square={true}>
                    <PanoramaFishEye color='primary' />
                    <Typography color="textSecondary" gutterBottom>
                        {numberOfTeams} teams
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}

