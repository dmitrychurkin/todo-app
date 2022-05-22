import GoogleIcon from '@mui/icons-material/Google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';
import { signInWithEmail, signInWithGoogle, UserCredentials } from 'infrastructure/AuthService';
import Notification, { useNotification } from 'ui/atoms/Notification';
import SigninForm, { getInitialValues } from 'ui/molecules/SigninForm';
import Auth from 'ui/templates/Auth';

const Login = () => {
  const { onClose, onOpen, message } = useNotification();

  const handleEmailLogin = async (userCredentials: UserCredentials) => {
    // TODO: handle error
    try {
      await signInWithEmail(userCredentials);
    } catch (e) {
      console.dir(e);
      onOpen(e as Error);
    }
  };

  const handleGoogleLogin = async () => {
    // TODO: handle error
    try {
      await signInWithGoogle();
    } catch (e) {
      console.dir(e);
      onOpen(e as Error);
    }
  };

  return (
    <>
      <Auth title="Sign in" icon={<LockOutlinedIcon />}>
        <SigninForm
          initialValues={getInitialValues()}
          onSubmit={handleEmailLogin}
        >
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleGoogleLogin}
          >
            <GoogleIcon />
          </Button>
        </SigninForm>
      </Auth>
      <Notification
        open={Boolean(message)}
        onClose={onClose}
        alertProps={{
          severity: "error",
        }}
      >
        <>{message?.message}</>
      </Notification>
    </>
  );
};

export default Login;
