import { useMemo, useRef, useState } from "react";
import jsPDF from "jspdf";
import { Award, CheckCircle2, ChefHat, Download, Loader2, Upload, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type Status = "idle" | "reviewing" | "approved";

export function CertificateSection({
  courseTitle,
  unlocked,
  totalLessons,
  completedCount,
}: {
  courseTitle: string;
  unlocked: boolean; // all lessons completed
  totalLessons: number;
  completedCount: number;
}) {
  const { tx } = useI18n();
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const fileRef = useRef<HTMLInputElement>(null);

  const certId = useMemo(
    () =>
      `MC-${new Date().getFullYear()}-${Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase()}`,
    []
  );

  const completionDate = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    []
  );

  const localizedTitle = tx(courseTitle);

  const canSubmit =
    unlocked && photo && name.trim().length > 1 && status === "idle";

  const onFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const submit = () => {
    if (!canSubmit) return;
    setStatus("reviewing");
    setTimeout(() => setStatus("approved"), 2800);
  };

  const downloadPDF = () => {
    const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
    const w = doc.internal.pageSize.getWidth();
    const h = doc.internal.pageSize.getHeight();

    // Background
    doc.setFillColor(252, 248, 241);
    doc.rect(0, 0, w, h, "F");

    // Outer border
    doc.setDrawColor(180, 130, 70);
    doc.setLineWidth(3);
    doc.rect(24, 24, w - 48, h - 48);
    doc.setLineWidth(0.6);
    doc.rect(34, 34, w - 68, h - 68);

    // Top brand
    doc.setTextColor(60, 40, 25);
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.text("MAISONCRUMB", w / 2, 80, { align: "center" });
    doc.setFont("times", "italic");
    doc.setFontSize(10);
    doc.text("Pastry Academy · Est. 2024", w / 2, 96, { align: "center" });

    // Decorative line
    doc.setDrawColor(180, 130, 70);
    doc.setLineWidth(0.8);
    doc.line(w / 2 - 60, 108, w / 2 + 60, 108);

    // Title
    doc.setFont("times", "bold");
    doc.setFontSize(36);
    doc.setTextColor(40, 25, 15);
    doc.text("Certificate of Completion", w / 2, 170, { align: "center" });

    doc.setFont("times", "italic");
    doc.setFontSize(13);
    doc.setTextColor(110, 80, 50);
    doc.text("This certificate is proudly presented to", w / 2, 210, {
      align: "center",
    });

    // Recipient name
    doc.setFont("times", "bold");
    doc.setFontSize(40);
    doc.setTextColor(140, 80, 30);
    doc.text(name.trim(), w / 2, 270, { align: "center" });

    // Underline name
    const nameWidth = doc.getTextWidth(name.trim());
    doc.setDrawColor(180, 130, 70);
    doc.setLineWidth(0.5);
    doc.line(w / 2 - nameWidth / 2 - 10, 280, w / 2 + nameWidth / 2 + 10, 280);

    // Course line
    doc.setFont("times", "normal");
    doc.setFontSize(13);
    doc.setTextColor(80, 60, 40);
    doc.text("for the successful completion of the masterclass", w / 2, 312, {
      align: "center",
    });

    doc.setFont("times", "bolditalic");
    doc.setFontSize(20);
    doc.setTextColor(40, 25, 15);
    doc.text(`"${localizedTitle}"`, w / 2, 348, { align: "center" });

    // Body
    doc.setFont("times", "normal");
    doc.setFontSize(11);
    doc.setTextColor(90, 70, 50);
    const body =
      "Having demonstrated craft, precision, and creative excellence in the pastry arts,";
    doc.text(body, w / 2, 380, { align: "center" });
    doc.text(
      "this student is hereby recognized by the MaisonCrumb Pastry Academy.",
      w / 2,
      396,
      { align: "center" }
    );

    // Signature
    doc.setFont("times", "italic");
    doc.setFontSize(22);
    doc.setTextColor(60, 40, 25);
    doc.text("Chef Amélie Laurent", w * 0.72, h - 110, { align: "center" });
    doc.setDrawColor(120, 90, 60);
    doc.setLineWidth(0.5);
    doc.line(w * 0.72 - 90, h - 100, w * 0.72 + 90, h - 100);
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.setTextColor(110, 80, 50);
    doc.text("Head Chef & Founder", w * 0.72, h - 84, { align: "center" });

    // Date + ID block (left)
    doc.setFont("times", "bold");
    doc.setFontSize(11);
    doc.setTextColor(60, 40, 25);
    doc.text(completionDate, w * 0.28, h - 110, { align: "center" });
    doc.line(w * 0.28 - 90, h - 100, w * 0.28 + 90, h - 100);
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.setTextColor(110, 80, 50);
    doc.text("Date of Completion", w * 0.28, h - 84, { align: "center" });

    // Certificate ID
    doc.setFont("courier", "normal");
    doc.setFontSize(9);
    doc.setTextColor(140, 100, 60);
    doc.text(`Certificate ID: ${certId}`, w / 2, h - 50, { align: "center" });
    doc.setFontSize(8);
    doc.setTextColor(160, 130, 100);
    doc.text(
      "Verify authenticity at maisoncrumb.academy/verify",
      w / 2,
      h - 38,
      { align: "center" }
    );

    // Seal (circle)
    doc.setDrawColor(180, 130, 70);
    doc.setLineWidth(1.5);
    doc.circle(w / 2, h - 130, 28);
    doc.setLineWidth(0.4);
    doc.circle(w / 2, h - 130, 22);
    doc.setFont("times", "bold");
    doc.setFontSize(9);
    doc.setTextColor(140, 90, 40);
    doc.text("MC", w / 2, h - 132, { align: "center" });
    doc.setFontSize(6);
    doc.text("CERTIFIED", w / 2, h - 122, { align: "center" });

    doc.save(`MaisonCrumb-Certificate-${certId}.pdf`);
  };

  return (
    <section className="mt-12 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-[oklch(0.18_0.02_60)] via-[oklch(0.16_0.01_60)] to-[oklch(0.2_0.04_50)] p-8 shadow-[0_30px_80px_-30px_oklch(0.7_0.15_50/0.4)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 text-primary ring-1 ring-primary/30">
            <Award className="h-7 w-7" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary">
              Certificate of Completion
            </p>
            <h2 className="mt-1 font-serif text-3xl text-white">
              Show Your Masterpiece
            </h2>
            <p className="mt-1 max-w-xl text-sm text-white/60">
              Upload a photo of what you baked. Our Head Chef will personally
              review your creation before issuing your official certificate.
            </p>
          </div>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
          {completedCount}/{totalLessons} lessons complete
        </div>
      </div>

      {!unlocked ? (
        <div className="mt-8 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center">
          <ChefHat className="mx-auto h-10 w-10 text-white/30" />
          <p className="mt-3 text-sm text-white/60">
            Finish all {totalLessons} lessons to unlock your certificate submission.
          </p>
        </div>
      ) : status === "approved" ? (
        <ApprovedView
          name={name.trim()}
          courseTitle={localizedTitle}
          certId={certId}
          completionDate={completionDate}
          photo={photo!}
          onDownload={downloadPDF}
        />
      ) : status === "reviewing" ? (
        <ReviewingView />
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Upload */}
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-white/50">
              Your bake
            </label>
            <div
              className="relative mt-2 flex aspect-[4/3] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] transition-colors hover:border-primary/40 hover:bg-primary/[0.04]"
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                onFile(e.dataTransfer.files?.[0]);
              }}
            >
              {photo ? (
                <>
                  <img
                    src={photo}
                    alt="Your bake"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPhoto(null);
                    }}
                    className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <div className="px-6 text-center">
                  <Upload className="mx-auto h-9 w-9 text-white/40" />
                  <p className="mt-3 text-sm font-medium text-white/80">
                    Click or drag a photo here
                  </p>
                  <p className="mt-1 text-xs text-white/40">
                    JPG or PNG · up to 10MB
                  </p>
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onFile(e.target.files?.[0])}
              />
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-white/50">
                Name on certificate
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Olivia Reynolds"
                maxLength={60}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none"
              />
            </div>

            <div className="flex-1">
              <label className="text-xs font-medium uppercase tracking-wider text-white/50">
                Add a note / tip from your experience
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={5}
                maxLength={500}
                placeholder="What surprised you? Any tip a future baker should know?"
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none"
              />
              <p className="mt-1 text-right text-[10px] text-white/40">
                {note.length}/500
              </p>
            </div>

            <button
              type="button"
              onClick={submit}
              disabled={!canSubmit}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_oklch(0.7_0.15_50/0.7)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40 disabled:shadow-none"
            >
              <Award className="h-4 w-4" />
              Submit for Certificate
            </button>
            {!photo && (
              <p className="text-center text-[11px] text-white/40">
                A photo is required for chef review.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function ReviewingView() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] py-10 text-center">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 ring-1 ring-primary/40">
          <ChefHat className="h-10 w-10 text-primary" />
        </div>
      </div>
      <div className="mt-6 inline-flex items-center gap-2 text-base font-medium text-white">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        Chef is reviewing your creation...
      </div>
      <p className="mt-2 max-w-sm text-sm text-white/50">
        Checking technique, presentation, and that signature MaisonCrumb finish.
      </p>
    </div>
  );
}

