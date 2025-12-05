import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const {user,loading} =useAuth()
    const axiosSecure=useAxiosSecure()
     const {isLoading:roleLoading,data:role='user'}=useQuery({
        queryKey:['user-role',user?.email],
        enabled:!!user?.email&& !loading,
        queryFn: async()=>{
            if(!user?.email){
                return 'user'
            }
            const res=await axiosSecure.get(`/users/${user.email}/role`)
            console.log('use role',res.data);
            return res.data.role ||'user'
        }
     })
    return  {role,roleLoading:roleLoading||loading}
};

export default useRole;