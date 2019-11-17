const ENV = process.env.ENV || 'DEV';
const ALLOWED_ENV = ['DEV', 'LIVE'];

if (!ALLOWED_ENV.includes(ENV)) {
    throw new Error('Invalid env');
};

const SCHOOL = process.env.SCHOOL || 'NUS';
const SCHOOLS_ENUM = {
    'NUS': 1,
    'NTU': 2,
}

exports.ENV = ENV;
exports.SCHOOL = SCHOOLS_ENUM[SCHOOL];
