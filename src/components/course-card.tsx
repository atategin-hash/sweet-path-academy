import { Link } from "@tanstack/react-router";
import { Clock, BookOpen, BarChart3 } from "lucide-react";
import type { Course } from "@/lib/courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      to="/course/$id"
      params={{ id: course.slug }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-warm)]"
    >
      <div className="aspect-[5/4] overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          loading="lazy"
          width={800}
          height={640}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary">
          <span>{course.level}</span>
          <span className="h-1 w-1 rounded-full bg-primary/50" />
          <span className="text-muted-foreground">{course.instructor.name}</span>
        </div>
        <h3 className="mt-3 font-serif text-2xl leading-tight text-foreground">
          {course.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{course.tagline}</p>
        <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{course.duration}</span>
          <span className="inline-flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" />{course.lessons} lessons</span>
          <span className="inline-flex items-center gap-1.5"><BarChart3 className="h-3.5 w-3.5" />{course.level}</span>
        </div>
        <div className="mt-6 flex items-end justify-between border-t border-border/60 pt-4">
          <span className="font-serif text-2xl text-foreground">${course.price}</span>
          <span className="text-sm font-medium text-primary group-hover:underline">View course →</span>
        </div>
      </div>
    </Link>
  );
}
