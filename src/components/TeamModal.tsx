import React from 'react';
import { ITeam } from '../models/ITeam';
import { getTheme, mergeStyleSets, FontWeights, Modal, IconButton, IIconProps, Stack, Persona, PersonaSize, Image, IPersonaStyles, DefaultButton, IImageStyles } from 'office-ui-fabric-react';

interface ITeamModalProps {
    team: ITeam,
    isOpen: boolean,
    hideModal: () => void;
}
export const TeamModal: React.FunctionComponent<ITeamModalProps> = ({ team, isOpen, hideModal }) => {

    const theme = getTheme();
    const contentStyles = mergeStyleSets({
        container: {
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'stretch',
            maxWidth: '1140px',
        },
        header: [
            theme.fonts.xLarge,
            {
                flex: '1 1 auto',
                borderTop: `4px solid ${theme.palette.themePrimary}`,
                color: theme.palette.neutralPrimary,
                display: 'flex',
                alignItems: 'center',
                fontWeight: FontWeights.semibold,
                padding: '12px 12px 0px 24px',
            },
        ],
        body: {
            flex: '4 4 auto',
            padding: '0 24px 24px 24px',
            overflowY: 'hidden',
            selectors: {
                p: { margin: '14px 0' },
                'p:first-child': { marginTop: 0 },
                'p:last-child': { marginBottom: 0 },
                h4: { marginBottom: 5 }
            },
        },
    });
    const cancelIcon: IIconProps = { iconName: 'Cancel' };
    const iconButtonStyles = {
        root: {
            color: theme.palette.neutralPrimary,
            marginLeft: 'auto',
            marginTop: '4px',
            marginRight: '2px',
        },
        rootHovered: {
            color: theme.palette.neutralDark,
        },
    };

    const personaStyle: Partial<IPersonaStyles> = {
        root: {
            margin: '10px 5px'
        }
    };

    const personaWithEmailStyle: Partial<IPersonaStyles> = {
        root: {
            margin: '10px 5px',
            cursor: "pointer"
        }
    };

    const slackLinkStyle: Partial<IImageStyles> = {
        root: {
            marginRight: 10
        }
    };

    const slackLink = `slack://channel?team=${team.slackTeamId}&id=${team.slackChannelId}`;

    return (
        <Modal
            isOpen={isOpen}
            onDismiss={hideModal}
            isBlocking={false}
            containerClassName={contentStyles.container}
        >
            <div className={contentStyles.header}>
                <span>{team.name}</span>
                <IconButton
                    styles={iconButtonStyles}
                    iconProps={cancelIcon}
                    ariaLabel="Close popup modal"
                    onClick={hideModal}
                />
            </div>
            <div className={contentStyles.body}>
                <p style={{ fontStyle: 'italic' }}>{team.shortDescription}</p>
                <p>{team.description}</p>
                {team.slackTeamId && team.slackChannelId &&
                    <DefaultButton allowDisabledFocus href={slackLink}>
                        <Image src={require('../images/slack.png')} alt='Contact us via Slack' width={20} styles={slackLinkStyle} />
                        <span>Contact us via Slack</span>
                    </DefaultButton>
                }

                <h4>Team Members</h4>
                <Stack horizontal wrap>
                    {team.members
                        ? team.members.map((member, i) =>
                            <Persona
                                key={member.name + i}
                                size={PersonaSize.size48}
                                text={member.name}
                                secondaryText={member.role}
                                onClick={() => window.location.href = `mailto:${member.email}`}
                                title={member.email ? member.email : undefined}
                                tertiaryText={member.email}
                                imageAlt={member.name}
                                styles={member.email ? personaWithEmailStyle : personaStyle}
                                imageUrl={member.imageUrl ? process.env.PUBLIC_URL + member.imageUrl : undefined}
                            />
                        )
                        : null}
                </Stack>
            </div>
        </Modal>
    );
}