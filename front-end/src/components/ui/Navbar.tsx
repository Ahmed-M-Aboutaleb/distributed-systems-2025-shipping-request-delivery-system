"use client";

import { ChevronDown, ShoppingBag, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { useEffect, useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppContext } from "@/context/AppContext";
import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";
import Image from "next/image";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { toast } from "sonner";

function Login() {
  const [open, setOpen] = useState(false);
  const { setCurrentUser, setAccessToken } = useAppContext();
  const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(["merchant", "delivery_person"], {
      errorMap: () => ({ message: "Please select a user type" }),
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "merchant",
    },
  });

  function onLogin(values: z.infer<typeof formSchema>) {
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL;
      fetch(`${apiBase}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((response) => {
        if (!response.ok) {
          response.json().then((data) => console.log(data));
          toast.error("Login failed");
          throw new Error("Network response was not ok");
        }
        response.json().then((data) => {
          if (data.token != null) {
            const user = data.user;
            const accessToken = data.token;

            localStorage.setItem("accessToken", accessToken);
            setCurrentUser(user);
            setAccessToken(accessToken);
            setOpen(false);
            form.reset();
            toast.success("Login successful");
          } else {
          }
        });
      });
    } catch (error) {
      toast.error("Login failed");
      console.error("Error logging in:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <User size={20} className="cursor-pointer hover:text-neutral-600" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Login to your account to access your profile.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onLogin)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your email address to login
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your password to login
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>User Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="merchant" />
                        </FormControl>
                        <FormLabel className="font-normal">Merchant</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="delivery_person" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Delivary Person
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex !justify-center">
              <Button type="submit" className="cursor-pointer">
                Login
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function Navbar() {
  const [dashboardLink, setDashboardLink] = useState("/");
  const { currentUser } = useAppContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const avatar = createAvatar(initials, {
    seed: currentUser.name,
  });

  const svg = avatar.toString();

  useEffect(() => {
    if (currentUser._id === "-1") {
      setDashboardLink("/");
    } else {
      setIsLoggedIn(true);
      if ("companyName" in currentUser) {
        setDashboardLink("/merchant/");
      } else if ("vehicleType" in currentUser) {
        setDashboardLink("/delivery/");
      }
    }
  }, [currentUser._id]);
  return (
    <header className="flex items-center justify-between bg-amber-300 px-6 py-4">
      <div className="text-2xl font-bold">Shipping ;)</div>

      {/* Navigation */}
      <div className="flex items-center space-x-6">
        <Link href="/" className="hover:text-neutral-600">
          Home
        </Link>
        <Link href={dashboardLink} className="hover:text-neutral-600">
          Dashboard
        </Link>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <Image
            src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <Login />
        )}
      </div>
    </header>
  );
}

export default Navbar;
