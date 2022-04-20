import React, { useState, useEffect, useMemo, useRef } from "react";
import StudentDataService from "../services/StudentService";
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";

const StudentsList = (props) => {
  const [students, setStudents] = useState([]);
  const [searchName, setSearchName] = useState("");
  const studentsRef = useRef();
  const navigate = useNavigate();

  studentsRef.current = students;

  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    retrieveStudents();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveStudents = () => {
    StudentDataService.getAll()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveStudents();
  };

  const removeAllStudents = () => {
    StudentDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    StudentDataService.findByName(searchName)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openStudent = (rowIndex) => {
    const id = studentsRef.current[rowIndex].id;
    navigate("/students/" + id);
  };

  const deleteStudent = (rowIndex) => {
    const id = studentsRef.current[rowIndex].id;

    StudentDataService.remove(id)
      .then((response) => {
        navigate("/students/");
        //let history = useNavigate();
        //history.push("/students/");
        //props.history.push("/students");

        let newStudents = [...studentsRef.current];
        newStudents.splice(rowIndex, 1);

        setStudents(newStudents);
        setDeleteMessage("Student deleted successfully.");
        //refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openStudent(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <span onClick={() => deleteStudent(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: students,
    });

  return (
    <div className="list row">
      {/* <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div> */}
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <p></p>
      <div className="alert alert-light">
        <p className="error text-danger"> {deleteMessage} </p>
      </div>
      <p></p> */}
      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllStudents}>
          Delete All Students
        </button>
      </div>
    </div>
  );
};

export default StudentsList;
