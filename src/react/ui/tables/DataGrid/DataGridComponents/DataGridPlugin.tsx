import { Plugin, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';
import { Box } from '@material-ui/core';
import React, {
  FC, memo, ReactNode, Fragment,
} from 'react';

// PLUGINS
export enum DataGridPluginPosition {
  left = 'left',
  rightEnd = 'right-end',
  rightStart = 'right-start',
  bottomRight = 'bottom-right',
  bottomLeft = 'bottom-left',
}

export interface DataGridPluginDefinition {
  key: string;
  children: ReactNode;
  position: DataGridPluginPosition;
}

export interface DataGridPluginsProps {
  plugins: DataGridPluginDefinition[];
}

const DataGridPlugins: FC<DataGridPluginsProps> = memo(({ plugins }) => (
  <Plugin>
    <Template name="toolbarContent">
      <Box
        width="100%"
      >
        <Box
          marginTop="10px"
          marginBottom="10px"
        >
          <Box
            display="flex"
            flexDirection="row-reverse"
          >
            <Box display="flex" flexDirection="row" width="100%" alignItems="center">
              {plugins.filter(p => (p.position === DataGridPluginPosition.rightStart)).map(p => (
                <Fragment key={p.key}>{p.children}</Fragment>
              ))}
              <TemplatePlaceholder />
              {plugins.filter(p => (p.position === DataGridPluginPosition.rightEnd)).map(p => (
                <Fragment key={p.key}>{p.children}</Fragment>
              ))}

            </Box>
          </Box>
        </Box>
        <Box
          width="100%"
        >

          <Box display="flex" flexDirection="row-reverse" width="100%">

            {plugins.filter(p => (p.position === DataGridPluginPosition.bottomLeft)).map(p => (
              <Box width="100%" key={p.key}>
                {p.children}
              </Box>
            ))}
            {plugins.filter(p => (p.position === DataGridPluginPosition.bottomRight)).map(p => (
              <Box width="100%">
                <Fragment key={p.key}>{p.children}</Fragment>
              </Box>
            ))}

          </Box>
        </Box>
      </Box>
    </Template>

  </Plugin>
));

export default DataGridPlugins;
