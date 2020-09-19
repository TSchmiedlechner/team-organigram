import React, { CSSProperties } from 'react';
import { Stack, DocumentCard, Text, Link, FontWeights } from 'office-ui-fabric-react';
import { Card, ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@uifabric/react-cards';
import LineTo, { Line } from 'react-lineto';
import { Team } from './components/Team';
import { Placeholder } from './components/Placeholder';


export const App: React.FunctionComponent = () => {
  const cardTokens: ICardTokens = { childrenMargin: 12 };
  const hiddenStyle: CSSProperties = { visibility: 'hidden' };
  const cardStyle: CSSProperties = { zIndex: 100 };
  return (
    <div>
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        verticalFill
        styles={{
          root: {
            width: '960px',
            margin: '0 auto',
            textAlign: 'center',
            color: '#605e5c'
          }
        }}
        gap={50}
      >
        <Stack horizontal gap={50} horizontalAlign="center">
          <Team name='Product Management' shortName='PM' />
          <Placeholder />
          <Team name='Company Administration' shortName='CA' />
        </Stack>

        <Stack horizontal gap={50} horizontalAlign="center">
          <Placeholder />
          <Team name='Core' shortName='Core' />
          <Placeholder />
        </Stack>

        <Stack horizontal gap={50} horizontalAlign="center">
          <Team name='Customer Care' shortName='CC' />
          <Team name='Engineering' shortName='Eng' />
          <Team name='Site Reliability Engineering' shortName='SRE' />
        </Stack>
      </Stack>
      <LineTo from="Core" to="CC" delay={0} fromAnchor='bottom' toAnchor='top' borderColor='black' />
      <LineTo from="Core" to="SRE" delay={0} fromAnchor='bottom' toAnchor='top' borderColor='black' />
      <LineTo from="Core" to="Eng" delay={0} fromAnchor='bottom' toAnchor='top' borderColor='black' />
      <LineTo from="Core" to="PM" delay={0} fromAnchor='top' toAnchor='bottom' borderColor='black' />
      <LineTo from="Core" to="CA" delay={0} fromAnchor='top' toAnchor='bottom' borderColor='black' />
    </div>
  );
};
