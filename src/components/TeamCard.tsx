import React, { CSSProperties } from 'react';
import { useBoolean } from '@uifabric/react-hooks';
import { FontWeights, Icon, IIconStyles, Image, Text, ITextStyles, Facepile, OverflowButtonType, IFacepilePersona, IFacepileStyles, Link } from 'office-ui-fabric-react';
import { Card, ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@uifabric/react-cards';
import { ITeam } from '../models/ITeam';
import { TeamModal } from './TeamModal';

import './TeamCard.css';

interface ITeamCardProps {
  team: ITeam
}

export const TeamCard: React.FunctionComponent<ITeamCardProps> = ({ team }) => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);

  const cardTokens: ICardTokens = { childrenMargin: 12 };
  const footerCardSectionTokens: ICardSectionTokens = { padding: '0px 12px 0px 12px' };

  const siteTextStyles: ITextStyles = {
    root: {
      color: '#025F52',
      fontWeight: FontWeights.semibold,
      cursor: "pointer"
    },
  };
  const descriptionTextStyles: ITextStyles = {
    root: {
      color: '#333333',
      fontWeight: FontWeights.regular,
    },
  };
  const iconStyles: IIconStyles = {
    root: {
      color: '#0078D4',
      fontSize: 16,
      fontWeight: FontWeights.regular,
    },
  };
  const imageCardSectionStyles: ICardSectionStyles = {
    root: {
      alignSelf: 'stretch',
    },
  };
  const footerCardSectionStyles: ICardSectionStyles = {
    root: {
      alignSelf: 'stretch',
      borderLeft: '1px solid #F3F2F1',
    },
  };

  const facepileStyles: Partial<IFacepileStyles> = {
    root: {
      justifyContent: 'center',
      display: 'flex'
    }
  }

  const overflowButtonProps = {
    ariaLabel: 'More users',
    onClick: () => showModal(),
  };

  const clickableStyle: CSSProperties = {
    cursor: "pointer"
  }

  const personas: IFacepilePersona[] = team.members
    ? team.members.map(m => {
      console.log(m.imageUrl)
      return ({
        personaName: m.name,
        imageUrl: m.imageUrl ? process.env.PUBLIC_URL + m.imageUrl : null
      } as IFacepilePersona)
    }
    )
    : [];

  const slackLink = `slack://channel?team=${team.slackTeamId}&id=${team.slackChannelId}`;
  const imageUrl = team.imageUrl ? `${process.env.PUBLIC_URL}${team.imageUrl}` : 'https://placehold.it/120x120';

  return (
    <div style={{ display: 'block', zIndex: 10 }}>
      <div style={{ backgroundColor: 'white', zIndex: 10, display: 'block' }}>
        <Card horizontal tokens={cardTokens} className={team.shortName} >
          <Card.Section verticalAlign="center" styles={imageCardSectionStyles} >
            <Image src={imageUrl} alt="Placeholder image." style={clickableStyle} height={120} width={120} onClick={showModal} title='Show details' />
          </Card.Section>
          <Card.Section>
            <Text variant="small" styles={siteTextStyles} onClick={showModal} title='Show details'>{team.name}</Text>
            <Text styles={descriptionTextStyles}>{team.shortDescription}</Text>
            <Facepile
              styles={facepileStyles}
              personas={personas}
              maxDisplayablePersonas={7}
              overflowButtonType={OverflowButtonType.descriptive}
              overflowButtonProps={overflowButtonProps}
            />
          </Card.Section>
          <Card.Section tokens={footerCardSectionTokens} styles={footerCardSectionStyles}>
            <Icon iconName="Info" styles={iconStyles} onClick={showModal} style={clickableStyle} title='Show details' />
            {team.slackTeamId && team.slackChannelId &&
              <Link title='Contact us via Slack' href={slackLink}>
                <Image src={require('../images/slack.png')} alt='Contact us via Slack' width={16}></Image>
              </Link>
            }
          </Card.Section>
          <TeamModal team={team} isOpen={isModalOpen} hideModal={hideModal} />
        </Card>
      </div>
    </div>
  );
}