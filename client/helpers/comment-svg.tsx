import React from 'react'
interface CommentProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
  stroke?:string;
}
const CommentSvg:React.FC<CommentProps> = ({ fill = 'none',stroke="white", onClick, ...rest }) => {
  return (
   
    <svg
    width="30px"
    height="30px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    className='cursor-pointer transition-colors duration-300 ease-in-out'
    {...rest}
  >
    <g clipPath="url(#clip0_429_11233)">
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4876 3.36093 14.891 4 16.1272L3 21L7.8728 20C9.10904 20.6391 10.5124 21 12 21Z"
        stroke="white"
        strokeWidth={0.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_429_11233">
        <rect width={24} height={24} fill="white" />
      </clipPath>
    </defs>
  </svg>
  )
}

export default CommentSvg