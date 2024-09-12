import Link from "next/link";
import Image from "next/image";
const FeatureCard = ({ title, description }) => {
  return (
    <>
      <div className="flex flex-wrap items-center -m-3 mb-5">
        <div className="w-auto p-3">
          <div className="flex items-center justify-center w-9 h-9 sm:w-16 sm:h-16 bg-white rounded-full">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/parts-1ffae.appspot.com/o/icons%2Fleaf.png?alt=media&token=aa41843d-e3b3-4799-89a4-072feae324e8"
              alt="Check"
              width={24}
              height={24}
            />
          </div>
        </div>
        <div className="flex-1 p-3">
          <h4 className="text-2xl sm:text-4xl font-medium tracking-tight font-heading">
            {title}
          </h4>
        </div>
      </div>
      <p className="text-neutral-300 font-medium tracking-tight">
        {description}
      </p>
    </>
  );
};
export default function Features() {
  return (
    <div>
      <section className="py-12 md:py-24 bg-black/90 text-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 md:mb-20 max-w-5xl">
            <h1 className="relative text-6xl text-green-500 sm:text-7xl  font-semibold font-heading">
              <span className="mr-3">Analyze, improve, and</span>
              <span className="relative inline-block">
                <span className="relative z-10">Achieve Your Goals</span>
                <span className="absolute -bottom-2 left-0 h-1 w-full bg-lime-500 rounded-full"></span>
              </span>
            </h1>
          </div>
          <h3 className="mb-8 text-4xl font-semibold tracking-tight font-heading">
            What makes us different ?
          </h3>
          <div className="flex flex-wrap -m-3 mb-16">
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="flex flex-col h-full justify-center px-4 sm:px-10 p-10 bg-white/10 rounded-2xl">
                <FeatureCard
                  title="AI-Powered Skill Gap Analysis"
                  description="Get real-time feedback on where you stand with your current skills and what's missing to reach your short- and long-term goals. Our AI does the heavy lifting to identify exactly what you need."
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="mb-6 px-4 sm:px-10 p-10 bg-white/10 rounded-2xl">
                <FeatureCard
                  title="Actionable Steps for Growth"
                  description="We provide clear, personalized steps to improve your skills and close the gaps. Whether it's upskilling or taking on new projects, you'll always know the next move."
                />
              </div>
              <div className="px-4 sm:px-10 p-10 bg-white/10 rounded-2xl">
                <FeatureCard
                  title="Data-Driven Insights"
                  description="Our platform analyzes market data to ensure your skills match industry demand. Get insight into where you currently stand and how to keep up with emerging trends."
                />
              </div>
            </div>
            <div className="w-full xl:w-1/3 p-3">
              <div className="flex flex-col h-full justify-center px-4 sm:px-10 p-10 bg-white/10 rounded-2xl">
                <FeatureCard
                  title="Progress Tracking"
                  description="Stay on top of your career progression with our tracking tools. Monitor your readiness, take feedback, and adjust your goals with ease."
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="w-auto">
              <Link
                className="inline-flex justify-center items-center text-center h-20 p-5 font-semibold tracking-tight text-2xl text-white bg-lime-500 hover:bg-lime-600 focus:bg-lime-600 rounded-lg focus:ring-4 focus:ring-lime-400 transition duration-200"
                href="/register"
              >
                Start Your Journey !
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
