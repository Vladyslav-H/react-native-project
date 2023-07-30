export const selectUserId = (state) => state.auth.userId;
export const selectUserEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.login;
export const selectUserPhoto = (state) => state.auth.photoUrl;
export const selectToken = (state) => Boolean(state.auth.token);
