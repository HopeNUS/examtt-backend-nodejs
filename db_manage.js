const models = require('./models')

exports.get_exams = function(filters) {
    return models.ExamTab.findAll({
        where: filters,
        order: [['datetime', 'ASC']],
    });
};

exports.get_prayer_warrios = function(filters) {
    return models.PrayerWarriorTab.findAll({
        where: filters,
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