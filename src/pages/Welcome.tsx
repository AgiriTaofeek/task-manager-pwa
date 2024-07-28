import { Link } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";
import imageSrc from "../assets/wellcome.svg";

function Welcome() {
  return (
    <div className="p-4 max-w-xl">
      <div className="max-w-64 mx-auto my-auto">
        <div className="mx-auto pt-10">
          <img src={imageSrc} alt="Welcome page" />
        </div>

        <div className="mt-10">
          <p className="text-3xl">
            <span className="text-green-200 mr-2 ">Better</span>
            Task Management
          </p>
          <p className="mt-4 text-sm text-gray-300 text-opacity-90">
            Simple task manager app
          </p>
        </div>

        <div className="mt-10">
          <Link
            to="/tasks"
            className="w-fit flex gap-2 rounded-full bg-yellow-200 text-black"
          >
            <span className="my-auto inline-block pl-5 pr-3">Get Started</span>
            <div className="p-4 rounded-full m-1 text-white bg-black">
              <IoArrowForward className="my-auto text-2xl text-white" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
