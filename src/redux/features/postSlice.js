import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//imports for slice are createSlice and createAsyncThunk for the api call

//create an asyncThunk and a slice for each action that requires an api call
export const createUserPost = createAsyncThunk('createPost', async () => {
    return fetch('apiAddressCall', {
        method: 'Post',
    }).then((res) => res.json());
});

export const fetchPost = createAsyncThunk('getPost', async ({ id }) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(
        (res) => res.json()
    );
});

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: [],
        loading: false,
        error: null,
    },
    extraReducers: {// three promise lifecycle is handled by each of the three extra reducers for each fetch call
        [fetchPost.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = [action.payload];
        },
        [fetchPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default postSlice.reducer;
