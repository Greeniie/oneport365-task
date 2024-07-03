import { combineReducers } from "@reduxjs/toolkit";
import quotes from "../QuoteSlice";
import modal from "../ModalSlice";


const rootReducer = combineReducers({
  quotes,
  modal,
});

export default rootReducer;
