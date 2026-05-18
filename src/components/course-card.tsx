import { Link } from "@tanstack/react-router";
import { Clock, BookOpen, Star } from "lucide-react";
import { type Course, totalLessons } from "@/lib/courses";
import { useI18n } from "@/lib/i18n";

export function CourseCard({ course }: { course: Course }) {
  const { t, tx } = useI18n();
  return (
    <Link
      to="/course/$id"
      params={{ id: course.id }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-warm)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={course.image}
          alt={tx(course.title)}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover detail overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-foreground/95 to-foreground/70 p-4 text-background opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="line-clamp-2 text-xs leading-relaxed text-background/90">{tx(course.tagline)}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-background/80">
            <span className="inline-flex items-center gap-1"><BookOpen className="h-3 w-3" />{totalLessons(course)} {t("common.lessons")}</span>
            <span className="inline-flex items-center gap-1">
              <Star className="h-3 w-3 fill-background text-background" />
              {course.rating} ({course.reviews})
            </span>
            <span className="ml-auto font-serif text-base text-background">${course.price}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="font-serif text-lg leading-tight text-foreground line-clamp-1">
          {tx(course.title)}
        </h3>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-primary">
            {t(`difficulty.${course.difficulty}`)}
          </span>
        </div>
      </div>
    </Link>
  );
}
