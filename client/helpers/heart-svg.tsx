import React from 'react'
interface HeartIconProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
  stroke?:string;
}
const HeartSvg:React.FC<HeartIconProps> = ({ fill = 'none',stroke="white", onClick, ...rest }) => {
  return (
   
    <svg
    width="30px"
    height="30px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    stroke={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1}
    className='cursor-pointer transition-colors duration-300 ease-in-out'
    onClick={onClick}
    {...rest}
  >
    <path d="m3.25 9.75c3 3.5 4.75 4.5 4.75 4.5s1.75-1 4.75-4.5 1-7-1.5-7-3.25 3-3.25 3-.75-3-3.25-3-4.5 3.5-1.5 7z" />
  </svg>
  )
}

export default HeartSvg