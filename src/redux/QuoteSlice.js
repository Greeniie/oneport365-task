import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { QuoteService } from "../services/QuoteService";

export const getAllQuotes = createAsyncThunk(
  "quotes/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await QuoteService.getAll();
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getOneQuote = createAsyncThunk(
  "quotes/getOne",
  async (data, { rejectWithValue }) => {
    try {
      const response = await QuoteService.getOne(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const createQuote = createAsyncThunk(
  "quotes/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await QuoteService.createQuote(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const editQuote = createAsyncThunk(
  "quotes/edit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await QuoteService.editQuote(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const saveDraft = createAsyncThunk(
  "quotes/saveDraft",
  async (data, { rejectWithValue }) => {
    try {
      // Save draft data to localStorage
      localStorage.setItem("draftQuote", JSON.stringify(data));
      return { message: "Draft saved successfully" };
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  data: [],
  singleData: {},
  loading: false,
  error: false,
  message: "",
  draft: null, // State to hold draft data
};

const slice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    checkAll: (state) => {
      state.isChecked = !state.isChecked;
    },
    resetSingleData: (state) => {
      state.singleData = {};
    },
    setDraft: (state, action) => {
      state.draft = action.payload;
    },
    clearDraft: (state) => {
      state.draft = null;
      localStorage.removeItem("draftQuote");
    },
  },
  extraReducers: {
    [getAllQuotes.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true;
      }
    },
    [getAllQuotes.fulfilled]: (state, action) => {
      state.error = false;
      state.data = action.payload;
      state.loading = false;
    },
    [getAllQuotes.rejected]: (state, action) => {
      state.error = true;
      state.message = action.payload;
      state.loading = false;
    },

    [getOneQuote.pending]: (state) => {
      state.loading = true;
    },
    [getOneQuote.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
      state.loading = false;
      state.singleData = payload;
    },
    [getOneQuote.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
      state.loading = false;
    },

    [createQuote.pending]: (state) => {
      state.loading = true;
    },
    [createQuote.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
      state.loading = false;
    },
    [createQuote.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
      state.loading = false;
    },

    [editQuote.pending]: (state) => {
      state.loading = true;
    },
    [editQuote.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
      state.loading = false;
    },
    [editQuote.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
      state.loading = false;
    },

    [saveDraft.pending]: (state) => {
      state.loading = true;
    },
    [saveDraft.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
      state.loading = false;
    },
    [saveDraft.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
      state.loading = false;
    },
  },
});

export const { resetSingleData, setDraft, clearDraft } = slice.actions;
export default slice.reducer;
