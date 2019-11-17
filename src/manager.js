const Sequelize = require('sequelize');
const db_manager = require('./db_manager');
const settings = require('./settings');

exports.create_exams = function(exam_records) {
    exam_records.map((record) => {
        record['school'] = settings.SCHOOL;
        record['ctime'] = + new Date();
        record['mtime'] = + new Date();
        record['extra_data'] = record['extra_data'] || '{}';
        return record;
    });
    return db_manager.create_exams(exam_records);
}

exports.create_prayer_warrior = function(prayer_warrior_records) {
    prayer_warrior_records.map((record) => {
        record['school'] = settings.SCHOOL;
        record['ctime'] = + new Date();
        record['mtime'] = + new Date();
        return record;
    });
    return db_manager.create_prayer_warriors(prayer_warrior_records);
}

exports.get_exams = function(from_datetime, to_datetime, filters) {
    filters['school'] = settings.SCHOOL;
    filters['datetime'] = {
        [Sequelize.Op.gte]: from_datetime,
        [Sequelize.Op.lt]: to_datetime,
    }
    return db_manager.get_exams(filters);
};

exports.get_prayer_warriors = function(filters) {
    filters['school'] = settings.SCHOOL;
    return db_manager.get_prayer_warriors(filters);
};

exports.delete_exams = function(exam_ids) {
    return db_manager.delete_exams(exam_ids);
}

exports.delete_prayer_warriors = function(prayer_warrior_ids) {
    return db_manager.delete_prayer_warriors(prayer_warrior_ids);
}