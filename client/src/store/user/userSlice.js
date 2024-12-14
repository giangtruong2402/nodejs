import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
    isloading: false,
    currentCart: [],
    mes: "",
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.current = null;
      state.currentCart = null;
      state.isloading = false;
      state.mes = "";
    },
    updateCart: (state, action) => {
      const { pid, color, quantity } = action.payload;
      const updatingCart = JSON.parse(JSON.stringify(state.currentCart));
      state.currentCart = updatingCart.map((el) => {
        if (el.color === color && el.product?._id === pid)
          return { ...el, quantity };
        else return el;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getCurrent.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
      state.isloading = false;
      state.current = action.payload;
      state.currentCart = action.payload.cart;
      state.isLoggedIn = true;
    });
    builder.addCase(actions.getCurrent.rejected, (state, action) => {
      state.isloading = false;
      state.current = null;
      state.currentCart = null;
      state.isLoggedIn = false;
      state.token = null;
      state.mes = "Phên đăng nhập đã hết hạn. Hãy đăng nhập lại";
    });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
