import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai'

const ChonViTri = () => {
   const { register, handleSubmit, reset } = useForm();
   const [display, setDisplay] = useState('hidden')


   return (
      <div className='ChonViTri'>
         <div className='bg-white w-1/2 fixed top-16 z-30 left-1/2 -translate-x-1/2 rounded-full shadow'>
            <form className='grid grid-cols-12 pl-8 pr-3 py-2'>
               <div className='col-span-5 flex items-center justify-between pr-5'>
                  <div>
                     <p className='m-0 font-bold'>Địa điểm</p>
                     <input {...register('viTri')} type="text" placeholder='Bạn sắp đi đâu ?' className='text-base w-full outline-none' onInput={(e)=>{
                        if(e.currentTarget.value ===''){
                           setDisplay('hidden')
                        } else{
                           setDisplay('')
                        }
                     }}/>
                  </div>
                  <button type='button' className={`${display} bg-gray-300 px-2 font-bold rounded-full hover:bg-gray-500`} onClick={()=>{
                     setDisplay('hidden')
                     reset({viTri:''})
                  }}>X</button>
               </div>
               <div className='col-span-2 border-l border-gray-300 px-3'>
                  <p className='m-0 font-bold'>Nhận phòng</p>
                  <input disabled type="text" placeholder='Thêm ngày' className='text-base w-full' />
               </div>
               <div className='col-span-2 border-l border-gray-300 px-3'>
                  <p className='m-0 font-bold'>Trả phòng</p>
                  <input disabled type="text" placeholder='Thêm ngày' className='text-base w-full' />
               </div>
               <div className='col-span-2 border-l border-gray-300 px-3'>
                  <p className='m-0 font-bold'>Khách</p>
                  <input disabled type="text" placeholder='Thêm khách' className='text-base w-full' />
               </div>
               <div className='col-span-1 flex items-center justify-end'>
                  <button className=' bg-amber-800 rounded-full w-10 h-10 hover:bg-amber-500 transition duration-500'><AiOutlineSearch className='inline-block text-white text-xl' /></button>
               </div>
            </form>
         </div>
      </div>
   )
}

export default ChonViTri