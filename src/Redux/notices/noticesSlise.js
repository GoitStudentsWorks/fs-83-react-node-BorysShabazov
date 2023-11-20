import { createSlice } from '@reduxjs/toolkit';
import { createNotice, deleteNotice, fetchNotices } from './noticesOperation';

const initialNotices = {
  items: [],
  isLoading: false,
  error: null,
};

const rejectFunc = (state, action) => {
  return {
    items: state.items,
    isLoading: false,
    error: action.payload,
  };
};
const pendingFunc = (state) => {
  return {
    items: state.items,
    isLoading: true,
    error: null,
  };
};

const noticesStateSlice = createSlice({
  name: 'notices',
  initialState: initialNotices,

  extraReducers: (builder) => {
    // fetch

    builder.addCase(fetchNotices.pending, pendingFunc);
    builder.addCase(fetchNotices.fulfilled, (_, action) => {
      return {
        items: [...action.payload],
        isLoading: false,
        error: null,
      };
    });
    builder.addCase(fetchNotices.rejected, rejectFunc);

    // create

    builder.addCase(createNotice.pending, pendingFunc);
    builder.addCase(createNotice.fulfilled, (state, _) => {
      return {
        items: state.items,
        isLoading: false,
        error: null,
      };
    });
    builder.addCase(createNotice.rejected, rejectFunc);

    // delete

    builder.addCase(deleteNotice.pending, pendingFunc);
    builder.addCase(deleteNotice.fulfilled, (state, action) => {
      return {
        items: [...state.items.filter((el) => el.id !== action.payload)],
        isLoading: false,
        error: null,
      };
    });
    builder.addCase(deleteNotice.rejected, rejectFunc);
  },
});

export const noticesStateReducer = noticesStateSlice.reducer;
