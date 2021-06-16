import { Typography } from '@material-ui/core';
import { FC, ReactElement } from 'react';
import { IConfiguration } from '../../models/IConfiguration';
import './OrgDetails.css'


interface OrgDetailsProps {
    config: IConfiguration
}

export const OrgDetails: FC<OrgDetailsProps> = ({ config }): ReactElement => {
    return (
        <div>
            {config.orgShortDescription &&
                <Typography variant="h6" style={{ fontStyle: 'italic' }}>
                    {config.orgShortDescription}
                </Typography>

            }
            {config.orgDescription &&
                <div dangerouslySetInnerHTML={{ __html: config.orgDescription! }}>
                </div>
            }

            {/* TODO: Add people from highest circle if only one parent exists */}
        </div>
    );
}

