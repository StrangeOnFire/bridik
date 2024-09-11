import { ArrowRight } from "lucide-react";
import RegisterForm from "../../components/auth/RegisterForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Register() {
  return (
    <div>
      <div className="relative mb-4 sm:mb-0 bg-gradient-to-r from-green-700 to-lime-600  px-6 py-2  sm:px-3.5 text-white flex justify-around items-center flex-col sm:flex-row">
        <p className="text-sm font-semibold leading-6 ">
          Wants demo how we actually work?
        </p>
        <Link href="/dashboard">
          <Button>
            Try with dummy data <ArrowRight className="ml-2 w-4 h-4 " />
          </Button>
        </Link>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 pt-2 sm:pt-12 px-0 sm:px-6 lg:px-8">
        <div className=" w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-green-700">
              Bridik
            </h2>
            <p className="mt-2 text-center text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-500 font-[500] hover:text-blue-600 underline underline-offset-4"
              >
                Login
              </Link>
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
