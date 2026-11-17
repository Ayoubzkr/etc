"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { site } from "@/content/site";
import { contactSchema, type ContactValues } from "@/lib/contact-schema";
import { buttonClass } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = { state: "idle" | "success" } | { state: "error"; message: string };

const fieldClass =
  "peer block w-full border-0 border-b border-navy/25 bg-transparent px-0 py-3 text-base text-navy placeholder:text-steel/80 transition-colors focus:border-red focus:outline-none aria-[invalid=true]:border-red";

function Label({ htmlFor, children, optional }: { htmlFor: string; children: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-medium tracking-[0.12em] text-mute uppercase">
      {children}
      {optional ? (
        <span className="ml-2 tracking-normal text-steel normal-case">(facultatif)</span>
      ) : (
        <span aria-hidden className="ml-1 text-red">*</span>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-red-dark">
      <CircleAlert aria-hidden className="size-3.5 shrink-0" />
      {message}
    </p>
  );
}

export function ContactForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: "", company: "", email: "", phone: "", subject: "", message: "", consent: false, website: "" },
  });

  const onSubmit = async (values: ContactValues) => {
    setStatus({ state: "idle" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        reset();
        setStatus({ state: "success" });
        return;
      }
      const data = (await res.json().catch(() => null)) as { message?: string } | null;
      setStatus({
        state: "error",
        message: data?.message ?? "Une erreur est survenue lors de l'envoi de votre message.",
      });
    } catch {
      setStatus({ state: "error", message: "Connexion impossible. Vérifiez votre réseau puis réessayez." });
    }
  };

  const field = (name: keyof ContactValues) => ({
    id: `${id}-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
    ...register(name),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Formulaire de contact">
      <p className="mb-8 text-sm text-mute">
        Les champs marqués d&apos;un <span className="text-red">*</span> sont obligatoires.
      </p>
      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${id}-name`}>Nom</Label>
          <input type="text" autoComplete="name" className={fieldClass} {...field("name")} />
          <FieldError id={`${id}-name-error`} message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor={`${id}-company`}>Société</Label>
          <input type="text" autoComplete="organization" className={fieldClass} {...field("company")} />
          <FieldError id={`${id}-company-error`} message={errors.company?.message} />
        </div>
        <div>
          <Label htmlFor={`${id}-email`}>E-mail professionnel</Label>
          <input type="email" autoComplete="email" inputMode="email" className={fieldClass} {...field("email")} />
          <FieldError id={`${id}-email-error`} message={errors.email?.message} />
        </div>
        <div>
          <Label htmlFor={`${id}-phone`} optional>
            Téléphone
          </Label>
          <input type="tel" autoComplete="tel" inputMode="tel" className={fieldClass} {...field("phone")} />
          <FieldError id={`${id}-phone-error`} message={errors.phone?.message} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor={`${id}-subject`}>Objet</Label>
          <input type="text" className={fieldClass} placeholder="Ex. : demande de prix, référence recherchée, réparation…" {...field("subject")} />
          <FieldError id={`${id}-subject-error`} message={errors.subject?.message} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor={`${id}-message`}>Message</Label>
          <textarea rows={5} className={cn(fieldClass, "min-h-36 resize-y")} placeholder="Marque, référence, quantité, délai souhaité…" {...field("message")} />
          <FieldError id={`${id}-message-error`} message={errors.message?.message} />
        </div>

        {/* Honeypot — hidden from people, attractive to bots */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${id}-website`}>Site web</label>
          <input type="text" tabIndex={-1} autoComplete="off" id={`${id}-website`} {...register("website")} />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3.5">
            <input
              type="checkbox"
              className="mt-0.5 size-5 shrink-0 cursor-pointer appearance-none border border-navy/40 bg-white bg-center bg-no-repeat transition-colors checked:border-red checked:bg-red checked:bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%222.2%22%3E%3Cpath%20d%3D%22M3.5%208.5l3%203%206-7%22/%3E%3C/svg%3E')] aria-[invalid=true]:border-red"
              {...field("consent")}
            />
            <label htmlFor={`${id}-consent`} className="cursor-pointer text-sm leading-relaxed text-ink/80">
              J&apos;accepte que les informations saisies soient utilisées par ETC SAT MAROC uniquement pour traiter ma
              demande et me recontacter. <span aria-hidden className="text-red">*</span>
            </label>
          </div>
          <FieldError id={`${id}-consent-error`} message={errors.consent?.message} />
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
        <button type="submit" disabled={isSubmitting} className={buttonClass("primary", "min-w-56 disabled:cursor-wait disabled:opacity-70")}>
          {isSubmitting ? (
            <>
              Envoi en cours… <LoaderCircle aria-hidden className="size-4 animate-spin" />
            </>
          ) : (
            <>
              Envoyer le message <Send aria-hidden className="size-4" />
            </>
          )}
        </button>
      </div>

      <div aria-live="polite" className="mt-6">
        <AnimatePresence mode="wait">
          {status.state === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3 border-l-2 border-emerald-600 bg-emerald-50 px-5 py-4 text-emerald-900"
            >
              <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0" />
              <p className="text-[0.9375rem]">
                <strong className="font-semibold">Message envoyé.</strong> Merci, notre équipe vous répondra dans les
                meilleurs délais.
              </p>
            </motion.div>
          )}
          {status.state === "error" && (
            <motion.div
              key="error"
              role="alert"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3 border-l-2 border-red bg-red/5 px-5 py-4 text-navy"
            >
              <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-red" />
              <p className="text-[0.9375rem]">
                <strong className="font-semibold">Envoi impossible.</strong> {status.message} Vous pouvez aussi nous
                écrire directement à{" "}
                <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-4">
                  {site.email}
                </a>
                .
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
