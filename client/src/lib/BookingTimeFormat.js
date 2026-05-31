

export function BookingTimeFormat(dateTime) {

    const date = new Date(dateTime)
    const BookingTime = date.toLocaleString('en-us', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })

    return BookingTime


}
