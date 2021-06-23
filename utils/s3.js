const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const { v4: uuidv4 } = require('uuid');
const AppError = require('../utils/AppError');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
	region,
	accessKeyId,
	secretAccessKey,
});

exports.uploadFile = (file) => {
	let myFile = file.originalname.split('.');
	const ext = myFile[myFile.length - 1];
	const uploadParams = {
		Bucket: bucketName,
		Body: file.buffer || file,
		Key: `${uuidv4()}.${ext}`,
	};
	return s3.upload(uploadParams).promise();
};

exports.uploadArrayOfFiles = (files) => {
	const fileArray = [];
	files.forEach((file) => {
		let myFile = file.originalname.split('.');
		const ext = myFile[myFile.length - 1];
		const uploadParams = {
			Bucket: bucketName,
			Body: file.buffer,
			Key: `${uuidv4()}.${ext}`,
		};
		fileArray.push(s3.upload(uploadParams).promise());
	});
	return fileArray;
};
