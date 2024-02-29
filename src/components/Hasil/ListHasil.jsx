import "./ListHasil.css";
import { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "../../lib/axios";

const ListHasil = () => {
  const [hasil, setHasil] = useState([]);
  const [nilaiAlt, setNilaiAlt] = useState([]);
  const [jmlData, setJmlData] = useState(0);
  const navigate = useNavigate();

  // Start Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(hasil.length / itemsPerPage);

  const handleClick = (value) => {
    if (value === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (value === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (typeof value === "number" && value >= 1 && value <= totalPages) {
      setCurrentPage(value);
    }
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = hasil.slice(startIndex, endIndex);
  currentData.sort((a, b) => b.skor_akhir - a.skor_akhir);
  // End of PAgination

  // nyoba
  const hasilkan = async()=>{
    await axios.post(`/hasil`);
    window.location.reload();
  }

  // Cek ketersediaan Data
  const getNilaiAlternatif = async(data) =>{
    try {
      const response = await axios.get('/nilai_alternatif', data);
      console.log(response.data);
      setNilaiAlt(response.data);
    } catch (error) {
      console.error('Gagal mengambil data :', error);
    }
  };
  const newData = {
    nama_alternatif:"Rifki"
  }
  const existingKriteria = nilaiAlt.find(k => 
    k.nama_alternatif === newData.nama_alternatif
  );
  console.log(existingKriteria);
  // END Cek ketersediaan Data

  const getHasil = async() =>{
    try {
      const response = await axios.get('/hasil');
      setHasil(response.data)
    } catch (error) {
      console.error('Gagal mengambil data dari API:', error);
    }
  };
  const jumlahData = async () => {
    try {
      const response = await axios.get("/hasil");
      setJmlData(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHasil();
    jumlahData();
    getNilaiAlternatif();
  }, []);
  
  const hapusHasil = async (id) => {
    try {
      await axios.delete(`/hasil/${id}`);
      getHasil();
    } catch (error) {
      console.log(error);
    }
  };
  const handleTambahButtonClick = () => {
    navigate(`/hasil/addHasil`);
  };

  return (
    <div className="list-hasil-container">
      <div className="list-hasil-grid">
          <h1 className="list-hasil-judul">Hasil Perhitungan MOORA </h1>
          <p className="list-rekap-subjudul">Hasil dari perhitungan yang dilakukan dengan menggunakan perhitungan SPK dengan Metode MOORA</p>
        <button onClick={handleTambahButtonClick} className="btnadd-siswa">Tambah</button>
        <button onClick={hasilkan} className="btnadd-siswa">Hasil</button>
        <div className="list-hasil-table-container">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Alternatif (Siswa)</th>
                <th>Jalur Pendaftaran</th>
                <th>Nilai</th>
                <th>Peringkat</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((has, index) => (
                <tr key={has.id}>
                    <td>{startIndex +index + 1}</td>
                    <td>{has.nama_alternatif}</td>
                    <td>{has.jalur_pendaftaran}</td>
                    <td>{has.nilai}</td>
                    <td>ke -{index + 1}</td>
                    <td>
                        <Link
                        to={`/hasil/editHasil/${has.id}`}
                        className="btnEdit"
                        >
                        Edit
                        </Link>
                        <button onClick={() => {
                                if (window.confirm('Apakah Anda yakin ingin menghapus  data Hasil ini?')) {
                                hapusHasil(has.id);
                                }
                            }}
                            className="btnHapus"
                            >
                            Hapus
                        </button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="pagination">
          <button onClick={() => handleClick("prev")} class="page-button">Prev</button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handleClick(index + 1)}
              className={currentPage === index + 1 ? "page-button-active" : "page-button-nonactive"}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={() => handleClick("next")} class="page-button">Next</button>
        </div>
        <p className="jumlah-data">Jumlah Data : {jmlData}</p>
        <p className="jumlah-data">Jumlah Page : {totalPages}</p>
      </div>
    </div>
  );
}

export default ListHasil;
