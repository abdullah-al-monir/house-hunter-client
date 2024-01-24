import Title from "../../components/Title";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col justify-center">
      <Title
        heading={"Your Profile"}
        subHeading={"Update or change your profile information"}
      />

      <div className="flex flex-col mx-auto my-20">
        <div>
          <img
            src={user?.dp}
            alt="Profile"
            className="size-48 rounded-full mx-auto"
          />
        </div>
        <div className="mt-5">
          <div>
            <h3 className="text-center text-2xl font-semibold text-primary">
              {user?.name}
            </h3>
          </div>
          <div className="">
            <p className="uppercase text-orangeColor font-bold text-center">
              HOUSE {user?.role}
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 justify-between text-lg mt-5">
            <div>
              <p>Phone:</p>
              <p>{user?.number}</p>
            </div>
            <div>
              <p>Email:</p>
              <p>{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
