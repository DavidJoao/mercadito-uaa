import axios from 'axios'

export const registerUser = async (user) => {
    try { 
        return await axios.post("/api/user-signup", user, { headers: { "Content-Type": "application/json" } })
    } catch (error) {
        return { error: true, msg: error && error.response.data.error }
    }
}