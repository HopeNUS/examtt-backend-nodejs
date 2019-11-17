const commons = require('./commons');
const manager = require('./manager');

exports.batch_insert_exams = commons.async_handler(async function(req, res) {
    const exam_records = [];
    req.body.forEach(function(exam_data) {
        // Copy data
        const exam_record = commons.deepcopy(exam_data);
        exam_records.push(exam_record);

        // Process datetime
        const datetime = exam_record['datetime'];
        exam_record['datetime'] = commons.datetime_to_timestamp(datetime);
        
        // Process extra_data
        const exam_record_request = exam_record['request'] || null;
        delete exam_record['request'];
        if (!exam_record_request) {
            return;
        }
        exam_record['extra_data'] = JSON.stringify({'request': exam_record_request});
    });

    // Add to database
    const result = await manager.create_exams(exam_records);
    return res.send(result);
});

exports.batch_insert_prayer_warriors = commons.async_handler(async function(req, res) {
    const prayer_warrior_records = commons.deepcopy(req.body);
    const result = await manager.create_prayer_warrior(prayer_warrior_records);
    return res.send(result);
});

exports.get_exams = commons.async_handler(async function(req, res) {
    const { from_datetime, to_datetime, exam_record_filters } = prepare_get_exams_params(req);

    const exam_record_results = await manager.get_exams(from_datetime, to_datetime, exam_record_filters);
    const { exam_ids, exam_records } = process_exam_record_results(exam_record_results);

    const prayer_warrior_filters = prepare_get_prayer_warrior_params(exam_ids);
    const prayer_warrior_results = await manager.get_prayer_warriors(prayer_warrior_filters);

    const result = {
        'exams': exam_records,
        'prayer_warriors': prayer_warrior_results,
    }

    return res.send(result);
});
exports.batch_delete_prayer_warriors = commons.async_handler(async function(req, res) {
    const prayer_warrior_ids = req.body;
    const result = await manager.delete_prayer_warriors(prayer_warrior_ids);
    return res.send({'deleted': result});
});
exports.batch_delete_exams = commons.async_handler(async function(req, res) {
    const exam_ids = req.body;
    const result = await manager.delete_exams(exam_ids);
    return res.send({'deleted': result});
});

function prepare_get_prayer_warrior_params(exam_ids) {
    return {
        'exam_id': exam_ids,
    };
}

function process_exam_record_results(exam_record_results) {
    const exam_records = [];
    const exam_ids = [];
    for (let exam_record of exam_record_results) {
        exam_record['datetime'] = commons.timestamp_to_datetime(exam_record['datetime']);
        const extra_data = JSON.parse(exam_record['extra_data']);
        const request = extra_data['request'];
        exam_record['request'] = request;
        delete exam_record['extra_data'];
        exam_records.push(exam_record);
        exam_ids.push(exam_record['exam_id']);
    }
    return { exam_ids, exam_records };
}

function prepare_get_exams_params(req) {
    const exam_record_filters = commons.deepcopy(req.query);
    const from_datetime = commons.datetime_to_timestamp(exam_record_filters['from_datetime']);
    delete exam_record_filters['from_datetime'];
    const to_datetime = commons.add_days_to_timestamp(from_datetime, exam_record_filters['duration_days']);
    delete exam_record_filters['duration_days'];
    return { from_datetime, to_datetime, exam_record_filters };
}
