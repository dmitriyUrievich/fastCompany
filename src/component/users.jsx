import React, { useState } from "react";
import api from "../api";


const Users = () => {

  console.log('test api',api.users.fetchAll())

  return  ( <>
      <h1>User</h1>

  </>)
}
export default Users
