import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import { useDispatch } from 'react-redux';

export default function SnackbarModal({ flag }) {
  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);
  // const dispatch = useDispatch();

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      console.log('if');
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo]);

  const handleClick = (message) => {
    console.log(message);
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  React.useEffect(() => {
    handleClick(flag);
  }, [flag]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    // dispatch(setFlagSnackbarThunk());
    // setOpen(false);
    // };

    const handleExited = () => {
      setMessageInfo(undefined);
    };

    return (
      <div>
        {/* <Button onClick={() => handleClick(flag)}>Show message A</Button> */}
        <Snackbar
          key={messageInfo ? messageInfo.key : undefined}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          TransitionProps={{ onExited: handleExited }}
          message={messageInfo ? messageInfo.message : undefined}
          action={
            <>
              <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
              </Button>
              <IconButton
                aria-label="close"
                color="inherit"
                sx={{ p: 0.5 }}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </>
        }
        />
      </div>

    );
  };
}
