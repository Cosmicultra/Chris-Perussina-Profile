import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  ChartLine,
  createLucideIcon,
  ExternalLink,
  FileText,
  Globe,
  Link2,
  Mail,
  Mic,
  MonitorPlay,
  Newspaper,
  Phone,
  Podcast,
  Users,
  Video,
} from "lucide-react";
import type { LinkIcon } from "@/lib/profile";

const ChartStepUp = createLucideIcon("chart-step-up", [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "axes" }],
  ["path", { d: "M7 17h4v-4h4v-4h4", key: "steps" }],
]);

const iconMap: Record<LinkIcon, LucideIcon> = {
  globe: Globe,
  "file-text": FileText,
  calendar: Calendar,
  mail: Mail,
  phone: Phone,
  briefcase: Briefcase,
  "book-open": BookOpen,
  newspaper: Newspaper,
  mic: Mic,
  "monitor-play": MonitorPlay,
  video: Video,
  podcast: Podcast,
  "chart-line": ChartLine,
  "chart-step-up": ChartStepUp,
  building: Building2,
  users: Users,
  link: Link2,
  "external-link": ExternalLink,
};

export function getLinkIcon(icon: LinkIcon): LucideIcon {
  return iconMap[icon];
}
