import { WandSparkles } from "lucide-react";
import { Timeline } from "../ui/Timeline";
import Link from "next/link";

export default function HowItWorks() {
  return (
    <div>
      <section className="py-16 bg-gray-100 overflow-hidden ">
        <div className="container px-4 max-w-7xl mx-auto flex flex-wrap relative h-fit">
          <div className="w-full p-0 sm:p-8 relative ">
            <div className="">
              
              <h2 className="font-heading mb-6 text-3xl md:text-5xl text-green-700 font-black tracking-tight">
              How it works ?
              </h2>
              <p className="mb-5 text-gray-700 font-[500]">
                Bridik is a personalized AI learning tool that identifies skills
                gaps based on your current job or desired career path. It
                provides a tailored learning plan, recommends courses, and
                tracks progress over time.
              </p>
            
                <div className="mb-4 grid place-items-center text-nowrap md:w-auto p-2">
                  <Link
                    className="flex max-w-[250px] items-center justify-center gap-2 w-full px-4 py-2.5 text-sm text-center text-white font-bold bg-gradient-to-r from-purple-500 to-blue-500 focus:ring-4 focus:ring-blue-200 rounded-full"
                    href="/register"
                  >
                    <WandSparkles />
                    Get AI Feedback
                  </Link>
             
              </div>
            </div>
          </div>
          <div className="w-full  p-0 sm:p-8 ">
            <div className="sm:py-16 sm:px-8 bg-white rounded-3xl">
              <div className=" mx-auto ">
                <Timeline data={data} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const data = [
  {
    title: "Sign Up",
    content: (
      <div>
        <p classNameName="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Create your account in minutes. It&apos;s free and easy to get started!
        </p>
      </div>
    ),
  },
  {
    title: "Create Your Profile",
    content: (
      <div>
        <p classNameName="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Customize your profile to showcase your skills and experience.
        </p>
      </div>
    ),
  },
  {
    title: "Ready To Go",
    content: (
      <div>
        <p classNameName="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
        Get your personalized analysis with skill gaps and action plans:
        </p>
        <div classNameName="mb-8">
          <div classNameName="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            ✅ Skill Development Plan
          </div>
          <div classNameName="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            ✅ Industry Insights
          </div>
          <div classNameName="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            ✅ Career Progression Path
          </div>
          <div classNameName="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            ✅ Recommended Learning Courses
          </div>
          <div classNameName="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            ✅ Career Progress %
          </div>
        </div>
      </div>
    ),
  },
];
