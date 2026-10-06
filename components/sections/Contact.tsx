"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Clock,
  Copy,
  Globe,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { budgetOptions, packageSelectOptions } from "@/data/packages";
import { site } from "@/data/site";
import { SELECT_PACKAGE_EVENT, type SelectPackageDetail } from "@/lib/events";
import { contactDefaultValues, contactSchema, type ContactInput } from "@/lib/validation";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Button } from "@/components/ui/Button";
import { Container, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type SubmitState = "idle" | "sending" | "success" | "error" | "fallback";

/* -------------------------------------------------------------------------- */
/* Contact detail cards                                                       */
/* -------------------------------------------------------------------------- */

interface DetailCard {
  key: string;
  label: string;
  value: string;
  display: string;
  href: string;
  icon: typeof Phone;
  external?: boolean;
}

const details: DetailCard[] = [
  {
    key: "phone",
    label: "Phone",
    value: "+919805029089",
    display: site.phoneDisplay,
    href: site.phoneHref,
    icon: Phone,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    value: "+91 98050 29089",
    display: "Chat on WhatsApp",
    href: site.whatsapp,
    icon: MessageCircle,
    external: true,
  },
  {
    key: "email",
    label: "Email",
    value: site.email,
    display: site.email,
    href: site.emailHref,
    icon: Mail,
  },
];

function DetailCardItem({ detail }: { detail: DetailCard }) {
  const { state, copy } = useCopyToClipboard();
  const Icon = detail.icon;

  return (
    <div className="group flex items-stretch gap-2 rounded-2xl border border-line bg-white/[0.025] p-2 transition-colors duration-300 hover:border-violet/45">
      <a
        href={detail.href}
        target={detail.external ? "_blank" : undefined}
        rel={detail.external ? "noopener noreferrer" : undefined}
        className="flex min-w-0 flex-1 items-center gap-4 px-3 py-3.5"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line-2 bg-white/[0.03] text-violet-soft transition-all duration-300 group-hover:border-violet/50 group-hover:bg-violet/15">
          <Icon className="size-4" aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block font-mono text-[0.64rem] tracking-[0.2em] text-mist-4 uppercase">
            {detail.label}
          </span>
          <span className="mt-1 block truncate text-[0.95rem] font-medium text-mist transition-colors group-hover:text-cyan">
            {detail.display}
          </span>
        </span>
      </a>

      <button
        type="button"
        onClick={() => copy(detail.value)}
        aria-label={`Copy ${detail.label}: ${detail.value}`}
        className="grid w-11 shrink-0 place-items-center rounded-xl text-mist-4 transition-all hover:bg-white/[0.05] hover:text-mist"
      >
        {state === "copied" ? (
          <Check className="size-4 text-emerald" aria-hidden />
        ) : (
          <Copy className="size-4" aria-hidden />
        )}
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Form                                                                       */
/* -------------------------------------------------------------------------- */

const fieldBase =
  "w-full rounded-xl border border-line bg-void/60 px-4 py-3 text-[0.95rem] text-mist placeholder:text-mist-4 transition-all duration-300 focus:border-violet/70 focus:bg-void focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-[0.78rem] text-rose">
      <AlertTriangle className="size-3.5 shrink-0" aria-hidden />
      {message}
    </p>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<SubmitState>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: contactDefaultValues,
    mode: "onTouched",
  });

  // Pricing CTAs pre-select a package.
  useEffect(() => {
    const onSelect = (event: Event) => {
      const detail = (event as CustomEvent<SelectPackageDetail>).detail;
      if (!detail?.package) return;
      setValue("package", detail.package, { shouldValidate: true, shouldDirty: true });
    };
    window.addEventListener(SELECT_PACKAGE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_PACKAGE_EVENT, onSelect);
  }, [setValue]);

  const onSubmit = handleSubmit(async (values) => {
    setStatus("sending");
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fallback?: boolean;
      };

      if (payload.ok) {
        setStatus("success");
        reset(contactDefaultValues);
        return;
      }

      if (payload.fallback) {
        // No email transport configured — hand off to WhatsApp instead.
        const text = [
          `Hi Shubham, I'd like to discuss a project.`,
          ``,
          `Name: ${values.name}`,
          `Email: ${values.email}`,
          `Phone: ${values.phone}`,
          `Package: ${values.package}`,
          `Budget: ${values.budget}`,
          ``,
          values.message,
        ].join("\n");

        const fallbackUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
        window.open(fallbackUrl, "_blank", "noopener,noreferrer");
        setStatus("fallback");
        return;
      }

      setServerError(payload.error ?? "Something went wrong. Please try WhatsApp instead.");
      setStatus("error");
    } catch {
      setServerError("Network error. Please try again or message me on WhatsApp.");
      setStatus("error");
    }
  });

  if (status === "success" || status === "fallback") {
    const isFallback = status === "fallback";
    return (
      <div
        role="status"
        className="hairline glass flex h-full flex-col items-start justify-center rounded-2xl p-8 sm:p-10"
      >
        <span
          className={cn(
            "grid size-12 place-items-center rounded-full border",
            isFallback
              ? "border-gold/50 bg-gold/12 text-gold"
              : "border-emerald/50 bg-emerald/12 text-emerald",
          )}
        >
          <Check className="size-6" aria-hidden />
        </span>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-mist">
          {isFallback ? "Continue on WhatsApp" : "Message sent."}
        </h3>
        <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-mist-3">
          {isFallback
            ? "WhatsApp opened in a new tab with your details pre-filled — hit send there and I'll reply shortly."
            : "Thanks — your enquiry is in my inbox. You'll hear back within a few hours, usually the same day."}
        </p>
        <Button
          variant="outline"
          size="md"
          className="mt-7"
          onClick={() => {
            setStatus("idle");
            setServerError(null);
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="hairline glass rounded-2xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label
            htmlFor="name"
            className="mb-2 block font-mono text-[0.66rem] tracking-[0.18em] text-mist-4 uppercase"
          >
            Name *
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            className={cn(fieldBase, errors.name && "border-rose/70")}
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="email"
            className="mb-2 block font-mono text-[0.66rem] tracking-[0.18em] text-mist-4 uppercase"
          >
            Email *
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            className={cn(fieldBase, errors.email && "border-rose/70")}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="phone"
            className="mb-2 block font-mono text-[0.66rem] tracking-[0.18em] text-mist-4 uppercase"
          >
            Phone *
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            aria-invalid={Boolean(errors.phone)}
            className={cn(fieldBase, errors.phone && "border-rose/70")}
            {...register("phone")}
          />
          <FieldError message={errors.phone?.message} />
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="package"
            className="mb-2 block font-mono text-[0.66rem] tracking-[0.18em] text-mist-4 uppercase"
          >
            Package interested in
          </label>
          <select
            id="package"
            aria-invalid={Boolean(errors.package)}
            className={cn(fieldBase, "appearance-none", errors.package && "border-rose/70")}
            {...register("package")}
          >
            {packageSelectOptions.map((option) => (
              <option key={option} value={option} className="bg-panel text-mist">
                {option}
              </option>
            ))}
          </select>
          <FieldError message={errors.package?.message} />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="budget"
            className="mb-2 block font-mono text-[0.66rem] tracking-[0.18em] text-mist-4 uppercase"
          >
            Budget
          </label>
          <select
            id="budget"
            aria-invalid={Boolean(errors.budget)}
            className={cn(fieldBase, "appearance-none", errors.budget && "border-rose/70")}
            {...register("budget")}
          >
            {budgetOptions.map((option) => (
              <option key={option} value={option} className="bg-panel text-mist">
                {option}
              </option>
            ))}
          </select>
          <FieldError message={errors.budget?.message} />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="mb-2 block font-mono text-[0.66rem] tracking-[0.18em] text-mist-4 uppercase"
          >
            Project details *
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="What are you building, and when do you need it?"
            aria-invalid={Boolean(errors.message)}
            className={cn(fieldBase, "resize-y", errors.message && "border-rose/70")}
            {...register("message")}
          />
          <FieldError message={errors.message?.message} />
        </div>

        {/* Honeypot — hidden from humans and screen readers. */}
        <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>
      </div>

      {serverError && (
        <p
          role="alert"
          className="mt-5 flex items-start gap-2 rounded-xl border border-rose/40 bg-rose/10 px-4 py-3 text-sm text-rose"
        >
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
          {serverError}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === "sending"}
          className="w-full sm:w-auto"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send className="size-4" aria-hidden />
            </>
          )}
        </Button>

        <p className="text-center font-mono text-[0.66rem] tracking-[0.14em] text-mist-4 uppercase sm:text-right">
          No spam · No lists · Just a reply
        </p>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/* Section                                                                    */
/* -------------------------------------------------------------------------- */

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 vignette" />
        <span className="absolute top-1/4 -left-32 size-[24rem] rounded-full bg-violet/20 blur-[120px] animate-drift" />
        <span className="absolute -right-24 bottom-0 size-[22rem] rounded-full bg-cyan/16 blur-[120px] animate-drift-slow" />
      </div>

      <Container>
        <SectionHeader
          index="10"
          eyebrow="// contact"
          align="center"
          title={
            <>
              Let&apos;s build something{" "}
              <span className="text-gradient-accent">worth ranking for.</span>
            </>
          }
          lead="Tell me what you're working on. You'll get a straight answer on scope, timeline and price."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          {/* ---- details ---- */}
          <Reveal className="flex flex-col gap-4">
            <div className="space-y-3">
              {details.map((detail) => (
                <DetailCardItem key={detail.key} detail={detail} />
              ))}
            </div>

            <div className="mt-2 space-y-4 rounded-2xl border border-line bg-white/[0.02] p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-emerald" aria-hidden />
                <div>
                  <p className="font-mono text-[0.64rem] tracking-[0.18em] text-mist-4 uppercase">
                    Availability
                  </p>
                  <p className="mt-1 text-[0.95rem] text-mist-2">{site.availability}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-cyan" aria-hidden />
                <div>
                  <p className="font-mono text-[0.64rem] tracking-[0.18em] text-mist-4 uppercase">
                    Location
                  </p>
                  <p className="mt-1 text-[0.95rem] text-mist-2">{site.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="mt-0.5 size-4 shrink-0 text-violet-soft" aria-hidden />
                <div>
                  <p className="font-mono text-[0.64rem] tracking-[0.18em] text-mist-4 uppercase">
                    Working hours
                  </p>
                  <p className="mt-1 text-[0.95rem] text-mist-2">Mon – Sat · 10:00 – 19:00 IST</p>
                </div>
              </div>
            </div>

            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-1 inline-flex items-center justify-between gap-3 rounded-2xl border border-emerald/35 bg-emerald/10 px-5 py-4 transition-all duration-300 hover:border-emerald/70 hover:bg-emerald/15"
            >
              <span>
                <span className="block font-mono text-[0.64rem] tracking-[0.18em] text-emerald uppercase">
                  Fastest route
                </span>
                <span className="mt-1 block text-[0.95rem] text-mist">
                  Message me directly on WhatsApp
                </span>
              </span>
              <ArrowRight
                className="size-5 shrink-0 text-emerald transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </a>
          </Reveal>

          {/* ---- form ---- */}
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
