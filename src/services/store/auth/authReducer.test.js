import { registerUserSlice, registerUser } from './auth';

const initialState = {
  loadingStatus: 'idle',
  error: null,
  isAuthenticated: false,
  user: {
    email: '',
    name: '',
  },
};

describe('registerUserSlice', () => {
  it('should change status with registerUser.pending action', () => {
    const state = registerUserSlice.reducer(initialState, registerUser.pending());
    expect(state.loadingStatus).toBe('loading');
    expect(state.error).toBe(null);
  });
  it('should change status with getBurgerIngredients.fulfilled action', () => {
    const mockUserResponse = [
      {
        success: true,
        user: {
          email: 'ucar-owner@mail.ru',
          name: 'Oleg',
        },
        accessToken:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzM3YWQ3N2ZkNjU3MDAxYmEwN2IyZCIsImlhdCI6MTcwMjA2NjkwMywiZXhwIjoxNzAyMDY4MTAzfQ._SsvKlT9uvnC5Li1ybCvgH3-3CZJkecp2DYCalJOcvI',
        refreshToken:
          '2e67a56eafd881d92e79246c5962ac883e549680ec889e49854ffe333d2d73df87a2ed36b4bee653',
      },
    ];
    const state = registerUserSlice.reducer(
      initialState,
      registerUser.fulfilled({ user: mockUserResponse })
    );

    expect(state).toEqual({
      user: mockUserResponse,
      loadingStatus: 'resolved',
      error: null,
      isAuthenticated: true,
    });
  });
  it('should change status with registerUser.rejected action', () => {
    const state = registerUserSlice.reducer(initialState, registerUser.rejected());
    expect(state).toEqual({
      user: {
        email: '',
        name: '',
      },
      loadingStatus: 'failed',
      isAuthenticated: false,
      error: { message: 'Rejected' },
    });
  });
});
