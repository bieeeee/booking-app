import "./datatable.scss";
import { DataGrid } from '@mui/x-data-grid';
import { userColumns } from "../../datatablesource.js";
import { Link, useLocation } from "react-router-dom"
import useFetch from "../../hooks/useFetch";
import axios from "axios";

function Datatable() {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { data, setData, loading, error } = useFetch(`/${path}`);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
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
        Add New User
        <Link
          to="/users/new"
          style={{ textDecoration: "none" }}
          className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        rows={data}
        columns={userColumns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 9 },
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
