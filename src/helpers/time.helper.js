const convertTimeToMinutes = (time) => {

    const [hours, minutes] = time.split(":").map(Number);

    return (hours * 60) + minutes;

};

const isTimeOverlap = (

    existingStart,

    existingEnd,

    newStart,

    newEnd

) => {

    const existingStartMinutes = convertTimeToMinutes(existingStart);

    const existingEndMinutes = convertTimeToMinutes(existingEnd);

    const newStartMinutes = convertTimeToMinutes(newStart);

    const newEndMinutes = convertTimeToMinutes(newEnd);

    return (

        newStartMinutes < existingEndMinutes &&

        newEndMinutes > existingStartMinutes

    );

};

const isValidTimeRange = (startTime, endTime) => {

    return convertTimeToMinutes(startTime) < convertTimeToMinutes(endTime);

};

export {

    convertTimeToMinutes,

    isTimeOverlap,

    isValidTimeRange

};