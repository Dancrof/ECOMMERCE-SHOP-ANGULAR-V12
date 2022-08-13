export interface AuthInterface {
  status: number, 
  token_acces: string
  user: {
    email: string,
    password: string
  }
}
