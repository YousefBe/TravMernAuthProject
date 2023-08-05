import { createSlice } from '@reduxjs/toolkit'

const initState = {
    userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
};

const authSlice = createSlice({
    name : 'auth',
    initialState : initState,
    reducers:{
        setCredentials : (state , action)=>{
            console.log(action);
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        clearCredentials : (state)=>{
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
    }
})

export const {
    setCredentials,
    clearCredentials
} = authSlice.actions


export default authSlice.reducer