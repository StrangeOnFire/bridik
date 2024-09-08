
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, MapPin } from "lucide-react"



export default function UserDashboard({user}) {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={user?.image || "/placeholder.svg"}
                alt={user?.fullName}
              />
              <AvatarFallback>
                {user?.fullName
                  ?.split(" ")
                  ?.map(n => n[0])
                  ?.join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.fullName}</CardTitle>
              <CardDescription>
                {user?.jobTitle === "none"
                  ? "Aspiring Developer"
                  : user?.jobTitle}{" "}
                | {user?.industry}
              </CardDescription>
              <div className="flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm text-muted-foreground">
                  {user.country}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user?.currentSkills?.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Career Readiness</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Short-term Goal Readiness</span>
                <span>{user?.analysisResult?.shortTermReadiness}%</span>
              </div>
              <Progress
                value={user?.analysisResult?.shortTermReadiness}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Long-term Goal Readiness</span>
                <span>{user?.analysisResult?.longTermReadiness}%</span>
              </div>
              <Progress
                value={user?.analysisResult?.longTermReadiness}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skill Development Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Short-term Focus</h3>
              <ul className="list-disc list-inside space-y-1">
                {user?.analysisResult?.skillsForShortTerm?.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-muted-foreground">
                {user?.analysisResult?.stepsForShortTerm}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Long-term Focus</h3>
              <ul className="list-disc list-inside space-y-1">
                {user?.analysisResult?.skillsForLongTerm?.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-muted-foreground">
                {user?.analysisResult?.stepsForLongTerm}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Industry Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{user?.analysisResult?.industryRecommendations}</p>
            <Separator className="my-4" />
            <h3 className="font-semibold mb-2">Career Progression Path</h3>
            <p>{user?.analysisResult?.careerProgressionPath}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {user?.analysisResult?.recommendedCoursesOrCertifications?.map(
                (course, index) => (
                  <li key={index} className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">{course.courseName}</p>
                      <p className="text-sm text-muted-foreground">
                        Provider: {course.provider}
                      </p>
                    </div>
                  </li>
                )
              )}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="text-sm text-muted-foreground text-right">
        Last updated:{" "}
            {new Date(user?.analysisResult?.lastUpdated).toLocaleDateString()}
      </div>
    </div>
  )
}
