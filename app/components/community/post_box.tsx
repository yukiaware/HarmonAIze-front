//@ts-nocheck
import { Box, Button, Fade, Grid, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import { AudioContext } from '@/app/context/audio_context'
import { useContext } from 'react'
import {
  AccountCircle,
  Chat,
  Favorite,
  FavoriteBorderOutlined,
} from '@mui/icons-material'
import { grey, red } from '@mui/material/colors'
import CommentItem from './comment_item'
import CommentInputBox from './comment_input_box'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import MusicCover from '../music/music_cover'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export default function PostBox({ postViewId, currentUsername }) {
  const { audioSrc, setAudioSrc } = useContext(AudioContext)
  // const [postViewData, setPostViewData] = useState(null)
  const queryClient = useQueryClient()
  const fetchPost = async (id, currentUsername) => {
    const res = await fetch(
      `api/community/post?id=${id}&username=${currentUsername}`,
      {
        method: 'GET',
      }
    )
    const resData = await res.json()
    return resData
    // setPostViewData(resData)
    // const dummyData = {
    //   id: 1,
    //   username: 'name',
    //   mediaTitle: 'mediaTitle',
    //   postTitle: 'post title',
    //   postContent: 'post content',
    //   mediaURL: 'url',
    //   numLikes: 5,
    //   hasLiked: false,
    //   commentList: [
    //     {
    //       id: 1,
    //       username: 'commenter',
    //       content: 'comment content',
    //       numLikes: 1,
    //       hasLiked: false,
    //     },
    //   ],
    // }
    // setPostViewData(dummyData)
  }

  // const handleLike = async () => {
  //   console.log('handlelike' + postViewId + ', ' + currentUsername)
  //   const res = await fetch(
  //     `/api/community/likePost?id=${postViewId}&username=${currentUsername}`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({}),
  //     }
  //   )
  //   const resData = await res.json()
  //   console.log(resData)
  // }

  const handleLike = useMutation({
    mutationFn: async () => {
      const previousPostData = queryClient.getQueryData(['post'])
      await queryClient.cancelQueries(['post'])
      queryClient.cancelQueries
      queryClient.setQueryData(['post'], () => {
        return {
          ...postViewData,
          hasLiked: !postViewData?.hasLiked,
        }
      })
      return { previousPostData }
    },
    onSuccess: () => {
      // Invalidate and refetch
      console.log('on success')
      queryClient.invalidateQueries({ queryKey: ['post'] })
      queryClient.invalidateQueries({ queryKey: ['postList'] })
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['post'], () => {
        return { ...context?.previousPostData }
      })
    },
  })

  const {
    data: postViewData,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['post'],
    queryFn: () => {
      if (!postViewId) return
      return fetchPost(postViewId, currentUsername)
    },
  })

  useEffect(() => {
    refetch()
  }, [postViewId])

  return (
    // <Fade in={true} timeout={{ enter: 600 }}>
    <Box
      borderLeft={1}
      borderColor={grey[400]}
      width="100%"
      height="100%"
      overflow="hidden"
    >
      <Box padding={4} width="100%" maxHeight="100%" overflow="auto">
        {!postViewData && (
          <Typography variant="h6">게시글을 선택하세요.</Typography>
        )}
        {postViewData && (
          <Grid container direction="column" gap={1}>
            <Grid container direction="row" alignItems="center" gap={2}>
              {postViewData.mediaType === 'audio' && (
                <Button
                  color="primary"
                  fontSize="large"
                  onClick={() => setAudioSrc(postViewData.mediaURL)}
                >
                  <MusicCover />
                </Button>
              )}
              {postViewData.mediaType === 'video' && (
                <Box>
                  <video src={postViewData.mediaURL} />
                </Box>
              )}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" fontWeight="500">
                  {postViewData.mediaTitle}
                </Typography>

                <Grid container direction="row" gap={1} alignItems="center">
                  <AccountCircle fontSize="medium" />
                  <Typography variant="body1">
                    {postViewData.username}
                  </Typography>
                </Grid>
              </Box>
            </Grid>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chat />
              <Typography variant="h5">{postViewData.postTitle}</Typography>
            </Box>
            <Typography variant="body1">{postViewData.postContent}</Typography>
            <Box display="flex" width="100%" justifyContent="space-evenly">
              <Grid container justifyContent="center" alignItems="center">
                <IconButton onClick={() => mutation.mutate()}>
                  {postViewData.hasLiked ? (
                    <Favorite sx={{ color: red[400] }} />
                  ) : (
                    <FavoriteBorderOutlinedIcon sx={{ color: red[400] }} />
                  )}
                </IconButton>
                <Typography variant="body1">{postViewData.numLikes}</Typography>
              </Grid>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                gap={1}
              >
                <ChatBubbleOutlineIcon />
                <Typography variant="body1">
                  {postViewData.commentList && postViewData.commentList.length}
                </Typography>
              </Grid>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 2,
                gap: 2,
              }}
            >
              <CommentInputBox
                postId={postViewId}
                currentUsername={currentUsername}
              />
              <Box>
                {postViewData.commentList &&
                  postViewData.commentList
                    .toReversed()
                    .map((e) => (
                      <CommentItem
                        key={e.id}
                        postId={postViewId}
                        commentId={e.id}
                        username={e.username}
                        content={e.content}
                        numLikes={e.numLikes}
                        hasLiked={e.hasLiked}
                        currentUsername={currentUsername}
                      />
                    ))}
              </Box>
            </Box>
          </Grid>
        )}
      </Box>
    </Box>
    // </Fade>
  )
}
