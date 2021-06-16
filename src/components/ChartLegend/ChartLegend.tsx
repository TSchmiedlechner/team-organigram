import { FC, ReactElement } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { PanoramaFishEye } from '@material-ui/icons';
import './ChartLegend.css'

interface ChartLegendProps { }

export const ChartLegend: FC<ChartLegendProps> = ({ }): ReactElement => {
    return (
        <div className='parent-container'>
            <Paper elevation={3} square={true}>
                <Grid container justify="center" spacing={3}>
                    <Grid item md={12} className='legend-label-container'>
                        <Typography color="textSecondary" className='legend-label'>
                            Special roles
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Paper elevation={3} className='legend-item'>
                            <PanoramaFishEye htmlColor='DodgerBlue' className='legend-item-color' />
                            <span className='legend-item-text'>Team Driver / Product Owner</span>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper elevation={3} className='legend-item'>
                            <PanoramaFishEye htmlColor='green' className='legend-item-color' />
                            <span className='legend-item-text'>Team Owner</span>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

