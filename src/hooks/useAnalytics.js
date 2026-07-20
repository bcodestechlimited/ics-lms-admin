import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "../services/analytics.service";

export const useGetCoursesCreatedOverTime = () =>
  useQuery({
    queryKey: ["analytics", "coursesCreatedOverTime"],
    queryFn: () => analyticsService.getCoursesCreatedOverTime(),
  });

export const useGetCoursesByCategory = () =>
  useQuery({
    queryKey: ["analytics", "coursesByCategory"],
    queryFn: () => analyticsService.getCoursesByCategory(),
  });

export const useGetSkillLevelDistribution = () =>
  useQuery({
    queryKey: ["analytics", "skillLevelDistribution"],
    queryFn: () => analyticsService.getSkillLevelDistribution(),
  });

export const useGetEnrollmentCounts = () =>
  useQuery({
    queryKey: ["analytics", "enrollmentCounts"],
    queryFn: () => analyticsService.getEnrollmentCounts(),
  });

export const useGetTopEnrolledCourses = () =>
  useQuery({
    queryKey: ["analytics", "topEnrolledCourses"],
    queryFn: () => analyticsService.getTopEnrolledCourses(),
  });

export const useGetUserGrowth = () =>
  useQuery({
    queryKey: ["analytics", "userGrowth"],
    queryFn: () => analyticsService.getUserGrowthOverTime(),
  });

export const useGetUserEngagement = () =>
  useQuery({
    queryKey: ["analytics", "userEngagement"],
    queryFn: () => analyticsService.getUserEngagementMetrics(),
  });

export const useGetUserEnrollmentStats = () =>
  useQuery({
    queryKey: ["analytics", "userEnrollmentStats"],
    queryFn: () => analyticsService.getUserEnrollmentStats(),
  });

export const useGetGlobalOutcomes = () =>
  useQuery({
    queryKey: ["analytics", "learningOutcomes"],
    queryFn: () => analyticsService.getGlobalLearningOutcomes(),
  });
