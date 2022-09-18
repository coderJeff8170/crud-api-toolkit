import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//imports for slice are createSlice and createAsyncThunk for the api call

//create an asyncThunk and a slice for each action that requires an api call
export const createPost = createAsyncThunk(
    'post/createPost',
    async ({ values }) => {
        return fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                title: values.title,
                body: values.body,
            }),
        }).then((res) => res.json());
    }
);

export const fetchPost = createAsyncThunk('post/getPost', async ({ id }) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(
        (res) => res.json()
    );
});

export const updatePost = createAsyncThunk(
    'post/updatePost',
    async ({ id, title, body }) => {
        return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                title,
                body,
            }),
        }).then((res) => res.json());
    }
);

export const deletePost = createAsyncThunk(
    'post/deletePost',
    async ({ id }) => {
        return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        }).then((res) => res.json());
    }
);

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: [],
        loading: false,
        error: null,
        body: '', //need a place to store the body for updating, and an edit mode so that the app knows the post is to be edited.
        edit: false,
    },
    reducers: {
        // these work just like reducers the old way of using redux..
        setEdit: (state, action) => {
            state.edit = action.payload.edit;//here, we are getting an altering of the body text and the state of the edit mode associated with updating a single post
            state.body = action.payload.body;
        },
    },
    extraReducers: {
        // three promise lifecycle is handled by each of the three extra reducers for each fetch call
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
        [deletePost.pending]: (state, action) => {
            state.loading = true;
        },
        [deletePost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = action.payload;
        },
        [deletePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [createPost.pending]: (state, action) => {
            state.loading = true;
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = [action.payload];
        },
        [createPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [updatePost.pending]: (state, action) => {
            state.loading = true;
        },
        [updatePost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = [action.payload];
        },
        [updatePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { setEdit } = postSlice.actions;//interestingly, you export setEdit not from the reducers property, but an 'actions' property

export default postSlice.reducer;
