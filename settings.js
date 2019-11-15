const ENV = process.env.ENV || 'DEV'
const ALLOWED_ENV = ['DEV', 'LIVE']

if (!ALLOWED_ENV.includes(ENV)) {
    throw new Error('Invalid env');
};

exports.ENV = ENV;
