

export default function BlurCircle({top='auto',left='auto',right='auto',bottom='auto'}) {


  const leftlength =  Number(left.split('px')[0])
   
const shouldHide = typeof window !== 'undefined' && leftlength > 250 && window.innerWidth < 1200;

  return (
    <div
      className={`absolute -z-50 h-58 w-58 aspect-square rounded-full bg-blue-400/30 blur-3xl 
        ${shouldHide ? 'hidden' : ' '}`}
      style={{ top, left, right, bottom }}
    ></div>
  )
}
