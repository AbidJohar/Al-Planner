"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Mail,
  User,
  MessageSquare,
  Send,
  CheckCircle2,
  Github,
  Twitter,
  Linkedin,
  Phone,
  MapPin,
  Tag,
} from "lucide-react";

const inputClass =
  "bg-slate-950 border-slate-700 text-white placeholder:text-slate-400 pl-10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const socials = [
    { icon: Github, href: "https://github.com/AbidJohar" },
    { icon: Twitter, href: "https://x.com/AbidHus10671106" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/abid-johar786/" },
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email.";
    if (!form.subject.trim()) newErrors.subject = "Subject is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    else if (form.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters.";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-lg shadow-2xl border-none text-center">
          <CardContent className="py-14 space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="w-16 h-16 text-orange-400 animate-bounce" />
            </div>
            <h2 className="text-2xl font-bold text-white">Message Sent!</h2>
            <p className="text-slate-400">
              Thanks for reaching out. We'll get back to you within 24 hours.
            </p>
            <Button
              onClick={() => {
                setSubmitted(false);
                setForm({ name: "", email: "", subject: "", message: "" });
              }}
              className="mt-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-white hover:opacity-90 transition"
            >
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-5 gap-6">

        {/* Left Info Panel */}
        <div className="md:col-span-2 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white leading-tight">
              Get in{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Have a question or want to need any help? Fill out the form and
              we'll get back to you as soon as possible.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            {[
              { icon: Mail, label: "ah1502651@gmail.com" },
              { icon: Phone, label: "+923165964017" },
              { icon: MapPin, label: "Pubjab, Pakistan" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-slate-400 text-sm">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-orange-400" />
                </div>
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <p className="text-slate-500 text-xs uppercase tracking-widest">
              Follow Us
            </p>

            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-gradient-to-br hover:from-yellow-400 hover:via-orange-500 hover:to-red-600 flex items-center justify-center transition-all duration-200 group"
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <Card className="md:col-span-3 shadow-2xl border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-white">Send a Message</CardTitle>
            <p className="text-slate-400 text-sm">
              All fields are required.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">

            {/* Name + Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={inputClass}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-xs pl-1">{errors.name}</p>
                )}
              </div>
              <div className="space-y-1">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Your Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={inputClass}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs pl-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1">
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Subject"
                  value={form.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  className={inputClass}
                />
              </div>
              {errors.subject && (
                <p className="text-red-400 text-xs pl-1">{errors.subject}</p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1">
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Textarea
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className={`${inputClass} resize-none`}
                  rows={5}
                />
              </div>
              <div className="flex justify-between items-center pl-1">
                {errors.message ? (
                  <p className="text-red-400 text-xs">{errors.message}</p>
                ) : (
                  <span />
                )}
                <span className="text-slate-600 text-xs">
                  {form.message.length} chars
                </span>
              </div>
            </div>

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-white hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}