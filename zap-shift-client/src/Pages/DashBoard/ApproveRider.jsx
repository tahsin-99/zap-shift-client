import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {  FaUserCheck } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { IoPersonRemove } from "react-icons/io5";
import Swal from "sweetalert2";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus=(rider,status)=>{
    
    const updateInfo = { status: status,email:rider.riderEmail };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider status set to ${status}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  const handleApproval=rider=>{
    updateRiderStatus(rider,'approved')
  }
  const handleRejection=rider=>{
    updateRiderStatus(rider,'rejected')
  }
  
  
  return (
    <div>
      <h1 className="text-4xl font -bold">Pending Approval:{riders.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.ridername}</td>
                <td>{rider.riderEmail}</td>
                <td>{rider.District}</td>
                
                <td><p className={`${rider.status==='approved'?'text-green-600':'text-red-500'}
                    `}>{rider.status}</p></td>
                     <td>{rider.workStatus}</td>
                <td >
                 <button
                    onClick={() => handleApproval(rider)}
                    className="btn "
                  >
                    <FaEye />

                  </button>

                  <button
                    onClick={() => handleApproval(rider)}
                    className="btn "
                  >
                    <FaUserCheck />
                  </button>
                  
                  <button onClick={()=>handleRejection(rider)} className="btn mx-2 ">
                    <IoPersonRemove />
                  </button>
                  <button className="btn ">
                    <FaTrashCan />
                  </button>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRider;