function ApprovedView({
  name,
  courseTitle,
  certId,
  completionDate,
  photo,
  onDownload,
}: {
  name: string;
  courseTitle: string;
  certId: string;
  completionDate: string;
  photo: string;
  onDownload: () => void;
}) {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
      <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
        <img src={photo} alt="Approved bake" className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col justify-between gap-6 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
            <CheckCircle2 className="h-3.5 w-3.5" /> Approved
          </div>
          <h3 className="mt-3 font-serif text-2xl text-white">
            Approved! Your talent is official.
          </h3>
          <p className="mt-1 text-sm text-white/60">
            Congratulations, {name}. Your work on{" "}
            <span className="italic text-white/80">"{courseTitle}"</span> has
            been certified by the MaisonCrumb Pastry Academy.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <p className="uppercase tracking-wider text-white/40">Certificate ID</p>
              <p className="mt-1 font-mono text-white">{certId}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <p className="uppercase tracking-wider text-white/40">Date</p>
              <p className="mt-1 text-white">{completionDate}</p>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onDownload}
          className="inline-flex h-12 items-center justify-center gap-2 self-start rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_oklch(0.7_0.15_50/0.7)] transition-transform hover:-translate-y-0.5"
        >
          <Download className="h-4 w-4" />
          Download Certificate (PDF)
        </button>
      </div>
    </div>
  );
}
