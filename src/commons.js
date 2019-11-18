const moment = require('moment');
const Validator = require('jsonschema').Validator;

exports.validate_json_schema_middleware = function(schema) {
    const v = new Validator();
    return function(req, res, next) {
        const data = (req.method == "POST") ? req.body : req.query;
        const verdict = v.validate(data, schema);
        if (!verdict.valid) {
            const error_msg = verdict.errors.map(error => '{} {}'.format(error.instance, error.message)).join(',\n');
            return res.send({'error': error_msg});
        }
        next();
    }
}

exports.async_handler = function(view_fn) {
    return function(req, res, next) {
        return Promise.resolve(view_fn(req, res)).catch(next);
    }
}

exports.deepcopy = function(obj) {
    return JSON.parse(JSON.stringify(obj));
}

exports.datetime_to_timestamp = function(datetime) {
    return moment(datetime, 'DD/MM/YYYY HH:mm').utcOffset('+0800').valueOf();
}

exports.timestamp_to_datetime = function(timestamp) {
    return moment(parseInt(timestamp)).utcOffset('+0800').format('DD/MM/YYYY HH:mm');
}

exports.add_days_to_timestamp = function(timestamp, num_days) {
    return moment(parseInt(timestamp)).add(num_days, 'days').utcOffset('+0800').valueOf();
}
