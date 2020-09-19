import React, { CSSProperties } from 'react';
import { Stack, DocumentCard, Text, Link, FontWeights } from 'office-ui-fabric-react';
import { Card, ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@uifabric/react-cards';

interface TeamProps {
    name: string;
    shortName: string;
}

export class Team extends React.Component<TeamProps> {
  render() {

    const cardTokens: ICardTokens = { childrenMargin: 12 };

    return (
      <Card aria-label={this.props.name} horizontal tokens={cardTokens} className={this.props.shortName}>
        <Card.Item>
          <Text>{this.props.name}</Text>
        </Card.Item>
      </Card>
    );
  }
}