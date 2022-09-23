import { RequestApi } from "../RequestMethod";

const getAll = () => {
  return RequestApi.get("users");
};

const get = (id) => {
  return RequestApi.get(`users/${id}`);
};

const create = (data) => {
  return RequestApi.post("users", data);
};

const update = (id, data) => {
  return RequestApi.post(`users/${id}`, data);
};

const remove = (id) => {
  return RequestApi.delete(`/users/${id}`);
};

const UserCrud = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default UserCrud;
