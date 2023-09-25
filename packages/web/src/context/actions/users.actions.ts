export const usersActions = {
  loginUser
}

function loginUser(userName: string) {
  return { type: 'USER_LOGIN', value: userName }
}