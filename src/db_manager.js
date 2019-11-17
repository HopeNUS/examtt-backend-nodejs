const Sequelize = require('sequelize')
const models = require('./models')

exports.create_exams = async function(exam_records) {
    try {
        return await models.ExamTab.bulkCreate(exam_records);
    } catch (ex) {
        if (ex instanceof Sequelize.UniqueConstraintError) {
            console.log(ex);
            return {'error': 'One or more exam entry already added!'};
        }
        throw ex;
    }
}

exports.create_prayer_warriors = async function(prayer_warriors_records) {
    try {
        return await models.PrayerWarriorTab.bulkCreate(prayer_warriors_records);
    } catch (ex) {
        if (ex instanceof Sequelize.UniqueConstraintError) {
            console.log(ex);
            return {'error': 'One or more prayer warrior entry already added!'};
        }
        throw ex;
    }
}

exports.get_exams = function(filters) {
    return models.ExamTab.findAll({
        where: filters,
        order: [['datetime', 'ASC']],
        raw: true,
    });
};

exports.get_prayer_warriors = function(filters) {
    return models.PrayerWarriorTab.findAll({
        where: filters,
        raw: true,
    });
};

exports.delete_exams = function(exam_ids) {
    return models.ExamTab.destroy({
        where: {
            exam_id: exam_ids,
        }
    })
}

exports.delete_prayer_warriors = function(prayer_warrior_ids) {
    return models.PrayerWarriorTab.destroy({
        where: {
            prayer_warrior_id: prayer_warrior_ids,
        }
    })
}