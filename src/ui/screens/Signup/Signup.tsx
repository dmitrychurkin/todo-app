import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createUserWithEmail } from 'infrastructure/AuthService';
import SignupForm, { getInitialValues } from 'ui/molecules/SignupForm';
import Auth from 'ui/templates/Auth';

import type { UserCredentials } from "infrastructure/AuthService";

const Signup = () => {
  const onSubmit = async (userCredentials: UserCredentials) => {
    // TODO: handle error
    await createUserWithEmail(userCredentials);
  };

  return (
    <Auth title="Sign up" icon={<LockOutlinedIcon />}>
      <SignupForm initialValues={getInitialValues()} onSubmit={onSubmit} />
    </Auth>
  );
};

export default Signup;
