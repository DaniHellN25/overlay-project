import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function SucessAlert() {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" className='absolute top-0 right-0 z-50'>
      <strong>Configuration saved</strong>
    </Alert>
  );
}
