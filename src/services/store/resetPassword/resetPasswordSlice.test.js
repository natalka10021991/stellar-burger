import { resetPassword, setNewPassword } from './resetPassword';

global.fetch = jest.fn();

describe('resetPasswordThunk', () => {
  it('should resetPassword with resolved response', async () => {
    const mockData = { email: 'test@test.ru' };
    const mockResponse = { success: true, message: 'Reset email sent' };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });
    const dispatch = jest.fn();
    const thunk = resetPassword(mockData);

    await thunk(dispatch, () => ({}));
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);
    const [start, end] = calls;
    expect(start[0].type).toBe(resetPassword.pending().type);
    expect(end[0].type).toBe(resetPassword.fulfilled().type);
  });

  it('should resetPassword with rejected response', async () => {
    fetch.mockResolvedValue({
      ok: false,
    });
    const dispatch = jest.fn();
    const thunk = resetPassword();

    await thunk(dispatch, () => ({}));
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(resetPassword.pending().type);
    expect(end[0].type).toBe(resetPassword.rejected().type);
    expect(end[0].meta.requestStatus).toBe('rejected');
  });
});

describe('setNewPassword', () => {
  it('should setNewPassword with resolved response', async () => {
    const mockData = { password: '123456', token: 'b705dad6-30b4-471c-bd58-98a220485351' };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(),
    });
    const dispatch = jest.fn();
    const thunk = setNewPassword(mockData);

    await thunk(dispatch, () => ({}));
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);
    const [start, end] = calls;
    expect(start[0].type).toBe(setNewPassword.pending().type);
    expect(end[0].type).toBe(setNewPassword.fulfilled().type);
  });

  it('should setNewPassword with rejected response', async () => {
    fetch.mockResolvedValue({
      ok: false,
    });
    const dispatch = jest.fn();
    const thunk = setNewPassword();

    await thunk(dispatch, () => ({}));
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(setNewPassword.pending().type);
    expect(end[0].type).toBe(setNewPassword.rejected().type);
    expect(end[0].meta.requestStatus).toBe('rejected');
  });
});