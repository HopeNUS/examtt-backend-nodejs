const Sequelize = require('sequelize');
const Model = Sequelize.Model
const db_config = require('./db_config');
const sequelize = db_config.sequelize;

class ExamTab extends Model {}
ExamTab.init({
    exam_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    place: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    datetime: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },

    course_code: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    course_name: Sequelize.STRING,

    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    contact: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    lifegroup: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    school: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    extra_data: Sequelize.STRING,
}, {
    sequelize,
    indexes: [
        {
            name: 'idx_datetime_place',
            fields: ['datetime', 'place'],
        },
        {
            name: 'idx_school_lifegroup',
            fields: ['school', 'lifegroup'],
        },
    ],
    tableName: 'exam_tab',
});
exports.ExamTab = ExamTab

class PrayerWarriorTab extends Model {}
PrayerWarriorTab.init({
    prayer_warrior_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    contact: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    exam_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
}, {
    sequelize,
    indexes: [
        {
            name: 'idx_exam_id_name',
            fields: ['exam_id', 'name'],
            unique: true,
        },
    ],
    tableName: 'prayer_warrior_tab',
});
exports.PrayerWarriorTab = PrayerWarriorTab
