# APIs

## POST /batch_insert_exams

```
[
    {
        datetime: str (dd/mm/yyyy hh:mm),
        place: int,
        name: str,
        lifegroup: int,
        course_code: str,
        course_name: str,  #optional
        contact: int,  #optional
        request: str,  #optional
    },
]
```

## POST /batch_insert_prayer_warriors

```
[
    {
        name: str,
        exam_id: int,
        contact: int,  #optional
    },
]
```

## POST /batch_delete_exams

```
[exam_id: int]
```

## POST /batch_delete_prayer_warriors

```
[prayer_warrior_id: int]
```

## GET /get_exams

``` 
from_datetime: str (dd/mm/yyyy hh:mm),
duration_days: int,
lifegroup: int,  #optional
place: int,  #optional
prayer_warrior_id: str,  #optional
```
