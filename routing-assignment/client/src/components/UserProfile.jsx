import React from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const {id} = useParams();
    return <h1>User Profile Page for User ID: {id}</h1>;
}
export default UserProfile;