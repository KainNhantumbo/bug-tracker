import moment from 'moment';

export const useDate = (time: string, format_string: string) => {
	const date = moment(time).format(format_string);
	return date;
};

export const calendarDate = (time: string) => {
	const date = moment(time).calendar();
	return date;
};
