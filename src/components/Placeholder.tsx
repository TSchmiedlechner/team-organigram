import React, { CSSProperties } from 'react';
import { Card, ICardTokens } from '@uifabric/react-cards';

export class Placeholder extends React.Component {
  render() {
    const cardTokens: ICardTokens = { childrenMargin: 12 };
    const hiddenStyle: CSSProperties = { visibility: 'hidden' };

    return <Card horizontal tokens={cardTokens} style={hiddenStyle} />;
  }
}