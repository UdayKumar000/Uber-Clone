import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className=" h-screen pt-5  w-full flex justify-between flex-col bg-[url('./assets/images/Uber-Home.jpg')] bg-cover">
        <img
          className="w-14 ml-5"
          src="../src/assets/images/Uber-Logo.png"
          alt="Uber Logo"
        />
        <div className="bg-white py-4 px-4 pb-7">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
          <Link
            to="/login"
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-4"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
