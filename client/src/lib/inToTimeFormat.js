

export default function inToTimeFormat(dateTime) {

     const date = new Date(dateTime)
     const localTime = date.toLocaleTimeString('en-us',{
        hour:'2-digit',
        minute:'2-digit',
        hour12:true
     })

  return localTime
    
  
}


