import "./datatable.scss";
import { DataGrid } from '@mui/x-data-grid';
import { userColumns } from "../../datatablesource.js";
import { Link, useLocation } from "react-router-dom"
import useFetch from "../../hooks/useFetch";
import axios from "axios";

function Datatable({ columns }) {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { data, setData, loading, error } = useFetch(`/${path}`);

  const handleDelete = async (id) => {
    try {
      if (path === "rooms") {
        const { data } = await axios.get("/rooms")
        const room = data.find(r => r._id === id)
        const hotelId = room.hotel
        await axios.delete(`/rooms/${id}/${hotelId}`);
      } else {
        await axios.delete(`/${path}/${id}`);
      }
      setData(data.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ color: "inherit", textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>Delete</div>
          </div>
        )
      }
    }
  ]

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path.toUpperCase()}
        <Link
          to={`/${path}/new`}
          style={{ textDecoration: "none" }}
          className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        rows={data}
        columns={columns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 1, pageSize: 9 },
          },
        }}
        pageSizeOptions={[9]}
        checkboxSelection
        className="datagrid"
        getRowId={(row) => row._id}
      />
    </div>
  )
}

export default Datatable
