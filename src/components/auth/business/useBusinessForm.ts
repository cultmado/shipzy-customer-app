import { inject } from 'vue';
import { businessFormKey, type BusinessRegistrationForm } from '@/data/auth';

/** The registration form provided by RegisterBusinessPage. */
export function useBusinessForm(): BusinessRegistrationForm {
  const form = inject(businessFormKey);
  if (!form) throw new Error('useBusinessForm() must be used inside RegisterBusinessPage');
  return form;
}
