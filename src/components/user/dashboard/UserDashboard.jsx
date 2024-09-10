import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, MapPin, ExternalLink } from "lucide-react";
import RetroGrid from "@/components/ui/RetroGrid";
import Image from "next/image";
import ImprovedSkillDevelopmentPlan from "./ImprovedSkillDevelopmentPlan";
import { GridPatternBoxes } from "./GridPatternBoxes";
import CareerProgressionPath from "./CareerProgressionPath";
// ---------------------------------------------------------------------------------
export default function UserDashboard({ user }) {
  return (
    <div className="container mx-auto sm:p-4 space-y-6">
      <Card className="relative ">
        <RetroGrid />
        <CardHeader className="my-4 sm:my-0">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
              <AvatarImage src={user?.image || ""} alt={user?.fullName} />
              <AvatarFallback>
                {user?.fullName
                  ?.split(" ")
                  ?.map((n) => n[0])
                  ?.join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl ">{user.fullName}</CardTitle>
              <CardDescription className="">
                {user?.jobTitle === "none" ? "Open to work" : user?.jobTitle} |{" "}
                {user?.industry}
              </CardDescription>
              <div className="flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1" color="green" />
                <span className="text-sm text-muted-foreground">
                  {user.country}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10 mb-4 sm:mb-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Professional Info</h3>
              <p>
                Experience: {user?.yearsOfExperience} year
                {user?.yearsOfExperience !== 1 ? "s" : ""}
              </p>
              <p>
                Education: {user?.educationalBackground?.degree} in{" "}
                {user?.educationalBackground?.fieldOfStudy}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Career Goals</h3>
              <p>Short-term: {user?.careerGoals?.shortTerm}</p>
              <p>Long-term: {user?.careerGoals?.longTerm}</p>
            </div>
          </div>
        </CardContent>

        <Image
          src="https://firebasestorage.googleapis.com/v0/b/parts-1ffae.appspot.com/o/icons%2Fmocking.png?alt=media&token=dbfff331-e003-4264-97ff-be4fe8558cc8"
          alt={"mocking person"}
          className="absolute -bottom-4 right-4 z-0 opacity-0 sm:opacity-100"
          width={100}
          height={100}
        />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {/* Current Skills */}
        <Card className="mt-0 w-full min-h-[150px] h-full relative z-10  bg-gradient-to-b dark:from-neutral-900 from-white dark:to-neutral-950 to-white overflow-hidden">
          <CardHeader className="mb-4 mt-2 sm:mt-0 sm:mb-0">
            <CardTitle className="flex items-center gap-2 border-b  pb-2 ">
              Current Skills
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/parts-1ffae.appspot.com/o/icons%2Flight-bulb%20(1).png?alt=media&token=3483aefb-a3c2-4006-8305-1dd3756a07c9"
                alt="skills"
                width={20}
                height={20}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 monstre">
              {user?.currentSkills?.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-black/5 text-black flex items-center gap-2 px-2 py-1"
                >
                  <div className="w-1 h-1 rounded-full bg-black"></div>
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
          <GridPatternBoxes />
        </Card>

        {/* Career Progress */}
        <Card className="relative z-10 overflow-hidden pb-2 sm:pb-0">
          <CardHeader className="mb-4 mt-2 sm:mt-0 sm:mb-0">
            <CardTitle className="">Career Progress %</CardTitle>
            <CardDescription>
              How close you are to achieving your short-term and long-term
              career goals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Short-term Goal: {user?.careerGoals?.shortTerm}</span>
                <span>{user?.analysisResult?.shortTermReadiness}%</span>
              </div>
              <Progress
                value={user?.analysisResult?.shortTermReadiness}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Long-term Goal: {user?.careerGoals?.longTerm}</span>
                <span>{user?.analysisResult?.longTermReadiness}%</span>
              </div>
              <Progress
                value={user?.analysisResult?.longTermReadiness}
                className="w-full"
              />
            </div>
          </CardContent>
          <GridPatternBoxes />
        </Card>
      </div>

      <ImprovedSkillDevelopmentPlan user={user} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {" "}
        {/* Industry Insights */}
        <Card className="relative z-10 p-6 rounded-3xl overflow-hidden bg-white/20">
          <CardHeader>
            <CardTitle className="text-2xl   font-bold  flex items-center  gap-2  ">
              Industry Insights{" "}
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/parts-1ffae.appspot.com/o/icons%2Fweather-alert.png?alt=media&token=4504efaf-d5c3-4b41-8d6a-36c5bc2db81e"
                alt="skills"
                width={100}
                height={100}
              />
            </CardTitle>
            <CardDescription className="text-black ">
              Customized Advice from Bridik on how to improve your skills and
              progress in your career !
            </CardDescription>
          </CardHeader>
          <Separator className="mb-4 sm:mb-0" />
          <CardContent className="text-black font-[500] ">
            <p>{user?.analysisResult?.industryRecommendations}</p>
          </CardContent>
          <GridPatternBoxes />
        </Card>
        <CareerProgressionPath user={user} />
      </div>
      {/* Recommended Learning */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            Recommended Learning
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/parts-1ffae.appspot.com/o/icons%2Fidea%20(1).png?alt=media&token=463b96c9-a7d7-4547-ba0f-f2460ceefaca"
              alt="skills"
              width={100}
              height={100}
              className="w-10 h-10 sm:w-16 sm:h-16"
            />
          </CardTitle>
          <CardDescription>
            Courses and certifications that are recommended for you to improve
            your skills and progress in your career
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {user?.analysisResult?.recommendedCoursesOrCertifications?.map(
              (course, index) => (
                <li
                  key={index}
                  className="bg-white/50 rounded-lg p-4 shadow-sm transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <BookOpen className="flex-shrink-0 h-6 w-6 text-primary mt-1" />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg mb-1">
                        {course.courseName}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {course.provider}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        {course.description}
                      </p>
                      <button
                        onClick={() => window.open(course.link, "_blank")}
                        className="text-white font-[500] text-sm bg-primary/60 hover:bg-primary/80 px-4 py-2 rounded-full transition-colors duration-300 flex items-center gap-2"
                      >
                        View Course <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground text-right">
        Last updated:{" "}
        {new Date(user?.analysisResult?.lastUpdated).toLocaleDateString()}
      </div>
    </div>
  );
}
