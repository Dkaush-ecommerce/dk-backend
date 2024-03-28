const Admin = require('../db/models/Admin');

const getAdminById = async (id) => Admin.findById(id);

const getAdminByEmail = async (email) => Admin.findOne({ email });

const getAdminByRefreshToken = async (refreshToken) => Admin.findOne({ refreshToken });

module.exports = {
  getAdminById,
  getAdminByEmail,
  getAdminByRefreshToken,
};
