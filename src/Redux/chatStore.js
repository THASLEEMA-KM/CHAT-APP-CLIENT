// import { configureStore } from "@reduxjs/toolkit";
// import chatSlice from "./chatSlice";
// // import chatReducer from "./chatSlice";

// const chatStore =  configureStore({
//     reducer:{
//         chatReducer : chatSlice,
//         // chat: chatReducer,
//     }
// })

// export default chatStore

// import { configureStore } from "@reduxjs/toolkit";
// import chatReducer from "./chatSlice";

// export default configureStore({
//   reducer: {
//     chat: chatReducer,
//   },
// });

import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";

const chatStore = configureStore({
    reducer: {
        chat: chatReducer,  
    }
});

export default chatStore;



