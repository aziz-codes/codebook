import { Search } from 'lucide-react'
import React from 'react'
interface Props{
    value: string;
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void;
}
const SearchInput:React.FC<Props> = ({value,onChange}) => {
  return (
    <div className='flex border rounded-md px-2 py-2 items-center gap-2 col-span-12 sm:col-span-6'>
        <Search className='text-muted'/>
        <input type='text' placeholder='search' className='h-full flex-1 outline-none bg-transparent'
        value={value}
        onChange={onChange}
        />
    </div>
  )
}

export default SearchInput