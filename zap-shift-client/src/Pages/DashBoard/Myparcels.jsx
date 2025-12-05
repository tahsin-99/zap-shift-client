import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FiEdit } from "react-icons/fi";
import { FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router";

const Myparcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [],refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleParcelDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are You want to Delete ?",
      text: "Check Carefully!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm ",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            // refresh the data
            refetch()
            Swal.fire({
              title: "Deleted",
              text: "Parcel Request has been delete",
              icon: "success",
            });
            
          }
        });
      }
    });
  };
 
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Cost</th>
            <th>Payment</th>
            <th>Dellivery Status</th>
            <th>Tracking Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <th>{index + 1}</th>
              <td>{parcel.parcelName}</td>
              <td>{parcel.cost}</td>
              <td>
                {
                    parcel.paymentStatus==='paid'?
                    <span className="text-green-800 font-bold">Paid</span>:
                    <Link to={`/dashboard/payment/${parcel._id}`}>
                    <button className=" text-black bg-primary btn">Pay</button>
                    </Link>
                }
              </td>
              <td>
                <Link to={`/parcel-track/${parcel.trackingId}`}>{parcel.trackingId}</Link>
              </td>
              <td>{parcel.deliveryStatus}</td>
              <td>
                <button className="btn btn-square hover:bg-primary">
                  <FiEdit />
                </button>
                <button className="btn btn-square hover:bg-blue-400 mx-2">
                  <FaMagnifyingGlass></FaMagnifyingGlass>
                </button>
                <button
                  onClick={() => handleParcelDelete(parcel._id)}
                  className="btn btn-square hover:bg-red-400"
                >
                  <FaTrashCan></FaTrashCan>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Myparcels;
