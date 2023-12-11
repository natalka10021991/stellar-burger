import { getUser, updateUserData, loginUser, logoutUser } from './user';

global.fetch = jest.fn();

describe('user/getUserThunk', () => {
  it('should getUser with resolved response', async () => {
    const mockResponce = {
      success: true,
      user: { email: 'natalka91@bk.ru', name: 'Наталья Быстровf' },
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponce),
    });
    const dispatch = jest.fn();
    const thunk = getUser();

    await thunk(dispatch, () => ({}));
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;
    expect(start[0].type).toBe(getUser.pending().type);
    expect(end[0].type).toBe(getUser.fulfilled().type);
    expect(end[0].payload).toBe(mockResponce);
  });

  it('should getUser with rejected response', async () => {
    fetch.mockResolvedValue({
      ok: false,
    });
    const dispatch = jest.fn();
    const thunk = getUser();

    await thunk(dispatch, () => ({}));
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(getUser.pending().type);
    expect(end[0].type).toBe(getUser.rejected().type);
    expect(end[0].meta.requestStatus).toBe('rejected');
  });
});

describe('user/updateUser', () => {
  it('should updateUserData with resolved response', async () => {
    const mockData = {
      email: 'test@test.ru',
      name: 'Natalia',
    };
    const mockResponce = {
      success: true,
      user: { email: 'natalka91@bk.ru', name: 'Наталья Быстровa' },
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponce),
    });
    const dispatch = jest.fn();
    const thunk = updateUserData(mockData);

    await thunk(dispatch, () => ({}));
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;
    expect(start[0].type).toBe(updateUserData.pending().type);
    expect(end[0].type).toBe(updateUserData.fulfilled().type);
    expect(end[0].payload).toBe(mockResponce);
  });

  it('should updateUserData with rejected response', async () => {
    const mockData = {
      email: 'test@test.ru',
      name: 'Natalia',
    };
    fetch.mockResolvedValue({
      ok: false,
    });
    const dispatch = jest.fn();
    const thunk = updateUserData(mockData);

    await thunk(dispatch, () => ({}));
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(updateUserData.pending().type);
    expect(end[0].type).toBe(updateUserData.rejected().type);
    expect(end[0].meta.requestStatus).toBe('rejected');
  });
});

describe('loginUser', () => {
  it('should loginUser with resolved response', async () => {
    const mockData = {
      email: 'test@test.ru',
      password: '123456',
    };
    const mockResponce = {
      success: true,
      accessToken:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzY0YzY4NTJiNGNmMDAxZDg2Y2E0ZSIsImlhdCI6MTcwMjA3MjQwNSwiZXhwIjoxNzAyMDczNjA1fQ.GY9xbNEASjh1O8q9_eX8YIh8ZoqzpiW7IvX0EE_rVZc',
      refreshToken:
        '6edddac2b4cb27aed585dca590688945f3e5b7279cc2cc2c78fadbc929463c8f3ebe30db56c1f8bd',
      user: {
        email: 'natalka91@bk.ru',
        name: 'Наталья Быстровa',
      },
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponce),
    });
    const dispatch = jest.fn();
    const thunk = loginUser(mockData);

    await thunk(dispatch, () => ({}));
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;
    expect(start[0].type).toBe(loginUser.pending().type);
    expect(end[0].type).toBe(loginUser.fulfilled().type);
    expect(end[0].payload).toBe(mockResponce);
  });

  it('should loginUser with rejected response', async () => {
    const mockData = {
      email: 'test@test.ru',
      name: 'Natalia',
    };
    fetch.mockResolvedValue({
      ok: false,
    });
    const dispatch = jest.fn();
    const thunk = loginUser(mockData);

    await thunk(dispatch, () => ({}));
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(loginUser.pending().type);
    expect(end[0].type).toBe(loginUser.rejected().type);
    expect(end[0].meta.requestStatus).toBe('rejected');
  });
});


describe('logoutUser', () => {
  it('should logoutUser with resolved response', async () => {

    const mockResponce = {"success":true,"message":"Successful logout"}

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponce),
    });
    const dispatch = jest.fn();
    const thunk = logoutUser();

    await thunk(dispatch, () => ({}));
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;
    expect(start[0].type).toBe(logoutUser.pending().type);
    expect(end[0].type).toBe(logoutUser.fulfilled().type);
    expect(end[0].payload).toBe(mockResponce);
  });

  it('should logoutUser with rejected response', async () => {

    fetch.mockResolvedValue({
      ok: false,
    });
    const dispatch = jest.fn();
    const thunk = logoutUser();

    await thunk(dispatch, () => ({}));
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(logoutUser.pending().type);
    expect(end[0].type).toBe(logoutUser.rejected().type);
    expect(end[0].meta.requestStatus).toBe('rejected');
  });
});