import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../../stores/configStore'
import { putPhongThueID, putPhongThueIDActions } from '../../../stores/phongThue/putPhongThueIDReducer'
import { ViTri } from '../../../types/viTriTypes'

type Props = {
   setDisplayUpdate: (display: string) => void,
   contentGetViTriAll: ViTri[] | undefined
}

const PopupCapNhatPhongThue: React.FC<Props> = (props) => {
   const { register, handleSubmit, reset, setValue } = useForm()
   const dispatch = useDispatch<any>()
   const { contentGetPhongThueID } = useSelector((state: RootState) => state.getPhongThueIDReducer)
   const { contentPutPhongThue, errContentPutPhongThue } = useSelector((state: RootState) => state.putPhongThueIDReducer)
   const [urlHinhAnh, setUrlHinhAnh] = useState('')

   useEffect(() => {
      reset({
         tenPhong: contentGetPhongThueID?.tenPhong,
         khach: contentGetPhongThueID?.khach,
         phongNgu: contentGetPhongThueID?.phongNgu,
         giuong: contentGetPhongThueID?.giuong,
         phongTam: contentGetPhongThueID?.phongTam,
         moTa: contentGetPhongThueID?.moTa,
         giaTien: contentGetPhongThueID?.giaTien,
         mayGiat: contentGetPhongThueID?.mayGiat,
         banLa: contentGetPhongThueID?.banLa,
         tivi: contentGetPhongThueID?.tivi,
         dieuHoa: contentGetPhongThueID?.dieuHoa,
         wifi: contentGetPhongThueID?.wifi,
         bep: contentGetPhongThueID?.bep,
         doXe: contentGetPhongThueID?.doXe,
         hoBoi: contentGetPhongThueID?.hoBoi,
         banUi: contentGetPhongThueID?.banUi,
         maViTri: contentGetPhongThueID?.maViTri,
         hinhAnh: contentGetPhongThueID?.hinhAnh,
         image: ''
      })
      setUrlHinhAnh('')
   }, [contentGetPhongThueID])

   return (
      <Container className='PopupCapNhatPhongThue w-2/3 py-2 px-5 bg-white mx-auto mt-10 shadow'>
         <div className='text-right'>
            <button onClick={() => {
               props.setDisplayUpdate('hidden')
               dispatch(putPhongThueIDActions.removeContentPutPhongThue(''))
            }} className=' px-3 bg-amber-800 text-white hover:bg-amber-500'>X</button>
         </div>
         <div className='h-14'>
            <p className='text-xl text-center font-bold m-0'>C???p nh???t ph??ng thu?? {contentGetPhongThueID?.id}</p>
            {contentPutPhongThue ? <p className='text-center text-lg text-green-500 m-0'>C???p nh???t ph??ng thu?? th??nh c??ng!</p> : <p className='text-center text-red-500 m-0'>{errContentPutPhongThue}</p>}
         </div>
         <form onSubmit={handleSubmit(data => {
            delete data.image
            data.khach = Number(data.khach)
            data.phongNgu = Number(data.phongNgu)
            data.giuong = Number(data.giuong)
            data.phongTam = Number(data.phongTam)
            data.giaTien = Number(data.giaTien)
            data.maViTri = Number(data.maViTri)
            dispatch(putPhongThueID({ id: contentGetPhongThueID?.id.toString(), data: data }))
         })} >
            <div className='grid grid-cols-12 gap-x-10 mb-10'>
               <div className='col-span-6'>
                  <div className='mb-2'>
                     <p className='m-0 font-semibold'>T??n ph??ng thu??</p>
                     <input required {...register('tenPhong')} type="text" className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
                  </div>
                  <div className='mb-2'>
                     <p className='m-0 font-semibold'>S??? kh??ch</p>
                     <input required {...register('khach')} type="number" className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
                  </div>
                  <div className='mb-2'>
                     <p className='m-0 font-semibold'>S??? ph??ng ng???</p>
                     <input required {...register('phongNgu')} type="number" className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
                  </div>
                  <div className='mb-2'>
                     <p className='m-0 font-semibold'>S??? gi?????ng</p>
                     <input required {...register('giuong')} type="number" className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
                  </div>
                  <div className='mb-2'>
                     <p className='m-0 font-semibold'>S??? ph??ng t???m</p>
                     <input required {...register('phongTam')} type="number" className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
                  </div>
                  <div className='mb-2'>
                     <p className='m-0 font-semibold'>M?? t???</p>
                     <textarea required {...register('moTa')} rows={3} className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 resize-none"></textarea>
                  </div>
               </div>
               <div className='col-span-6'>
                  <div className='mb-2'>
                     <p className='m-0 font-semibold'>Gi?? ti???n $ / ng??y</p>
                     <input required {...register('giaTien')} type="number" className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
                  </div>
                  <div className='mb-2'>
                     <p className='m-0 font-semibold'>V??? tr??</p>
                     <select required {...register('maViTri')} className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 cursor-pointer">
                        {props.contentGetViTriAll?.map((viTri, i) => (
                           <option key={i} value={viTri.id}>{viTri.tenViTri}, {viTri.tinhThanh}, {viTri.quocGia}</option>
                        ))}
                     </select>
                  </div>
                  <div className='mb-2'>
                     <p className='m-0 font-semibold'>Hinh ???nh</p>
                     <input {...register('image')} type="file" accept="image/jpg, image/jpeg, image/png, image/gif" className="w-full focus:outline-none focus:border-blue-600" onChange={(e) => {
                        // l???y file ???? ch???n
                        const file = e.target.files
                        // t???o ?????i t?????ng ?????c file 
                        if (file) {
                           const reader = new FileReader()
                           reader.readAsDataURL(file[0])
                           reader.onload = (e) => {
                              setValue('hinhAnh', e.target?.result)
                              if (typeof e.target?.result === 'string') {
                                 setUrlHinhAnh(e.target?.result)
                              }
                           }
                        }
                     }} />
                  </div>
                  <div className='mb-2'>
                     <img src={urlHinhAnh || contentGetPhongThueID?.hinhAnh} alt="..." className='h-52 bg-gray-200' />
                  </div>
               </div>
               <div className='col-span-12'>
                  <div className='flex'>
                     <label className='mr-1 font-semibold'>M??y gi???t</label>
                     <input {...register('mayGiat')} type="checkbox" className='w-6 h-6 mr-4' />
                     <label className='mr-1 font-semibold'>B??n l??</label>
                     <input {...register('banLa')} type="checkbox" className='w-6 h-6 mr-4' />
                     <label className='mr-1 font-semibold'>Tivi</label>
                     <input {...register('tivi')} type="checkbox" className='w-6 h-6 mr-4' />
                     <label className='mr-1 font-semibold'>??i???u ho??</label>
                     <input {...register('dieuHoa')} type="checkbox" className='w-6 h-6 mr-4' />
                     <label className='mr-1 font-semibold'>Wifi</label>
                     <input {...register('wifi')} type="checkbox" className='w-6 h-6 mr-4' />
                     <label className='mr-1 font-semibold'>B???p</label>
                     <input {...register('bep')} type="checkbox" className='w-6 h-6 mr-4' />
                     <label className='mr-1 font-semibold'>????? xe</label>
                     <input {...register('doXe')} type="checkbox" className='w-6 h-6 mr-4' />
                     <label className='mr-1 font-semibold'>H??? b??i</label>
                     <input {...register('hoBoi')} type="checkbox" className='w-6 h-6 mr-4' />
                     <label className='mr-1 font-semibold'>B??n ???i</label>
                     <input {...register('banUi')} type="checkbox" className='w-6 h-6 mr-4' />
                  </div>
               </div>
            </div>

            {contentPutPhongThue ? '' : <div className='text-center'>
               <button className="px-7 py-3 bg-amber-800 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-amber-500 transition duration-300">C???p nh???t</button>
            </div>}
         </form>
      </Container>
   )
}

export default PopupCapNhatPhongThue

const Container = styled.div`
   &.PopupCapNhatPhongThue{
      animation: aniPopupCapNhatPhongThue 1s;
      @keyframes aniPopupCapNhatPhongThue {
         from{
            transform:translateX(-100%)
         }
         to{ }
      }
   }
`