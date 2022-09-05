//import configure the store
import { configureStore } from '@reduxjs/toolkit';
import PostReducer from './features/postSlice';//this, apparently, === postSlice.reducer >> if it's exported as default, you can name it anything in the import (which makes me uncomfortable coz you're like 'where the eff is that in the code')

//export default and use it to configure by pairing the app with a reducer
export default configureStore({
    reducer: {
        app: PostReducer,
    },
});
