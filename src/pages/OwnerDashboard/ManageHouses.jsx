import { FaEdit } from "react-icons/fa";
import Title from "../../components/Title";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
const ManageHouses = () => {
  const { user, email } = useAuth();

  const axiosPublic = useAxiosPublic();
  const {
    data: myHouses = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myHouses"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/houses?email=${email}`);
      return res.data;
    },
  });
  const handleDeleteHouse = (id) => {
    axiosPublic.delete(`/house/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.deletedCount > 0) {
        enqueueSnackbar("You have deleted the house info successfully", {
          variant: "success",
          autoHideDuration: 1000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        refetch();
      }
    });
  };
  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center my-20">
          <ClipLoader className="text-slate-800" size={50} />
        </div>
      ) : (
        <section className="container mx-auto px-5">
          {myHouses?.length > 0 ? (
            <div>
              <div id="table" className="flex flex-col mt-6">
                <Title
                  heading={`House owned by ${user?.name}`}
                  subHeading={"You can update or delete any house info"}
                />
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle px-6 lg:px-8">
                    <div className="overflow-hidden border border-black  md:rounded-lg">
                      <table className="min-w-full divide-y">
                        <thead className="bg-orangeColor">
                          <tr className="px-5 text-center md:text-lg">
                            <th className="px-4 py-3.5  text-left  text-primary">
                              House Details
                            </th>
                            <th className="md:py-3.5 text-left  text-primary md:text-right lg:text-center">
                              <p className="hidden md:block">Rent per month</p>
                            </th>

                            <th className="lg:py-3.5  text-left  text-primary ">
                              <p className="hidden lg:block">City</p>
                            </th>
                            <th className="md:py-3.5  text-left  text-primary ">
                              <p className="hidden lg:block">Availability</p>
                            </th>
                            <th className="md:py-3.5  text-left  text-primary ">
                              <p className="hidden lg:block">Action</p>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {myHouses?.map((house) => (
                            <tr key={house._id} className=" px-5">
                              <td className="p-4 text-sm font-medium ">
                                <div className="inline-flex items-center gap-x-3">
                                  <img
                                    className="h-28 md:h-20 w-36 md:w-32"
                                    src={house.image}
                                    alt=""
                                  />
                                  <div className="flex items-center gap-x-2">
                                    <div>
                                      <h2 className="font-semibold  ">
                                        {house.name}
                                      </h2>
                                      <p className="text-xs font-normal lg:hidden">
                                        Total Rooms: {house.totalRooms}
                                      </p>
                                      <p className="text-xs font-normal ">
                                        Bedrooms: {house.bedrooms}
                                      </p>
                                      <p className="text-xs font-normal ">
                                        Bathrooms: {house.bathrooms}
                                      </p>
                                      <p className="text-xs font-normal text-indigo-600 md:hidden">
                                        Rent : {house.rentPerMonth} bdt/month
                                      </p>
                                      <p className="text-xs font-normal ">
                                        Availability:{" "}
                                        {house.availability.slice(0, 10)}
                                      </p>
                                      <p className="text-xs font-normal text-blue-500 lg:hidden">
                                        City: {house.location}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="md:py-4 text-sm text-indigo-600 font-semibold md:text-right lg:text-center">
                                <p className="hidden md:block">
                                  {house.rentPerMonth}
                                </p>
                              </td>
                              <td className="lg:py-4 text-sm text-purple-500 font-semibold">
                                <p className="hidden lg:block">{house.city}</p>
                              </td>
                              <td className="lg:py-4 text-sm text-secondary font-semibold ">
                                <p className="hidden lg:block">
                                  {house.availability.slice(0, 10)}
                                </p>
                              </td>
                              <td className="lg:py-4 md:text-lg font-semibold text-center">
                                <Link to={`/dashboard/update/${house._id}`}>
                                  <button className="mr-5 text-secondary hover:text-primary">
                                    <FaEdit />
                                  </button>
                                </Link>
                                <br />
                                <br />
                                <button
                                  onClick={() => handleDeleteHouse(house._id)}
                                  className="mr-5 text-red-500 hover:text-red-700"
                                >
                                  <AiFillDelete />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-lg text-primary my-20 px-5 font-semibold">
              You haven't upload any house info for rent
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default ManageHouses;
