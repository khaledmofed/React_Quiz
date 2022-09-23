import React, { useEffect, useState } from "react";
import UserCrud from "../ApiCall/UserCrud";
import { BiTrash, BiEdit } from "react-icons/bi";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

function ListUser(props) {
  const [users, setUsers] = useState([]);
  const [deleteid, setDeleteid] = useState("");
  const [search, setSearch] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [initialListUsers, setInitialListUsers] = useState([]);
  var heading = ["Username", "First name", "Last name", "Email", "Action"];
  const ListOfUsers = () => {
    UserCrud.getAll()
      .then((response) => {
        response.status && setUsers(response?.data?.payload);
        response.status && setInitialListUsers(response?.data?.payload);
      })
      .catch((e) => {});
  };
  useEffect(() => {
    ListOfUsers();
  }, []);

  function handleDelete(id) {
    swal({
      title: "Are you sure to delete this user?",
      text: "Once deleted, you will not be able to restore this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        UserCrud.remove(id)
          .then((response) => {
            swal({
              title: "Good job!",
              text: "The deletion process was successful",
              icon: "success",
              button: "Aww yiss!",
            });

            ListOfUsers();
          })
          .catch((e) => {});
      } else {
        swal("The user data is still there and has not been deleted");
      }
    });
  }

  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!search.first_name && !search.last_name && !search.email) {
      setUsers(initialListUsers);
      return;
    }
    setUsers((prev) => {
      const filtered = initialListUsers.filter((user) => {
        let flag = true;
        if (user.first_name) {
          if (!user.first_name.toLowerCase().includes(search.first_name)) {
            flag = false;
          }
        }
        if (user.last_name) {
          if (!user.last_name.toLowerCase().includes(search.last_name)) {
            flag = false;
          }
        }
        if (user.email) {
          if (!user.email.toLowerCase().includes(search.email)) {
            flag = false;
          }
        }

        return flag;
      });
      return filtered;
    });
  }, [search]);
  const handleFilter = async (event) => {
    const searchData = {
      ...search,
      [event.target.name]: event.target.value,
    };
  };

  return (
    <div>
      <div className="search-div">
        <div className="row">
          <div className="col-12">
            <h4> Search</h4>
          </div>
          <div className="col-4">
            <InputGroup className="mb-3">
              <InputGroup.Text>first name</InputGroup.Text>
              <Form.Control
                aria-label="Default"
                name="first_name"
                type="search"
                onChange={handleChange}
              />
            </InputGroup>
          </div>
          <div className="col-4">
            <InputGroup className="mb-3">
              <InputGroup.Text>last name</InputGroup.Text>
              <Form.Control
                aria-label="Default"
                name="last_name"
                type="search"
                onChange={handleChange}
              />
            </InputGroup>
          </div>
          <div className="col-4">
            <InputGroup className="mb-3">
              <InputGroup.Text>email</InputGroup.Text>
              <Form.Control
                aria-label="Default"
                name="email"
                type="search"
                onChange={handleChange}
              />
            </InputGroup>
          </div>
        </div>
      </div>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            {heading.map((head, index) => (
              <th key={index}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  id={user.id}
                  type="button"
                  onClick={() => handleDelete(user.id)}
                  className="btn btn-md btn-icon"
                >
                  <BiTrash />
                </button>
                <Link
                  to={`edit/${user.id}`}
                  type="button"
                  className="btn btn-md btn-icon"
                >
                  <BiEdit />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListUser;
