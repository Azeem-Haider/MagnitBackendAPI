const Benifits = require('../model/benifitsModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.createBenifit = catchAsync(async (req, res, next) => {
  const newBenifit = await Benifits.create(req.body);

  res.status(201).json({
    status: 'Success',
    data: {
      data: newBenifit,
    },
  });
});
exports.getAllBenifits = catchAsync(async (req, res, next) => {
  const benifit = await Benifits.find();

  if (!benifit) {
    return next(new AppError(`No benifit found.`), 404);
  }

  res.status(200).json({
    status: 'success',
    results: benifit.length,
    data: {
      data: benifit,
    },
  });
});

exports.getBenifit = catchAsync(async (req, res, next) => {
  const benifit = await Benifits.findById(req.params.id);

  if (!benifit) {
    return next(new AppError(`No benifit found with this ID`), 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: benifit,
    },
  });
});

exports.updateBenifit = catchAsync(async (req, res, next) => {
  const benifit = await Benifits.findByIdAndUpdate(req.params.id, req.body, {
    runValidator: true,
    new: true,
  });

  if (!benifit) {
    return next(
      new AppError(`Cannot Update benifit, Something went wrong`),
      404,
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: benifit,
    },
  });
});

exports.deleteBenifit = catchAsync(async (req, res, next) => {
  const benifit = await Benifits.findByIdAndDelete(req.params.id);

  if (!benifit) {
    return next(new AppError(`No benifit found with this ID`));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: null,
    },
  });
});