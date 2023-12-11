import { registerUser } from './auth';

global.fetch = jest.fn();

describe('registerUserThunk', () => {
  it('should registerUser with resolved response', async () => {
    const mockUserData = {
      email: 'test@test.ru',
      password: '123456',
      name: 'Natalia',
    };
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

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUserResponse),
    });
    const dispatch = jest.fn();
    const thunk = registerUser(mockUserData);

    await thunk(dispatch, () => ({}));
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;
    expect(start[0].type).toBe(registerUser.pending().type);
    expect(end[0].type).toBe(registerUser.fulfilled().type);
    expect(end[0].payload).toBe(mockUserResponse);
  });

  it('should registerUser with rejected response', async () => {
    const mockUserData = {
      email: 'test@test.ru',
      password: '123456',
      name: 'Natalia',
    };
    fetch.mockResolvedValue({
      ok: false,
    });
    const dispatch = jest.fn();
    const thunk = registerUser(mockUserData);

    await thunk(dispatch, () => ({}));
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(registerUser.pending().type);
    expect(end[0].type).toBe(registerUser.rejected().type);
    expect(end[0].meta.requestStatus).toBe('rejected');
  });
});
