const Company = require('../../model/companyModel');
const AppError = require('../../utils/AppError');
const { appErrors, appSuccess } = require('../../constants/appConstants');
const { SUCCESS } = require('../../constants/appConstants').resStatus;
const catchAsync = require('../../utils/catchAsync');
const { uploadFile } = require('../../utils/s3');

exports.createOne = catchAsync(async (req, res, next) => {
	await Company.create(req.body);
	res.status(201).json({
		status: SUCCESS,
		message: appSuccess.OPERATION_SUCCESSFULL,
	});
});
exports.getAll = catchAsync(async (req, res, next) => {
	const companies = await Company.find();

	if (!companies) {
		return next(new AppError(appErrors.NOT_FOUND), 404);
	}

	res.status(200).json({
		status: SUCCESS,
		results: companies.length,
		data: {
			result: companies,
		},
	});
});

exports.getOne = catchAsync(async (req, res, next) => {
	const company = await Company.findById(req.params.id);

	if (!company) {
		return next(new AppError(appErrors.NOT_FOUND), 404);
	}

	res.status(200).json({
		status: SUCCESS,
		data: {
			result: company,
		},
	});
});

exports.updateOne = catchAsync(async (req, res, next) => {
	const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
		runValidator: true,
		new: true,
	});

	if (!company) {
		return next(new AppError(appErrors.NOT_FOUND), 404);
	}

	res.status(200).json({
		status: SUCCESS,
		data: {
			result: company,
		},
	});
});

exports.deleteOne = catchAsync(async (req, res, next) => {
	await Company.findByIdAndDelete(req.params.id);

	res.status(200).json({
		status: SUCCESS,
		data: null,
	});
});
