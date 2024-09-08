import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, BookOpen, Target, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function ImprovedSkillDevelopmentPlan({ user }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-bold flex items-center gap-4 ">
          Skill Development Plan
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/parts-1ffae.appspot.com/o/icons%2Fdesign-thinking.png?alt=media&token=370adfc5-11a6-4c5d-a382-01af831c18e3"
            alt="roadmap"
            width={50}
            height={50}
          />
        </CardTitle>
        <CardDescription>Your personalized roadmap to success</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="short-term" className="w-full ">
          <TabsList className="grid w-full grid-cols-2 max-w-2xl ">
            <TabsTrigger value="short-term">Short-term Plan</TabsTrigger>
            <TabsTrigger value="long-term">Long-term Vision</TabsTrigger>
          </TabsList>
          <TabsContent value="short-term" className="mt-4">
            <div className="space-y-4">
              <div className="grid gap-4 mt-4">
                <Card className="!shadow-none border-black/20">
                  <CardHeader>
                    <CardTitle className="text-base text-green-600 flex items-center ">
                      <Target className="inline mr-2 h-5 w-5 " />
                      Focus Skills
                    </CardTitle>
                    <CardDescription>
                      These are the skills you need to focus on to achieve your
                      short-term goals.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {user?.analysisResult?.skillsForShortTerm.map(
                        (skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card className="!shadow-none border-black/20">
                  <CardHeader>
                    <CardTitle className="text-base text-green-600 flex items-center ">
                      <TrendingUp className="inline mr-2 h-5 w-5 " />
                      Action Steps
                    </CardTitle>
                    <CardDescription>
                      These are the steps you need to take to achieve your
                      short-term goals.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal list-inside space-y-2">
                      {user?.analysisResult?.stepsForShortTerm
                        .split(". ")
                        .map((step, index) => (
                          <li key={index} className="text-sm">
                            {step}
                          </li>
                        ))}
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="long-term" className="mt-4">
            <div className="space-y-4">
              <div className="grid gap-4 mt-4">
                <Card className="!shadow-none border-black/20">
                  <CardHeader>
                    <CardTitle className="text-base text-green-600 flex items-center ">
                      <BookOpen className="inline mr-2 h-5 w-5 " />
                      Skills to Develop
                    </CardTitle>
                    <CardDescription>
                      These are the skills you need to focus on to achieve your
                      long-term goals.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {user?.analysisResult?.skillsForLongTerm.map(
                        (skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card className="!shadow-none border-black/20">
                  <CardHeader>
                    <CardTitle className="text-base text-green-600 flex items-center ">
                      <ArrowRight className="inline mr-2 h-5 w-5 " />
                      Long-term Strategy
                    </CardTitle>
                    <CardDescription>
                      These are the steps you need to take to achieve your
                      long-term goals.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal list-inside space-y-2">
                      {user?.analysisResult?.stepsForLongTerm
                        .split(". ")
                        .map((step, index) => (
                          <li key={index} className="text-sm">
                            {step}
                          </li>
                        ))}
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
