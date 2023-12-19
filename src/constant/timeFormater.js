export const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(':');
    const twelveHour = (hours % 12) || 12;
    const period = hours < 12 ? 'AM' : 'PM';
    return `${twelveHour}:${minutes} ${period}`;
};