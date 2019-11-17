exports.BatchInsertExamsSchema = {
    "type": "array",
    "items": {
        "$ref": "#/definitions/InsertExam",
    },
    "definitions": {
        "InsertExam": {
            "type": "object",
            "properties": {
                "datetime": {
                    "type": "string",
                    "pattern": "\\d{2}/\\d{2}/\\d{4} \\d{2}:\\d{2}$",
                },
                "place": {"type": "integer"},
                "name": {"type": "string"},
                "lifegroup": {"type": "integer"},
                "course_code": {"type": "string"},

                "course_name": {"type": "string"},
                "contact": {"type": "integer"},
                "request": {"type": "string"},
            },
            "required": ["datetime", "place", "name", "lifegroup", "course_code"],
        },
    },
}

exports.BatchInsertPrayerWarriorsSchema = {
    "type": "array",
    "items": {
        "$ref": "#/definitions/InsertPrayerWarrior",
    },
    "definitions": {
        "InsertPrayerWarrior": {
            "type": "object",
            "properties": {
                "name": {"type": "string"},
                "exam_id": {"type": "integer"},

                "contact": {"type": "integer"},
            },
            "required": ["name", "exam_id"],
        },
    },
}

exports.BatchDeleteExamsSchema = {
    "type": "array",
    "items": {
        "type": "integer",
    },
}

exports.BatchDeletePrayerWarriorsSchema = {
    "type": "array",
    "items": {
        "type": "integer",
    },
}

exports.GetExamsSchema = {
    "type": "object",
    "properties": {
        "from_datetime": {
            "type": "string",
            "pattern": "\\d{2}/\\d{2}/\\d{4} \\d{2}:\\d{2}$",
        },
        "duration_days": {
            "type": "string",
            "pattern": "\\d+$",
        },
        "lifegroup": {
            "type": "string",
            "pattern": "\\d+$",
        },
        "place": {
            "type": "string",
            "pattern": "\\d+$",
        },
        "prayer_warrior_id": {
            "type": "string",
            "pattern": "\\d+$",
        },
    },
    "required": ["from_datetime", "duration_days"],
}
