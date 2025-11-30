/**
 * Utility functions for score grading and competency evaluation
 */

export interface GradeInfo {
  grade: string;
  label: string;
  color: string;
}

/**
 * Get letter grade based on score (0-100)
 */
export function getGrade(score: number): string {
  if (score >= 85) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B+";
  if (score >= 65) return "B";
  if (score >= 50) return "C";
  return "F";
}

/**
 * Get Vietnamese label for grade
 */
export function getGradeLabel(score: number): string {
  if (score >= 85) return "Xuất sắc";
  if (score >= 80) return "Giỏi";
  if (score >= 65) return "Khá";
  if (score >= 50) return "Trung bình";
  return "Yếu";
}

/**
 * Get color hex code for score visualization
 */
export function getGradeColor(score: number): string {
  if (score >= 80) return "#22c55e"; // green
  if (score >= 65) return "#eab308"; // yellow
  if (score >= 50) return "#f97316"; // orange
  return "#ef4444"; // red
}

/**
 * Get comprehensive grade information
 */
export function getGradeInfo(score: number): GradeInfo {
  return {
    grade: getGrade(score),
    label: getGradeLabel(score),
    color: getGradeColor(score),
  };
}

/**
 * Calculate average score from array of scores
 */
export function calculateAverageScore(scores: number[]): number {
  if (!scores.length) return 0;
  const sum = scores.reduce((a, b) => a + b, 0);
  return sum / scores.length;
}

/**
 * Calculate overall score (0-10 scale) from array of scores (0-100 scale)
 */
export function calculateOverallScore(scores: number[]): string {
  if (!scores.length) return "0.0";
  const average = calculateAverageScore(scores);
  return (average / 10).toFixed(1);
}
