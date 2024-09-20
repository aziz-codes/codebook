


import React from 'react'
interface HeartIconProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
  stroke?:string;
}
const BookmarkSvg:React.FC<HeartIconProps> = ({ fill = 'none',stroke="white", onClick, ...rest }) => {
  return (
   
   
<svg
width="30px"
height="30px"
viewBox="0 0 24 24"
fill="none"
xmlns="http://www.w3.org/2000/svg"
className='cursor-pointer transition-colors duration-300 ease-in-out'
onClick={onClick}
 
{...rest}
>
<path d="M19 21l-7-4-7 4V5a2 2 0 012-2h10a2 2 0 012 2v16z" fill={fill} stroke={stroke}/>
</svg>
  )
}

export default BookmarkSvg


