import { resetPasswordSlice, resetPassword, setNewPasswordSlice, setNewPassword } from './resetPassword';

const initialState = {
  loadingStatus: 'idle',
  error: null,
};

describe('resetPasswordSlice', () => {
  it('should change status with resetPassword.pending action', () => {
    const state = resetPasswordSlice.reducer(initialState, resetPassword.pending());
    expect(state.loadingStatus).toBe('loading');
    expect(state.error).toBe(null);
  });
  it('should change status with getBurgerIngredients.fulfilled action', () => {

    const state = resetPasswordSlice.reducer(
      initialState,
      resetPassword.fulfilled()
    );
    expect(state).toEqual({
      loadingStatus: 'resolved',
      error: null,
    });
  });
  it('should change status with resetPassword.rejected action', () => {
    const state = resetPasswordSlice.reducer(
      initialState,
      resetPassword.rejected()
    );
    expect(state).toEqual({
      loadingStatus: 'failed',
      error: { message: 'Rejected' }
    });
  });
});

const initialStateSetNewPassword = {
  loadingStatus: 'idle',
  error: null,
};

describe('setNewPasswordSlice', () => {
  it('should change status with setNewPassword.pending action', () => {
    const state = setNewPasswordSlice.reducer(initialStateSetNewPassword, setNewPassword.pending());
    expect(state.loadingStatus).toBe('loading');
    expect(state.error).toBe(null);
  });
  it('should change status with setNewPassword.fulfilled action', () => {

    const state = setNewPasswordSlice.reducer(
      initialStateSetNewPassword,
      setNewPassword.fulfilled()
    );
    expect(state).toEqual({
      loadingStatus: 'resolved',
      error: null,
    });
  });
  it('should change status with setNewPassword.rejected action', () => {
    const state = setNewPasswordSlice.reducer(
      initialStateSetNewPassword,
      setNewPassword.rejected()
    );
    expect(state).toEqual({
      loadingStatus: 'failed',
      error: { message: 'Rejected' }
    });
  });
});

