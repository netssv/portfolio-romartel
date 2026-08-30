"use client";

import React from "react";
import {
  ExternalLink,
  ShieldCheck,
  ArrowDown,
  Mail,
  FileText,
  Send,
  Edit3,
  XCircle,
} from "lucide-react";

const GithubIcon = ({ size = 12 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2.25"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ActionLinkButtonProps {
  href: string;
  label: string;
}

export function ActionLinkButton({ href, label }: ActionLinkButtonProps) {
  const url = href.trim();
  const isHash = url.startsWith("#");
  const isAction = url.startsWith("action:");
  const isGithub = url.includes("github.com");
  const isCredentials =
    url.includes("credentials") ||
    url.includes("credential") ||
    label.toLowerCase().includes("credential");
  const isMail =
    url.startsWith("mailto:") ||
    label.toLowerCase().includes("email") ||
    label.toLowerCase().includes("contact");
  const isCaseStudy =
    label.toLowerCase().includes("case study") ||
    label.toLowerCase().includes("audit") ||
    label.toLowerCase().includes("story");

  const isConfirmAction = isAction && (url.includes("send") || label.toLowerCase().includes("correcto") || label.toLowerCase().includes("enviar"));
  const isEditAction = isAction && (url.includes("edit") || label.toLowerCase().includes("corregir"));
  const isCancelAction = isAction && (url.includes("cancel") || label.toLowerCase().includes("aún no") || label.toLowerCase().includes("cancelar"));

  const handleClick = (e: React.MouseEvent) => {
    if (isHash) {
      e.preventDefault();
      const targetId = url.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    } else if (isAction) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("clippo:action", { detail: { action: url, label } }));
    }
  };

  let icon = <ExternalLink className="w-3 h-3 shrink-0" />;
  let badgeStyle = "bg-accent/10 text-accent border-accent/30 hover:bg-accent/20";

  if (isConfirmAction) {
    icon = <Send className="w-3 h-3 shrink-0 text-emerald-400" />;
    badgeStyle = "bg-emerald-950/50 text-emerald-300 border-emerald-700/60 hover:bg-emerald-900/60 font-semibold";
  } else if (isEditAction) {
    icon = <Edit3 className="w-3 h-3 shrink-0 text-amber-400" />;
    badgeStyle = "bg-amber-950/50 text-amber-300 border-amber-700/60 hover:bg-amber-900/60";
  } else if (isCancelAction) {
    icon = <XCircle className="w-3 h-3 shrink-0 text-rose-400" />;
    badgeStyle = "bg-rose-950/40 text-rose-300 border-rose-800/50 hover:bg-rose-900/50";
  } else if (isGithub) {
    icon = <GithubIcon size={12} />;
    badgeStyle = "bg-neutral-800 text-neutral-100 border-neutral-700 hover:bg-neutral-700";
  } else if (isCredentials) {
    icon = <ShieldCheck className="w-3 h-3 shrink-0 text-emerald-400" />;
    badgeStyle = "bg-emerald-950/40 text-emerald-300 border-emerald-800/50 hover:bg-emerald-900/50";
  } else if (isHash) {
    icon = <ArrowDown className="w-3 h-3 shrink-0 text-sky-400" />;
    badgeStyle = "bg-sky-950/40 text-sky-300 border-sky-800/50 hover:bg-sky-900/50";
  } else if (isMail) {
    icon = <Mail className="w-3 h-3 shrink-0 text-amber-400" />;
    badgeStyle = "bg-amber-950/40 text-amber-300 border-amber-800/50 hover:bg-amber-900/50";
  } else if (isCaseStudy) {
    icon = <FileText className="w-3 h-3 shrink-0 text-indigo-400" />;
    badgeStyle = "bg-indigo-950/40 text-indigo-300 border-indigo-800/50 hover:bg-indigo-900/50";
  }

  return (
    <a
      href={href}
      target={isHash || isAction ? undefined : "_blank"}
      rel={isHash || isAction ? undefined : "noopener noreferrer"}
      onClick={handleClick}
      role={isAction ? "button" : undefined}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 my-0.5 rounded-md text-[11px] font-medium border transition-all duration-150 active:scale-95 shadow-sm cursor-pointer ${badgeStyle}`}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
