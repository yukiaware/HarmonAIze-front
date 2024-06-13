//@ts-nocheck
'use client'
import { Box, Typography } from '@mui/material'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { useContext, useRef } from 'react'
import { AudioContext } from '../../context/audio_context'
import { useSession } from 'next-auth/react'
import { FormatAlignJustify } from '@mui/icons-material'

export default function AudioPlayerBottom() {
  const { audioData, setAudioData } = useContext(AudioContext)

  const { data: session, status } = useSession()

  if (status != 'authenticated') {
    return <></>
  }
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: '32px',
          margin: '8px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {audioData?.title} {audioData?.username}
        </Typography>
        <AudioPlayer
          // ref={audioPlayerRef}
          autoPlay
          src={audioData?.audioSrc}
          onPlay={(e) => console.log('onPlay')}
          style={{
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.0)',
            border: '0px',
            boxShadow: '0px',
          }}
        />
      </Box>
    </Box>
  )
}
