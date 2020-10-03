import React from 'react';
import { Stack, Image } from 'office-ui-fabric-react';
import { TeamCard } from './components/TeamCard';
import { Placeholder } from './components/Placeholder';
import { TeamService } from './services/TeamService';
import { ConnectingLines } from './components/ConnectingLines';
import { ITeam } from './models/ITeam';

export class App extends React.Component<{}, { teams: ITeam[] }> {

  async componentDidMount() {
    const teams = await new TeamService().getAsync();
    this.setState({ teams });
  }

  render() {
    if (!this.state || !this.state.teams) {
      return null;
    }

    const teams = this.state.teams;
    const maxX = teams.reduce((oa, u) => Math.max(oa, u.position.x), 0);
    const maxY = teams.reduce((oa, u) => Math.max(oa, u.position.y), 0);

    const stacks = [];
    for (let y = 0; y <= maxY; y++) {
      const horizontalStack = [];
      for (let x = 0; x <= maxX; x++) {
        const filteredTeams = teams.filter(t => t.position.x == x && t.position.y == y);
        if (filteredTeams.length) {
          const team = filteredTeams[0];
          horizontalStack.push(<TeamCard team={team} key={team.shortName} />);
        }
        else {
          horizontalStack.push(<Placeholder key={"placeholder" + x.toString() + y.toString()} />);
        }
      }
      stacks.push(horizontalStack);
    }

    const logoUrl = `${process.env.PUBLIC_URL}/images/logo.png`;

    return (
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        verticalFill
        styles={{
          root: {
            minWidth: '1140px',
            margin: '0 auto',
            textAlign: 'center',
            color: '#605e5c'
          }
        }}
        gap={70}
      >
        <Image src={logoUrl} alt='Company logo' />
        {
          stacks.map((items, i) => <Stack horizontal gap={50} horizontalAlign="center" key={"stack" + i}>
            {items}
          </Stack>)
        }
        <ConnectingLines teams={teams} />
      </Stack>
    );
  }
}
