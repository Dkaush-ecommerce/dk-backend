const { StatusCodes } = require('http-status-codes');
const catchAsync = require('../utils/catchAsync');

const addToCart = catchAsync(async (req, res) => {});

const getCart = catchAsync(async (req, res) => {});

const updateCart = catchAsync(async (req, res) => {});

const deleteFromCart = catchAsync(async (req, res) => {});

module.exports = { addToCart, getCart, updateCart, deleteFromCart };
