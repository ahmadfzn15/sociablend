declare namespace Auth {
  export interface Register {
    username?: string;
    email?: string;
    password: string;
    passwordConfirm: string;
  }
}
