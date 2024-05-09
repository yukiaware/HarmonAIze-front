//@ts-nocheck
import * as React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Provider from './provider'
import { ColorModeButton } from './components/toggle_color_mode'
import NavBar from './components/nav_bar'
import AudioPlayerBottom from './components/audio_player_bottom'
import SideBar from './components/side_bar'
import { Box, Grid } from '@mui/material'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <SideBar />
          <NavBar />
          <Box marginLeft={{ default: '0px', sm: '160px' }}>{children}</Box>
          <AudioPlayerBottom />
        </Provider>
      </body>
    </html>
  )
}
