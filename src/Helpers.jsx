export const headerTokenConfig = {
    headers: { Authorization: `Bearer ${localStorage.getItem('user_token')}` }
};