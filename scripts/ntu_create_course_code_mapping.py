import csv 

filename = '/Users/jeremiah-ang/Downloads/timetable.csv'

def _process_datetime(date, time):
	date_component = date.split(' ')
	day = int(date_component[0])
	month = 11 if 'November' == date_component[1] else 12
	year = int(date_component[2])

	time_component = time.split(' ')
	hour_minute = time_component[0].split('.')
	hour = int(hour_minute[0]) + (12 if 'pm' == time_component[1] else 0)
	hour = '0{}'.format(hour) if hour < 10 else str(hour)
	minute = int(hour_minute[1])
	return '{}/{}/{} {}:{}'.format(day, month, year, hour, minute)

with open(filename) as csv_file:
	csv_reader = csv.reader(csv_file, delimiter='\t')
	print('course_code_mapping = {')
	for row in csv_reader:
		datetime = _process_datetime(row[0], row[2])
		course_code = row[3].replace('*', '').replace('+', '')
		course_name = row[4]
		place = row[6]
		print('\t%s: {datetime: "%s", course_name: "%s", place: "%s"},' % (course_code, datetime, course_name, place))
	print('}')
