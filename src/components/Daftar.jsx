import { useForm } from 'react-hook-form';
import './css/Daftar.css';
import React, { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'feather-icons-react/build/IconComponents';
import DaftarInputUserTextNumber from './DaftarInputUserTextNumber';
import {DaftarInputNilaiMapel, DaftarInputNilaiMapel2, DaftarInputNilaiMapel3, DaftarInputNilaiMapel4, DaftarInputNilaiMapel5} from './DaftarInputNilaiMapel';

export default function Daftar() {
  const { handleSubmit, register, formState:{errors},} = useForm();
  const [step, setStep] = useState(1);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/data_siswa", data);
      console.log("Data Berhasil di input : ", response.data);
    } catch (e) {
      console.log("error dalam submit data :", e);
    }
  };

  const nextStep = () =>{
    setStep(step + 1);
  }
  const prevStep = () =>{
    setStep(step - 1);
  }

  return (
    <div className="Daftar-container">
      <div className="daftar-navbar">
        <h2 className="daftar-judul">Formulir Pendaftaran PPDB</h2>
        <div className='daftar-step'>
          <div className="step">
            <button className={`daftar-indicator ${step === 1 ?'daftar-indicator-active':''}`} onClick={()=>setStep(step - 1)}>1</button>
            <p>Data Diri</p>
          </div>
          <div className="step">
          {/* <p className={`indicator-line ${step === 2 ?'indicator-line-active':''}`}></p> */}
              <p className={`daftar-indicator ${step === 2 ?'daftar-indicator-active':''}`}>2</p>
            <p>Alamat </p>
          </div>
          <div className="step">
            <p className={`daftar-indicator ${step === 3 ?'daftar-indicator-active':''}`}>3</p>
            <p>Nilai 1</p>
          </div>
          <div className="step">
            <p className={`daftar-indicator ${step === 4 ?'daftar-indicator-active':''}`}>4</p>
            <p>Nilai 2</p>
          </div>
          <div className="step">
            <p className={`daftar-indicator ${step === 5 ?'daftar-indicator-active':''}`}>5</p>
            <p>Nilai 3</p>
          </div>
          <div className="step">
            <p className={`daftar-indicator ${step === 6 ?'daftar-indicator-active':''}`}>6</p>
            <p>Nilai 4</p>
          </div>
          <div className="step">
            <p className={`daftar-indicator ${step === 7 ?'daftar-indicator-active':''}`}>7</p>
            <p>Nilai 5</p>
          </div>
        </div>
      </div>
        <Link to="/" className="daftar-btn-back">
          <ArrowLeft />
        </Link>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Langkah Pertama */}
        {step === 1 && (
          <div className='daftar-form'>
            <h2 className="daftar-judul-form">Form 1 : Data Diri</h2>

            <div className='daftar-input-box'>
              <label className="daftar-label">Jalur Pendaftaran</label>
              <select className='daftar-input'{...register("nama_jalur", {required:true})}>
                <option value="Zonasi">Zonasi</option>
                <option value="Afirmasi">Afirmasi</option>
                <option value="Prestasi">Prestasi</option>
              </select>
            </div>

              {<DaftarInputUserTextNumber errors={errors} register={register} label_msg="NISN" input_type="number"/>}
              {<DaftarInputUserTextNumber errors={errors} register={register} label_msg="Nama Lengkap" input_type="text" />}

            <div className='daftar-input-box'>
              <label className="daftar-label">Jenis Kelamin</label>
              <select {...register("jenis_kelamin", {required:true})} >
                <option value="Laki - Laki"> Laki - Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

              {<DaftarInputUserTextNumber errors={errors} register={register} label_msg="NIK" input_type="number" />}
              {<DaftarInputUserTextNumber errors={errors} register={register} label_msg="Tempat Lahir" input="text" />}
              {<DaftarInputUserTextNumber errors={errors} register={register} label_msg="Tanggal Lahir" input_type="number" />}
              {<DaftarInputUserTextNumber errors={errors} register={register} label_msg="Usia" input_type="number" />}
              {<DaftarInputUserTextNumber errors={errors} register={register} label_msg="Asal Sekolah" input_type="text" />}

          </div>
        )}
        {/* Langkah Ke Dua */}
        {step === 2 && (
          <div className='daftar-form'>
            <h2 className="daftar-judul-form">Form 2 : Alamat </h2>
            {<DaftarInputUserTextNumber errors={errors} register={register} label_msg="Nama Jalan" input_type="text" />}
            {<DaftarInputUserTextNumber errors={errors} register={register} label_msg="Nomor Rumah" input_type="text" />}
            {<DaftarInputUserTextNumber errors={errors} register={register} label_msg="RT" input_type="text" />}
            {<DaftarInputUserTextNumber errors={errors} register={register} label_msg="RW" input_type="text" />}
            {<DaftarInputUserTextNumber errors={errors} register={register} label_msg="Desa " input_type="text" />}
            {<DaftarInputUserTextNumber errors={errors} register={register} label_msg="Kecamatan " input_type="text" />}
            {<DaftarInputUserTextNumber errors={errors} register={register} label_msg="Jarak " input_type="text" />}
          </div>
        )}
        {/* Langkah Ke Tiga */}
        {step === 3 && (
          <div className='daftar-form'>
            <h1 className="daftar-judul-form">Form 3 : Nilai</h1>
            <h2 className="daftar-judul-form">Nilai Rapor Semester 7 (Kelas 4 semester ganjil)</h2>
            {<DaftarInputNilaiMapel errors={errors} register={register} label_msg="Bidang Studi PKN" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} label_msg="Bidang Studi B.Indonesia" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} label_msg="Bidang Studi Matematika" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} label_msg="Bidang Studi IPS" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} label_msg="Bidang Studi IPA" input_type="text" />}
          </div>
        )}
        {step === 4 && (
          <div className='daftar-form'>
            <h1 className="daftar-judul-form">Form 3 : Nilai</h1>
            <h2 className="daftar-judul-form">Nilai Rapor Semester 8 (Kelas 4 semester genap)</h2>
            {<DaftarInputNilaiMapel2 errors={errors} register={register} label_msg="Bidang Studi PKN" input_type="text" />}
            {<DaftarInputNilaiMapel2 errors={errors} register={register} label_msg="Bidang Studi B.Indonesia" input_type="text" />}
            {<DaftarInputNilaiMapel2 errors={errors} register={register} label_msg="Bidang Studi Matematika" input_type="text" />}
            {<DaftarInputNilaiMapel2 errors={errors} register={register} label_msg="Bidang Studi IPS" input_type="text" />}
            {<DaftarInputNilaiMapel2 errors={errors} register={register} label_msg="Bidang Studi IPA" input_type="text" />}
          </div>
        )}
        {step === 5 && (
          <div className='daftar-form'>
            <h1 className="daftar-judul-form">Form 3 : Nilai</h1>
            <h2 className="daftar-judul-form">Nilai Rapor Semester 9 (Kelas 5 semester ganjil)</h2>
            {<DaftarInputNilaiMapel3 errors={errors} register={register} label_msg="Bidang Studi PKN" input_type="text" />}
            {<DaftarInputNilaiMapel3 errors={errors} register={register} label_msg="Bidang Studi B.Indonesia" input_type="text" />}
            {<DaftarInputNilaiMapel3 errors={errors} register={register} label_msg="Bidang Studi Matematika" input_type="text" />}
            {<DaftarInputNilaiMapel3 errors={errors} register={register} label_msg="Bidang Studi IPS" input_type="text" />}
            {<DaftarInputNilaiMapel3 errors={errors} register={register} label_msg="Bidang Studi IPA" input_type="text" />}
          </div>
        )}
        {step === 6 && (
          <div className='daftar-form'>
            <h1 className="daftar-judul-form">Form 3 : Nilai</h1>
            <h2 className="daftar-judul-form">Nilai Rapor Semester 10 (Kelas 5 semester genap)</h2>
            {<DaftarInputNilaiMapel4 errors={errors} register={register} label_msg="Bidang Studi PKN" input_type="text" />}
            {<DaftarInputNilaiMapel4 errors={errors} register={register} label_msg="Bidang Studi B.Indonesia" input_type="text" />}
            {<DaftarInputNilaiMapel4 errors={errors} register={register} label_msg="Bidang Studi Matematika" input_type="text" />}
            {<DaftarInputNilaiMapel4 errors={errors} register={register} label_msg="Bidang Studi IPS" input_type="text" />}
            {<DaftarInputNilaiMapel4 errors={errors} register={register} label_msg="Bidang Studi IPA" input_type="text" />}
          </div>
        )}
        {step === 7 && (
          <div className='daftar-form'>
            <h1 className="daftar-judul-form">Form 3 : Nilai</h1>
            <h2 className="daftar-judul-form">Nilai Rapor Semester 11 (Kelas 6 semester ganjil)</h2>
            {<DaftarInputNilaiMapel5 errors={errors} register={register} label_msg="Bidang Studi PKN" input_type="text" />}
            {<DaftarInputNilaiMapel5 errors={errors} register={register} label_msg="Bidang Studi B.Indonesia" input_type="text" />}
            {<DaftarInputNilaiMapel5 errors={errors} register={register} label_msg="Bidang Studi Matematika" input_type="text" />}
            {<DaftarInputNilaiMapel5 errors={errors} register={register} label_msg="Bidang Studi IPS" input_type="text" />}
            {<DaftarInputNilaiMapel5 errors={errors} register={register} label_msg="Bidang Studi IPA" input_type="text" />}
          </div>
        )}

        <div>
          {step > 1 && (
            <button type="button" className="btnNextPrev"onClick={prevStep}>Kembali</button>
          )}
          {step < 7 && (
            <button type="button" className="btnNextPrev"onClick={nextStep}>Selanjutnya</button>
          )}
          {step === 7 && <button type="submit" className="btnNextPrev">Submit</button>}
        </div>
      </form>
      </div>
  );
}

