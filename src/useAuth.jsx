import axios from "axios";
import * as React from "react";

const authContext = React.createContext();

function useAuth() {
    const [authenticated, setAuthenticated] = React.useState(false)

    return {
        authenticated,
        async login(email, password) {
            return await axios.post('/auth/login', {
                email, password
            }).then(res => {
                setAuthenticated(true)
                return res;
            })
                .catch(err => err);
        },
        async logout(token) {
            return await axios.post('/auth/login', {}, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => res)
                .catch(err => err);
        },
        async getAccount(token) {
            return await axios.get('/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => res)
                .catch(err => err);
        }
    }
}

export const AuthProvider = ({ children }) => {
    const auth = useAuth();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export default function AuthConsumer() {
    return React.useContext(authContext);
}