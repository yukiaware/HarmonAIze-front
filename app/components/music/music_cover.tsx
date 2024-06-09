//@ts-nocheck
import { Box } from '@mui/material'
import Audiotrack from '@mui/icons-material/Audiotrack'
import { RotateLeft } from '@mui/icons-material'
import Image from 'next/image'

export default function MusicCover({ isLoading, src }) {
  return (
    <Box
      position="relative"
      width="100px"
      height="100px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      border="none"
      sx={{
        border: '1px solid',
        borderRadius: '4px',
      }}
      // borderColor="primary.main"
      margin={1}
    >
      <Image src={src} alt={'cover image'} fill />
      {isLoading ? (
        <RotateLeft
          sx={{
            animation: 'spin 2s linear infinite',
            '@keyframes spin': {
              '0%': {
                transform: 'rotate(360deg)',
              },
              '100%': {
                transform: 'rotate(0deg)',
              },
            },
          }}
        />
      ) : (
        <Audiotrack fontSize="large" color="primary" />
      )}
    </Box>
  )
}
