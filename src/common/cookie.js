const clearCookie = (res, name) => {
  res.clearCookie(name, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000,
  });
};

const setCookie = (res, name, data) => {
  res.cookie(name, data, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000,
  });
};

module.exports = { clearCookie, setCookie };
