export interface AccountFormValues {
  email: string;
  username?: string;
  password: string;
  passwordConfirm?: string;
  avatar?: FileList;
}

export interface StatusReturns {
  ok: boolean;
}
