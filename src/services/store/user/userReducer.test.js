import { userSlice, getUser, updateUserData, logoutUser } from './user';

const initialState = {
  loadingStatus: 'idle',
  error: null,
  user: {
    email: '',
    name: '',
  },
};

describe('userSlice', () => {
  it('should change status with getUser.pending action', () => {
    const state = userSlice.reducer(initialState, getUser.pending());
    expect(state.loadingStatus).toBe('loading');
    expect(state.error).toBe(null);
  });
  it('should change status with getUser.fulfilled action', () => {
    const mockResponce = {
      success: true,
      user: { email: 'natalka91@bk.ru', name: 'Наталья Быстровf' },
    };
    const state = userSlice.reducer(initialState, getUser.fulfilled({ user: mockResponce.user }));
    expect(state).toEqual({
      user: mockResponce.user,
      loadingStatus: 'resolved',
      error: null,
    });
  });
  it('should change status with getUser.rejected action', () => {
    const state = userSlice.reducer(initialState, getUser.rejected());
    expect(state).toEqual({
      user: {
        email: '',
        name: '',
        password: '',
      },
      loadingStatus: 'jwt expired',
      error: { message: 'Rejected' },
    });
  });

  it('should change status with updateUserData.pending action', () => {
    const state = userSlice.reducer(initialState, updateUserData.pending());
    expect(state.loadingStatus).toBe('patchingIsLoading');
    expect(state.error).toBe(null);
  });
  it('should change status with updateUserData.fulfilled action', () => {
    const mockResponce = {
      success: true,
      user: { email: 'natalka91@bk.ru', name: 'Наталья Быстровf' },
    };
    const state = userSlice.reducer(
      initialState,
      updateUserData.fulfilled({ user: mockResponce.user })
    );
    console.log(state);
    expect(state).toEqual({
      user: mockResponce.user,
      loadingStatus: 'resolved',
      error: null,
    });
  });
  it('should change status with updateUserData.rejected action', () => {
    const state = userSlice.reducer(initialState, updateUserData.rejected());
    expect(state).toEqual({
      user: {
        email: '',
        name: '',
        password: '',
      },
      loadingStatus: 'failed',
      error: { message: 'Rejected' },
    });
  });

  it('should change status with logoutUser.fulfilled action', () => {
    const state = userSlice.reducer(initialState, logoutUser.fulfilled());
    expect(state).toEqual({
      user: {
        email: '',
        name: '',
        password: '',
      },
      loadingStatus: 'userLoggedOut',
      error: null,
    });
  });
  it('should change status with logoutUser.rejected action', () => {
    const state = userSlice.reducer(initialState, logoutUser.rejected());
    console.log(state);

    expect(state).toEqual({
      loadingStatus: 'failed',
      error: { message: 'Rejected' },
      user: {
        email: '',
        name: '',
      },
    });
  });
});
