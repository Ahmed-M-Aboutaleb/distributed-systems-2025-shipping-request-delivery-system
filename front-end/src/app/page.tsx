"use client";

import { useAppContext } from "@/context/AppContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { VehicleType } from "@/types/main";
import { toast } from "sonner";

function RegisterD() {
  const [open, setOpen] = useState(false);
  const { currentUser, setCurrentUser, setAccessToken } = useAppContext();
  const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    name: z.string().min(1, "Name is required"),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 digits long")
      .max(15, "Phone number must be at most 15 digits long"),
    vehicleType: z.nativeEnum(VehicleType, {
      errorMap: () => ({ message: "Please select a vehicle type" }),
    }),
    vehicleLicensePlate: z.string().min(1, "License plate is required"),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
      vehicleType: VehicleType.CAR,
      vehicleLicensePlate: "",
    },
  });

  function onLogin(values: z.infer<typeof formSchema>) {
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL;
      fetch(`${apiBase}/api/v1/auth/register-delivery-person`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((response) => {
        response.json().then((data) => {
          console.log(data);
          if (data.token != null) {
            const user = data.user;
            const accessToken = data.token;

            localStorage.setItem("accessToken", accessToken);
            setCurrentUser(user);
            setAccessToken(accessToken);
            setOpen(false);
            form.reset();
            toast.success("Register successful");
          } else {
          }
        });
      });
    } catch (error) {
      toast.error("Register failed");
      console.error("Error logging in:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer hover:text-neutral-600">
          Register as Delivary Person
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Register as Delivary Person</DialogTitle>
          <DialogDescription>
            Register to become a delivary person and start accepting orders.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onLogin)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription>Enter your name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    Enter your email address to register
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
                    Enter your password to register
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Phone" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your phone number to register
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicleLicensePlate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle License Plate</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Vehicle License Plate"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your vehicle license plate
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicleType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>User Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={VehicleType.BICYCLE} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {VehicleType.BICYCLE}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={VehicleType.CAR} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {VehicleType.CAR}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={VehicleType.MOTORCYCLE} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {VehicleType.MOTORCYCLE}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={VehicleType.TRUCK} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {VehicleType.TRUCK}
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
                Register
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function RegisterMerchant() {
  const [open, setOpen] = useState(false);
  const { currentUser, setCurrentUser, setAccessToken } = useAppContext();
  const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    name: z.string().min(1, "Name is required"),
    companyName: z.string().min(1, "Company name is required"),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 digits long")
      .max(15, "Phone number must be at most 15 digits long"),
    businessAddress: z.object({
      street: z.string().min(1, "Street address is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      zipCode: z.string().min(1, "Zip code is required"),
      country: z.string().min(1, "Country is required"),
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      companyName: "",
      phoneNumber: "",
      businessAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    },
  });

  function onLogin(values: z.infer<typeof formSchema>) {
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL;
      fetch(`${apiBase}/api/v1/auth/register-merchent`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((response) => {
        response.json().then((data) => {
          if (data.token != null) {
            const user = data.user;
            const accessToken = data.token;

            localStorage.setItem("accessToken", accessToken);
            setCurrentUser(user);
            setAccessToken(accessToken);
            setOpen(false);
            form.reset();
            toast.success("Register successful");
          } else {
          }
        });
      });
    } catch (error) {
      toast.error("Register failed");
      console.error("Error logging in:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer hover:text-neutral-600">
          Register as Merchant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Register to become a merchant and start sending orders.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onLogin)}
            className="space-y-8 grid grid-cols-2 gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription>Enter your name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Company Name" {...field} />
                  </FormControl>
                  <FormDescription>Enter your company name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    Enter your email address to register
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
                    Enter your password to register
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Phone" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your phone number to register
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessAddress.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Street" {...field} />
                  </FormControl>
                  <FormDescription>Enter your street address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessAddress.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="City" {...field} />
                  </FormControl>
                  <FormDescription>Enter your city</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessAddress.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="State" {...field} />
                  </FormControl>
                  <FormDescription>Enter your state</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessAddress.zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Zip Code" {...field} />
                  </FormControl>
                  <FormDescription>Enter your zip code</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessAddress.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Country" {...field} />
                  </FormControl>
                  <FormDescription>Enter your country</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex !justify-center col-span-full">
              <Button type="submit" className="cursor-pointer">
                Register
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1 className="text-4xl font-bold">
        Welcome to the Shipping Request App!
      </h1>
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Register as:</h2>
        <div className="flex space-x-4">
          <RegisterD />
          <RegisterMerchant />
        </div>
      </div>
    </main>
  );
}
