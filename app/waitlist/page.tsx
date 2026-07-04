"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid work email"),
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  knowledgeChallenge: z.string().optional(),
});

type FormData = z.infer<typeof schema>;
type SignupType = "engineer" | "company";

const signupOptions: { value: SignupType; label: string }[] = [
  {
    value: "engineer",
    label: "An engineer who wants to bring this to my team",
  },
  {
    value: "company",
    label: "A company or engineering team looking to use this",
  },
];

const inputClass =
  "w-full bg-transparent border-0 border-b border-border rounded-none px-0 py-1.5 text-base text-foreground placeholder:text-faint focus:outline-none focus:border-foreground transition-colors";

function FieldLabel({
  htmlFor,
  children,
  required,
  optional,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="eyebrow block text-foreground/85">
      {children}
      {required && <span className="text-destructive ml-1">*</span>}
      {optional && (
        <span className="lowercase tracking-normal ml-1.5 text-faint">
          (optional)
        </span>
      )}
    </label>
  );
}

export default function WaitlistPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [signupType, setSignupType] = useState<SignupType | null>(null);
  const [signupTypeError, setSignupTypeError] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    if (!signupType) {
      setSignupTypeError(true);
      return;
    }
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, signupType }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const json = await res.json();
        setErrorMessage(json.error || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <main className="min-h-dvh md:h-dvh md:overflow-hidden flex flex-col">
      {/* Top bar */}
      <header className="shrink-0 w-full max-w-[720px] mx-auto flex items-center justify-between pt-8 pb-2 px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <img src="/corvislogo.png" alt="Corvis" className="h-9 w-auto" />
      </header>

      <div
        className={`flex-1 min-h-0 w-full max-w-[720px] mx-auto px-6 pt-6 pb-8 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {status === "success" ? (
          <div className="text-center pt-20">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-border mb-6">
              <Check className="w-6 h-6" />
            </div>
            <h1 className="text-[2.5rem] font-semibold tracking-[-0.02em] mb-3">
              You&apos;re on the list.
            </h1>
            <p className="text-lg text-muted-foreground">
              We&apos;ll be in touch soon.
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-semibold tracking-[-0.02em] leading-[1.1] mb-2">
              Join the waitlist
            </h1>
            <p className="text-base text-muted-foreground leading-[1.6] mb-6">
              Tell us a bit about you. We&apos;ll reach out as early access
              opens up.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-1.5">
                <FieldLabel htmlFor="name" required>
                  Name
                </FieldLabel>
                <input
                  id="name"
                  placeholder="Jane Doe"
                  className={inputClass}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <FieldLabel htmlFor="email" required>
                  Work email
                </FieldLabel>
                <input
                  id="email"
                  type="email"
                  placeholder="jane@company.com"
                  className={inputClass}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <FieldLabel htmlFor="company" required>
                  Company
                </FieldLabel>
                <input
                  id="company"
                  placeholder="Acme Inc."
                  className={inputClass}
                  {...register("company")}
                />
                {errors.company && (
                  <p className="text-sm text-destructive">
                    {errors.company.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <FieldLabel htmlFor="role" required>
                  Your role
                </FieldLabel>
                <input
                  id="role"
                  placeholder="Head of Engineering"
                  className={inputClass}
                  {...register("role")}
                />
                {errors.role && (
                  <p className="text-sm text-destructive">
                    {errors.role.message}
                  </p>
                )}
              </div>

              <div className="space-y-2.5">
                <FieldLabel required>I&apos;m signing up as</FieldLabel>
                <div className="flex flex-col sm:flex-row gap-3">
                  {signupOptions.map((option) => {
                    const selected = signupType === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setSignupType(option.value);
                          setSignupTypeError(false);
                        }}
                        className={`flex-1 text-left px-4 py-3 border rounded-[2px] text-[15px] leading-snug transition-colors ${
                          selected
                            ? "border-foreground bg-foreground text-background"
                            : "border-border bg-transparent text-foreground hover:border-foreground/50"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
                {signupTypeError && (
                  <p className="text-sm text-destructive">
                    Select how you&apos;re signing up
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <FieldLabel htmlFor="knowledgeChallenge" optional>
                  What happens to engineering knowledge when someone leaves
                  your team?
                </FieldLabel>
                <textarea
                  id="knowledgeChallenge"
                  rows={2}
                  placeholder="Tell us about your experience..."
                  className={`${inputClass} resize-none`}
                  {...register("knowledgeChallenge")}
                />
              </div>

              {errorMessage && (
                <p className="text-sm text-destructive">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-shine group w-full h-12 bg-primary text-primary-foreground text-base font-medium rounded-[2px] inline-flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none"
              >
                {status === "submitting" ? (
                  "Submitting..."
                ) : (
                  <>
                    Send request
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
