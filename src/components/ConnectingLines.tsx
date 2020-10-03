import React from 'react'
import LineTo from 'react-lineto';
import { ITeam } from '../models/ITeam';

interface IConnectingLinesProps {
    teams: ITeam[]
}


export class ConnectingLines extends React.Component<IConnectingLinesProps> {
    constructor(props: Readonly<IConnectingLinesProps>) {
        super(props);
        this.updatePredicate = this.updatePredicate.bind(this);
    }

    componentDidMount() {
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }

    updatePredicate() {
        // Change state to trigger render()
        this.setState({ innerWidth: window.innerWidth });
    }

    render() {
        return (
            <div>
                {this.props.teams.filter(team => team.reportsTo).map(team => {
                    var connectedTeam = this.props.teams.filter(x => x.shortName === team.reportsTo)[0];
                    const [fromAnchor, toAnchor] = this.getAnchorPosition(team, connectedTeam);
                    return <LineTo from={team.shortName} to={team.reportsTo!} delay={100} fromAnchor={fromAnchor} toAnchor={toAnchor} borderColor='darkgray' key={'line-' + team.shortName} />;
                })}
            </div>
        );
    }

    getAnchorPosition(fromTeam: ITeam, toTeam: ITeam): [string, string] {
        if (fromTeam.position.y < toTeam.position.y) {
            return ["bottom", "top"];
        }
        else if (fromTeam.position.y > toTeam.position.y){
            return ["top", "bottom"];
        }
        else if (fromTeam.position.x < toTeam.position.x){
            return ["right", "left"];
        }
        else if (fromTeam.position.x > toTeam.position.x){
            return ["left", "right"];
        }
        else {
            return ["bottom", "bottom"];
        }
    }
}