import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";

const legalContent = {
  terms: {
    title: "Terms of Service",
    content: `1. Acceptance: By accessing Maison Crumb, you agree to these terms.\n2. Intellectual Property: All course materials and recipes are owned by Maison Crumb Ltd.\n3. Usage: Personal use only. Sharing account access is strictly prohibited.\n4. Modifications: We reserve the right to update these terms at any time.`
  },
  privacy: {
    title: "Privacy Policy",
    content: `1. Data Protection: We process your data according to GDPR and UK standards.\n2. Payments: Handled securely by Stripe. No card data is stored on our servers.\n3. Cookies: We use essential cookies to provide our services.\n4. Communication: We only use your email for course updates and support.`
  },
  refund: {
    title: "Refund Policy",
    content: `1. Digital Goods: Due to instant access, digital courses are generally non-refundable once started.\n2. Technical Issues: If you experience access problems, we will resolve them promptly.\n3. Contact: For refund inquiries, contact support@maison-crumb.com.`
  }
};

export type LegalType = keyof typeof legalContent;

export function LegalLink({ type }: { type: LegalType }) {
  const doc = legalContent[type];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <FileText className="h-3.5 w-3.5" />
          {doc.title}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{doc.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-3 text-sm text-muted-foreground whitespace-pre-line">
            {doc.content}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
