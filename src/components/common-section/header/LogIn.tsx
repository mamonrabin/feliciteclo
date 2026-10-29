"use client";

import { useState, type FormEvent } from "react";
import { ShieldCheck, X, LoaderCircle, UserRound } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type LogInProps = {
  scrolled: boolean;
};

const LogIn = ({ scrolled }: LogInProps) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implement Supabase authentication here.
      // Example:
      // const { error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // });
      //
      // if (error) throw error;
      // setOpen(false);
      // Keep the dialog open until authentication is implemented.
    } catch (error) {
      console.error("Authentication failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Account Trigger */}
      <DialogTrigger
        className={`group flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-60 ${
          scrolled ? "text-primary" : "text-white/80"
        }`}
      >
        <UserRound
          size={20}
          strokeWidth={1.7}
          className="transition-transform group-hover:scale-110"
        />

        <span className="hidden text-[10px] font-black tracking-[0.2em] uppercase lg:block">
          Account
        </span>
      </DialogTrigger>

      {/* Login Dialog */}
      <DialogContent
        showCloseButton={false}
        className="z-[600] w-[calc(100%-32px)] max-w-md gap-0 rounded-none border border-black/10 bg-white p-8 text-black shadow-2xl sm:max-w-md md:p-10"
      >
        {/* Accessibility */}
        <DialogTitle className="sr-only">Admin Console Access</DialogTitle>

        <DialogDescription className="sr-only">
          Authenticate using your Supabase credentials to access the admin
          console.
        </DialogDescription>

        {/* Close Icon */}
        <DialogClose
          aria-label="Close login dialog"
          className="absolute top-5 right-5 z-10 flex h-8 w-8 cursor-pointer items-center justify-center text-gray-400 transition-colors hover:bg-gray-100 hover:text-black"
        >
          <X size={20} strokeWidth={1.5} />
        </DialogClose>

        {/* Header */}
        <div className="mb-8 pr-6">
          <div className="mb-2 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-black" />

            <span className="font-mono text-[9px] tracking-[0.25em] text-gray-400 uppercase">
              Security Protocol
            </span>
          </div>

          <h3 className="text-xl font-black tracking-tight text-black uppercase">
            User Console Access
          </h3>

          <p className="mt-1 text-[11px] tracking-wider text-gray-500 uppercase">
            Authenticate using your password or credentials
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="admin-email"
              className="mb-2 block font-mono text-[9px] tracking-widest text-gray-500 uppercase"
            >
              Email Address
            </label>

            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@titasweb.com"
              className="w-full border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-xs text-black transition-colors placeholder:text-gray-400 focus:border-black focus:bg-white focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="admin-password"
              className="mb-2 block font-mono text-[9px] tracking-widest text-gray-500 uppercase"
            >
              Password
            </label>

            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-xs text-black transition-colors placeholder:text-gray-400 focus:border-black focus:bg-white focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 bg-black py-4 text-[10px] font-black tracking-[0.25em] text-white uppercase transition-colors hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}

            <span>{loading ? "Authenticating..." : "Authenticate"}</span>
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LogIn;
