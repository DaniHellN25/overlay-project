import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useTranslation } from 'react-i18next';

export default function SucessAlert() {
  const { t } = useTranslation();
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" className='absolute top-0 right-0 z-50'>
      <strong>{t('alert.success')}</strong>
    </Alert>
  );
}
