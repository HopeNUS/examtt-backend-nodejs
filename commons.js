const Validator = require('jsonschema').Validator;

exports.validate_json_schema = function(schema, view_fn) {
    const v = new Validator();
    return function(req, res) {
        const verdict = v.validate(req.body, schema);
        if (!verdict.valid) {
            return res.send(JSON.stringify(verdict.errors));
        }
        return view_fn(req, res);
    }
}
