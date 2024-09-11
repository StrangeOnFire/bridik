import Image from "next/image";
import LoginForm from "../../components/auth/LoginForm";

export default function Login() {
  return (
    <div className="flex w-screen h-screen">
      <div className="bg-[#f5f5f5] hidden lg:grid w-full lg:w-[50%]  justify-center items-center h-screen">
        <div className="border-y-2 border-gray-300 p-4 py-8 mx-14 max-w-3xl">
          <h1 className="text-xl font-semibold p-4 flex items-center">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/parts-1ffae.appspot.com/o/icons%2Fleaf.png?alt=media&token=aa41843d-e3b3-4799-89a4-072feae324e8"
              alt="Bridik"
              className="w-8 h-8 mr-2 block"
              width={100}
              height={100}
            />
            Bridik
          </h1>
          {/* <p className="text-sm text-gray-500">
            A personalized learning tool that identifies skills gaps based on
            your current job or desired career path. It provides a tailored
            learning plan, recommends courses, and tracks progress over time.
          </p> */}
        </div>
      </div>{" "}
      <div className="bg-white flex justify-center items-center w-full lg:w-[50%] h-screen">
        <LoginForm />
      </div>
    </div>
  );
}
