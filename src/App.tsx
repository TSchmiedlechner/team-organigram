import logo from './logo.png';
import github from './github.png';
import './App.css';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import { OrgLogo } from './components/OrgLogo/OrgLogo';
import { OrgStatistics } from './components/OrgStatistics/OrgStatistics';
import { TeamDetails } from './components/TeamDetails/TeamDetails';
import { ChartLegend } from './components/ChartLegend/ChartLegend';
import { ConfigurationService } from './services/ConfigurationService';
import { D3DataConverter } from './helpers/D3DataConverter';
import { useEffect, useState } from 'react';
import { IConfiguration } from './models/IConfiguration';
import { ITeam } from './models/ITeam';
import { TeamService } from './services/TeamService';
import { OrgDetails } from './components/OrgDetails/OrgDetails';

const ReactD3Pack = require('./components/ReactD3Pack/ReactD3Pack').default;

function App() {
  const [config, setConfig] = useState<IConfiguration>();
  const [currentTeam, setCurrentTeam] = useState<ITeam>();
  const [chartData, setChartData] = useState(null);

  function handleOnCircleChanged(name: string) {
    const team = TeamService.getByName(config!.teams!, name)
    setCurrentTeam(team);
  }

  useEffect(() => {
    async function getData() {
      const config = await ConfigurationService.getAsync();
      const d3Data = D3DataConverter.convert(config);
      setConfig(config);
      setChartData(d3Data);
    }
    getData();
  }, [])

  return (
    <div>
      <AppBar className='main-app-bar' position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <img src={logo} alt="Team Circles" width="40" height="40"></img>
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Team Circles
          </Typography>
          <IconButton color="primary" aria-label="Contribute on GitHub" href='https://github.com/tschmiedlechner/team-organigram' title='GitHub' target='_blank'>
            <img src={github} alt="github" width="32" height="32" className="rounded-circle"></img>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Grid container>
        <Grid item md={6}>
          <div style={{ margin: 'auto 70px' }}>
            {chartData &&
              <ReactD3Pack data={chartData} onCircleChanged={handleOnCircleChanged}></ReactD3Pack>
            }
          </div>
          <p style={{ fontStyle: 'italic', textAlign: 'center' }}>Click inside the chart to navigate between teams.</p>
        </Grid>
        <Grid item md={6} style={{ padding: '0 50px' }}>
          <OrgLogo />
          <OrgStatistics numberOfMembers={28} numberOfTeams={12} />
          {currentTeam &&
            <TeamDetails team={currentTeam} />
          }
          {!currentTeam && config &&
            <OrgDetails config={config} />
          }
          <ChartLegend />
        </Grid>
      </Grid>

    </div>
  );
}

export default App;