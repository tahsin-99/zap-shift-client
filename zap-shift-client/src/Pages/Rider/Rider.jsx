import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const servicecenters = useLoaderData();
  const regionsDuplicate = servicecenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const districtsByRegion = (region) => {
    const regionDistricts = servicecenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };
  const riderRegion = useWatch({ control, name: "Region" });

  const handleRider = (data) => {
    // console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your application is submitted.Check Email",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/");
      }
    });
  };
  return (
    <div>
      <p className="text-primary text-4xl">Be a Rider</p>
      <form
        onSubmit={handleSubmit(handleRider)}
        className="p-4 mt-12 text-black"
      >
        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* sender info*/}

          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Rider Details</h4>
            <label className="label">Rider Name</label>
            <input
              type="type"
              {...register("riderName")}
              className="input w-full"
              placeholder="Rider Name"
              defaultValue={user.displayName}
            />
            <label className="label">Rider Email</label>
            <input
              type="type"
              {...register("riderEmail")}
              className="input w-full"
              placeholder="Rider Email"
              defaultValue={user.email}
              readOnly
            />

            <fieldset className="fieldset">
              <legend className="fieldset-legend"> Region</legend>
              <select
                {...register("Region")}
                defaultValue="Pick a region"
                className="select"
              >
                <option disabled={true}>Pick a region</option>

                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend"> District</legend>
              <select
                {...register("District")}
                defaultValue="Pick a District"
                className="select"
              >
                <option disabled={true}>Pick a District</option>

                {districtsByRegion(riderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            <label className="label mt-4">Rider Address</label>
            <input
              type="type"
              {...register("riderAddress")}
              className="input w-full"
              placeholder=" Rider Address"
            />

            <label className="label">Rider Phone No.</label>
            <input
              type="type"
              {...register("riderPhone")}
              className="input w-full"
              placeholder="Rider Phone"
            />
          </fieldset>

          <div>
            <fieldset className="fieldset">
              <h4 className="text-2xl font-semibold">More Details</h4>
              <label className="label">Driving License</label>
              <input
                type="type"
                {...register("license")}
                className="input w-full"
                placeholder="Driving License"
              />
              <label className="label">NID</label>
              <input
                type="type"
                {...register("nid")}
                className="input w-full"
                placeholder="NID Number"
              />

              <label className="label mt-4">Bike Information</label>
              <input
                type="type"
                {...register("bike")}
                className="input w-full"
                placeholder=" Bike Number"
              />
            </fieldset>
          </div>
        </div>
        <input
          type="submit"
          className="btn btn-primary text-black mt-5"
          value="Apply as a Rider"
        />
      </form>
    </div>
  );
};

export default Rider;
