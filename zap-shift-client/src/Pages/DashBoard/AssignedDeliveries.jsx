import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`
      );
      return res.data;
    },
  });
  const handleDeliveryStatusUpdate = (parcel,status) => {
    const statusInfo = { deliveryStatus:status,
        riderId:parcel.riderId,
        trackingId:parcel.trackingId
     };

    let message=`Parcel Status is updated with ${status.split('_').join(' ')}`
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)

      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title:message,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };
  return (
    <div>
      <h2 className="text-4xl">Parcels Pending Pickup:{parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Other Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>
                 { 
                    parcel.deliveryStatus==='driver_assigned'?
                    <>
                    <button
                    onClick={() => handleDeliveryStatusUpdate(parcel,'rider_arriving')}
                    className="btn btn-primary text-black"
                  >
                    Accept
                  </button>
                  <button className="btn btn-warning text-black ml-3">
                    Reject
                  </button></>
                  :
                  <span> Accepted</span>
                  }
                </td>
                <td>
                     <button
                    onClick={() => handleDeliveryStatusUpdate(parcel,'parcel_picked_up')}
                    className="btn btn-primary text-black"
                  >
                    Marked as picked up
                  </button>
                   <button
                    onClick={() => handleDeliveryStatusUpdate(parcel,'parcel_delivered')}
                    className="btn mx-3 btn-secondary "
                  >
                   Marked as delivered
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

export default AssignedDeliveries;
