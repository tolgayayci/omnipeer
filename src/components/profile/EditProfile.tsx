// ** React Imports
import { Ref, useState, forwardRef, ReactElement, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Amplify Imports
import { API, graphqlOperation } from "aws-amplify";
import { updateUser } from "../../graphql/mutations";

import { useAppSelector, useAppDispatch } from 'src/store/hooks'
import { UpdateUserInput, User } from 'src/API'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface EditUserProfileProps {
    show: boolean
}

const EditUserProfile = (props: EditUserProfileProps) => {
  // ** States
  const [show, setShow] = useState<boolean>(false)
  const [languages, setLanguages] = useState<string[]>([])
  const [name, setName] = useState<string>('')

  const user = useAppSelector((state) => state.user)
  const node = useAppSelector((state) => state.node.node)

  const handleChange = (event: SelectChangeEvent<typeof languages>) => {
    const {
      target: { value }
    } = event
    setLanguages(typeof value === 'string' ? value.split(',') : value)
  }

  const handleUpdateUser = async () => {

    if(name === '') {
        console.log("No changes")
    }
    else{
        const input: UpdateUserInput = {
            owner: user.owner,
            fullName: name,
        }
    
        try {
            await API.graphql(graphqlOperation(updateUser, { input }))
            setShow(false)
        } catch (error) {
            console.log(error)
        }
    }
  }

  useEffect(() => {
    setShow(props.show)
    console.log(user)
  }, [props.show])

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton
            size='small'
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Close />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              Edit User Information
            </Typography>
            <Typography variant='body2'>Updating user details will receive a privacy audit.</Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item sm={12} xs={12}>
              <TextField fullWidth defaultValue={user.fullName?.split(" ")[0]} label='Name' placeholder='John' onChange={(e) => setName(e.target.value)}/>
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                fullWidth
                label='Email'
                defaultValue={user.email}
                disabled
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                fullWidth
                label='Peer ID'
                defaultValue={node?.peerId.toString()}
                disabled
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='contained' sx={{ mr: 2 }} onClick={handleUpdateUser}>
            Update User
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default EditUserProfile
