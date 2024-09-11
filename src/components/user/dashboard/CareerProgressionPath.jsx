import React from "react";
import { Briefcase, ChevronRight, Star, Trophy } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
// Function to convert the string into JSON
const convertToJSON = (careerString) => {
  const stages = careerString?.split("->").map((stage) => stage.trim());
  return stages
    ?.map((stage) => {
      const match = stage?.match(/(.+?)\s\((.+?)\)/);
      if (match) {
        return {
          title: match[1].trim(),
          years: match[2].trim(),
        };
      }
      return null;
    })
    .filter((stage) => stage !== null);
};
const icons = [
  Briefcase,
  ChevronRight,
  Star,
  ChevronRight,
  Trophy,
  Star,
  Star,
  Star,
];
export default function CareerProgressionPath({ user }) {
  const careerStages = user?.analysisResult?.careerProgressionPath;

  return (
    <Card className="w-full h-fit">
      <CardHeader className="mb-4 mt-2 sm:mt-0 sm:mb-0">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          Career Progression Path
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/parts-1ffae.appspot.com/o/icons%2Fidea.png?alt=media&token=24d7c626-5919-4e4e-a620-afd3c86c9582"
            alt="Career Path"
            width={100}
            height={100}
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
        </CardTitle>
        <CardDescription>
          AI generated career progression path for you by Bridik
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-w-4xl mx-auto  sm:px-6">
          <div className="relative">
            {careerStages?.map((stage, index) => {
              const Icon = icons[index % icons.length];
              return (
                <div key={index} className={`flex items-start space-x-4 `}>
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center  border bg-gray-50`}
                  >
                    <Icon color="grey" size={20} />
                  </div>
                  <div className="flex-grow flex flex-col">
                    <h3 className="text-lg font-semibold flex items-center">
                      {stage}
                    </h3>

                    {index < careerStages.length - 1 && (
                      <Separator
                        orientation="vertical"
                        className="h-6 text-center ml-4 my-2 bg-black/30"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-green-700">
        Be consistent and patient, your time will come.!
      </CardFooter>
    </Card>
  );
}
