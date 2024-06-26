import "./ListUser.css";
// import DashboardMenu from "../Dashboard/DashboardMenu";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../lib/axios";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [jmlData, setJmlData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(()=> {
    getUsers();
    jumlahData();
  }, []);

  // Batas
  const jumlahData = async () => {
    try {
      const response = await axios.get("/users");
      setJmlData(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  // Batas
  const itemsPerPage = 5;
  const totalPages = Math.ceil(users.length / itemsPerPage);
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
  const filteredData = users.filter((user) =>
  user.username.toLowerCase().includes(search.toLowerCase())
  );
  const currentData = filteredData.slice(startIndex, endIndex);
  
  // Batas
  const getUsers = async() =>{
    const response = await axios.get('/users');
    setUsers(response.data);
  }
  const hapusUser = async (uuid) =>{
    try {
      await axios.delete(`/users/${uuid}`);
        getUsers();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="list-user-container">
      <div className="list-user-grid">
        <h1 className="list-user-judul">Daftar User</h1>
        <div className="action-box">
          <Link to={`/userlist/adduser`} className="btnadd-user">
            Tambah User
          </Link>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari..."
            className="search-box"
          />
        </div>
        <div className="container-table-user">
          <table id="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>ID User</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((user, index) => (
                <tr key={user.uuid}>
                  <td>{startIndex+index + 1}</td>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="button-action">
                    <Link
                      to={`/userlist/edituser/${user.id}`}
                      className="btnEdit-user"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => hapusUser(user.id)}
                      className="btnHapus-user"
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

export default ListUser