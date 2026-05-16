import { Link } from "@tanstack/react-router";
import { Clock, BookOpen, Star, Flame, Home, Store, Factory } from "lucide-react";
import { type Course, totalLessons, TIER_META } from "@/lib/courses";

const TIER_ICON = {
  home: Home,
  business: Store,
  industrial: Factory,
} as const;

export function CourseCard({ course }: { course: Course }) {
  const TierIcon = TIER_ICON[course.tier];
  return (
    <Link
      to="/course/$id"
      params={{ id: course.id }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-warm)]"
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          loading="lazy"
          width={800}
          height={640}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-background/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground shadow-sm backdrop-blur">
            <TierIcon className="h-3 w-3 text-primary" />
            {TIER_META[course.tier].short}
          </span>
          {course.trending && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground shadow-sm">
              <Flame className="h-3 w-3" /> Trending
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary">
          <span>{course.difficulty}</span>
          <span className="h-1 w-1 rounded-full bg-primary/50" />
          <span className="text-muted-foreground">{course.instructor.name}</span>
        </div>
        <h3 className="mt-3 font-serif text-2xl leading-tight text-foreground">
          {course.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{course.tagline}</p>
        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{course.duration}</span>
          <span className="inline-flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" />{totalLessons(course)} lessons</span>
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span className="font-medium text-foreground">{course.rating}</span>
            <span>({course.reviews})</span>
          </span>
        </div>
        <div className="mt-6 flex items-end justify-between border-t border-border/60 pt-4">
          <span className="font-serif text-2xl text-foreground">${course.price}</span>
          <span className="text-sm font-medium text-primary group-hover:underline">View course →</span>
        </div>
      </div>
    </Link>
  );
}
