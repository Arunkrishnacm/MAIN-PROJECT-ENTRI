import React from 'react'
import { useEffect, useState } from 'react'
import axios from '../../api/axios'
import "../../style/UserList.css"

function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get('/admin/users', {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                });
                // Sort users so admin and technician appear first
                const usersData = response.data.users || [];
                usersData.sort((a, b) => {
                  const order = { admin: 0, technician: 1, user: 2 };
                  return (order[a.role] ?? 3) - (order[b.role] ?? 3);
                });
                setUsers(usersData);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };
        fetchUsers();
    }, []);

  return (
    <div className="users-container">
      <div className="users-card">
        <h2>Users List</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>No users found</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge role-${user.role}`}>{user.role}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersList
