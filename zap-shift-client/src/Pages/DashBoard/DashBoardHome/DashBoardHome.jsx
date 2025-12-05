import React from 'react';
import useRole from '../../../Hooks/useRole';
import Loading from '../../Loading';
import AdminDashBoardHome from './AdminDashBoardHome';
import RiderDashBoardHome from './RiderDashBoardHome';
import UserDashBoardHome from './UserDashBoardHome';

const DashBoardHome = () => {
    const {role,roleLoading}=useRole()
    if(roleLoading){
        return <Loading></Loading>
    }
    if(role==='admin'){
        return <AdminDashBoardHome></AdminDashBoardHome>
    }
    else if(role==='rider'){
        return <RiderDashBoardHome></RiderDashBoardHome>
    }
    else{
        return <UserDashBoardHome></UserDashBoardHome>
    }
  
};

export default DashBoardHome;