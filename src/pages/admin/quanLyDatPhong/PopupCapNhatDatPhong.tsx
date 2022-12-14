import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../../stores/configStore'
import { putDatPhongID, putDatPhongIDActions } from '../../../stores/datPhong/putDatPhongIDReducer'
import { getPhongThueID, getPhongThueIDActions } from '../../../stores/phongThue/getPhongThueIDReducer'
import { getPhongThueTheoViTri, getPhongThueTheoViTriActions } from '../../../stores/phongThue/getPhongThueTheoViTriReducer'
import { PhongThue } from '../../../types/phongThueTypes'
import { ViTri } from '../../../types/viTriTypes'
import { AiOutlineClose } from 'react-icons/ai'

type Props = {
   setDisplayUpdate: (display: string) => void,
   maNguoiDung: string | undefined,
   contentGetViTriAll: ViTri[] | undefined,
   contentGetPhongThueAll: PhongThue[] | undefined,
}

const PopupCapNhatDatPhong: React.FC<Props> = (props) => {
   const { register, handleSubmit, reset } = useForm()
   const dispatch = useDispatch<any>()
   const { contentGetPhongThueTheoViTri } = useSelector((state: RootState) => state.getPhongThueTheoViTriReducer)
   const { contentGetPhongThueID } = useSelector((state: RootState) => state.getPhongThueIDReducer)
   const { contentGetDatPhongID } = useSelector((state: RootState) => state.getDatPhongIDReducer)
   const { contentPutDatPhong, errContentPutDatPhong } = useSelector((state: RootState) => state.putDatPhongIDReducer)
   const phongThue = props.contentGetPhongThueAll?.find(phongThue => phongThue.id === contentGetDatPhongID?.maPhong)
   const viTriID = phongThue?.maViTri.toString()
   const dSPhongThueTheoViTri = props.contentGetPhongThueAll?.reduce<PhongThue[]>((dSPhongThueTheoViTri, phongThue) => {
      if (phongThue.maViTri.toString() === viTriID) {
         dSPhongThueTheoViTri.push(phongThue)
      }
      return dSPhongThueTheoViTri
   }, [])
   const [ngayDen, setNgayDen] = useState(0)
   const [ngayDi, setNgayDi] = useState(0)
   const soKhach = (soKhach: number) => {
      let x = []
      for (let i = 0; i < soKhach; i++) {
         x.push(<option key={i} value={i + 1}>{i + 1} Kh??ch</option>)
      }
      return x
   }

   useEffect(() => {
      reset({
         viTri: viTriID,
         maPhong: contentGetDatPhongID?.maPhong,
         ngayDen: moment(contentGetDatPhongID?.ngayDen).format('YYYY-MM-DD'),
         ngayDi: moment(contentGetDatPhongID?.ngayDi).format('YYYY-MM-DD'),
         soLuongKhach: contentGetDatPhongID?.soLuongKhach
      })
      if (contentGetDatPhongID) {
         setNgayDen((new Date(moment(contentGetDatPhongID.ngayDen).format('YYYY-MM-DD'))).getTime())
         setNgayDi((new Date(moment(contentGetDatPhongID.ngayDi).format('YYYY-MM-DD'))).getTime())
      }
   }, [contentGetDatPhongID])

   return (
      <Container className='PopupCapNhatDatPhong w-1/3 py-2 px-5 bg-white mx-auto mt-10 shadow '>
         <div className='text-right'>
            <button onClick={() => {
               props.setDisplayUpdate('hidden')
               dispatch(putDatPhongIDActions.removeContentPutDatPhong(''))
               dispatch(getPhongThueTheoViTriActions.removecontentGetPhongThueTheoViTri(''))
               dispatch(getPhongThueIDActions.removeContentGetPhongThueID(''))
            }} className=' px-3 bg-amber-800 text-white hover:bg-amber-500'>X</button>
         </div>
         <div className='h-14'>
            <p className='text-xl text-center font-bold m-0'>C???p nh???t ?????t ph??ng</p>
            {contentPutDatPhong ? <p className='text-center text-lg text-green-500 m-0'>C???p nh???t ?????t ph??ng th??nh c??ng!</p> : <p className='text-center text-red-500 m-0'>{errContentPutDatPhong}</p>}
         </div>
         <form onSubmit={handleSubmit(data => {
            delete data.viTri
            data.maPhong = Number(data.maPhong)
            data.ngayDen = moment(data.ngayDen).format('YYYY-MM-DD hh:mm:ss')
            data.ngayDi = moment(data.ngayDi).format('YYYY-MM-DD hh:mm:ss')
            data.soLuongKhach = Number(data.soLuongKhach)
            data.maNguoiDung = Number(props.maNguoiDung)
            if (data.ngayDen > data.ngayDi) {
               alert('Ng??y ??i kh??ng ???????c tr?????c ng??y ?????n')
            } else {
               dispatch(putDatPhongID({ id: contentGetDatPhongID?.id.toString(), data: data }))
            }
         })}>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>V??? tr??</p>
               <select required {...register('viTri')} className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 cursor-pointer" onChange={(e) => dispatch(getPhongThueTheoViTri(e.target.value))} onClick={() => {
                  dispatch(getPhongThueTheoViTriActions.removecontentGetPhongThueTheoViTri(''))
                  dispatch(getPhongThueIDActions.removeContentGetPhongThueID(''))
               }}>
                  {props.contentGetViTriAll?.map((viTri, i) => (
                     <option key={i} value={viTri.id}>{viTri.tenViTri}, {viTri.tinhThanh}, {viTri.quocGia}</option>
                  ))}
               </select>
            </div>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>T??n ph??ng:</p>
               <select required {...register('maPhong')} className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 cursor-pointer" onChange={(e) => dispatch(getPhongThueID(e.target.value))}>
                  {contentGetPhongThueTheoViTri ?
                     <>
                        <option className='hidden'></option>
                        {contentGetPhongThueTheoViTri?.map((phongThue, i) => (
                           <option key={i} value={phongThue.id}>{phongThue.tenPhong}</option>
                        ))}
                     </>
                     : dSPhongThueTheoViTri?.map((phongThue, i) => (
                        <option key={i} value={phongThue.id}>{phongThue.tenPhong}</option>
                     ))}
               </select>
            </div>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>Ng??y ?????n:</p>
               <input required {...register('ngayDen')} type="date" className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " onChange={(e) => {
                  let ngayDen = (new Date(e.target.value)).getTime()
                  setNgayDen(ngayDen)
               }} />
            </div>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>Ng??y ??i:</p>
               <input required {...register('ngayDi')} type="date" className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " onChange={(e) => {
                  let ngayDi = (new Date(e.target.value)).getTime()
                  setNgayDi(ngayDi)
               }} />
            </div>
            <div className='mb-2'>
               <p className='m-0 font-semibold'>S??? l?????ng kh??ch:</p>
               <select required {...register('soLuongKhach')} className="w-full border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 cursor-pointer">
                  {contentGetPhongThueID ? soKhach(contentGetPhongThueID?.khach) : phongThue ? soKhach(phongThue?.khach) : ''}
               </select>
            </div>

            {ngayDi >= ngayDen && ngayDen !== 0 ?
               <div className='flex justify-between mb-3 text-base font-semibold bg-gray-300 p-2'>
                  <p className='m-0'>T???ng ti???n: {contentGetPhongThueID?.giaTien || phongThue?.giaTien}$/ng??y <AiOutlineClose className='inline-block mb-1' /> {(ngayDi - ngayDen) / (24 * 3600 * 1000) + 1} ng??y</p>
                  <p className='m-0'>{contentGetPhongThueID?.giaTien ? contentGetPhongThueID?.giaTien * ((ngayDi - ngayDen) / (24 * 3600 * 1000) + 1) : phongThue?.giaTien ? phongThue?.giaTien * ((ngayDi - ngayDen) / (24 * 3600 * 1000) + 1) : ''}$</p>
               </div> : ''}

            {contentPutDatPhong ? '' : <div className='text-center'>
               <button className="px-7 py-3 bg-amber-800 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-amber-500 transition duration-300">C???p nh???t</button>
            </div>}
         </form>
      </Container>
   )
}

export default PopupCapNhatDatPhong

const Container = styled.div`
   &.PopupCapNhatDatPhong{
      animation: aniPopupCapNhatDatPhong 1s;
      @keyframes aniPopupCapNhatDatPhong {
         from{
            transform:translateX(-100%)
         }
         to{ }
      }
   }
`