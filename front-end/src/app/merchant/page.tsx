"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { IShipmentRequestResponse } from "@/types/main";

function NewShipment() {
  const [open, setOpen] = useState(false);
  const { accessToken, setCurrentUser, setAccessToken } = useAppContext();
  const formSchema = z.object({
    pickupStreet: z.string().min(1, "Pickup street is required"),
    pickupCity: z.string().min(1, "Pickup city is required"),
    pickupState: z.string().min(1, "Pickup state is required"),
    pickupZipCode: z.string().min(1, "Pickup zip code is required"),
    pickupCountry: z.string().min(1, "Pickup country is required"),
    dropoffStreet: z.string().min(1, "Dropoff street is required"),
    dropoffCity: z.string().min(1, "Dropoff city is required"),
    dropoffState: z.string().min(1, "Dropoff state is required"),
    dropoffZipCode: z.string().min(1, "Dropoff zip code is required"),
    dropoffCountry: z.string().min(1, "Dropoff country is required"),
    pickupTime: z.string().min(1, "Pickup time is required"),
    dropoffTime: z.string().min(1, "Dropoff time is required"),
    packageWeight: z
      .number()
      .min(1, "Package weight is required")
      .max(1000, "Package weight must be less than 1000 kg"),
    packageWidth: z
      .number()
      .min(1, "Package width is required")
      .max(1000, "Package width must be less than 1000 cm"),
    packageLength: z
      .number()
      .min(1, "Package length is required")
      .max(1000, "Package length must be less than 1000 cm"),
    packageHeight: z
      .number()
      .min(1, "Package height is required")
      .max(1000, "Package height must be less than 1000 cm"),
    fragile: z.boolean(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupStreet: "",
      pickupCity: "",
      pickupState: "",
      pickupZipCode: "",
      pickupCountry: "",
      dropoffStreet: "",
      dropoffCity: "",
      dropoffState: "",
      dropoffZipCode: "",
      dropoffCountry: "",
      pickupTime: "",
      dropoffTime: "",
      packageWeight: 0,
      packageWidth: 0,
      packageLength: 0,
      packageHeight: 0,
      fragile: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const bodyData = {
        pickupLocation: {
          street: values.pickupStreet,
          city: values.pickupCity,
          state: values.pickupState,
          zipCode: values.pickupZipCode,
          country: values.pickupCountry,
        },
        dropoffLocation: {
          street: values.dropoffStreet,
          city: values.dropoffCity,
          state: values.dropoffState,
          zipCode: values.dropoffZipCode,
          country: values.dropoffCountry,
        },
        pickupTime: new Date(values.pickupTime).toISOString(),
        dropoffTime: new Date(values.dropoffTime).toISOString(),
        packageDetails: {
          weight: values.packageWeight,
          dimensions: {
            width: values.packageWidth,
            length: values.packageLength,
            height: values.packageHeight,
          },
          fragile: values.fragile,
        },
      };
      const apiBase = process.env.NEXT_PUBLIC_API_URL;
      fetch(`${apiBase}/api/v1/merchants/new-shipment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bodyData),
      }).then((response) => {
        response.json().then((data) => {
          console.log("Shipment created successfully", data);
          setOpen(false);
          form.reset();
          toast.success("Shipment created successfully");
        });
      });
    } catch (error) {
      toast.error("Error creating shipment");
      console.error("Error logging in:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full">
          New Shipment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1500px]">
        <DialogHeader>
          <DialogTitle>New Shipment</DialogTitle>
          <DialogDescription>
            Enter Shipment details to create a new shipment request
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 grid grid-cols-4 gap-4"
          >
            <FormField
              control={form.control}
              name="pickupStreet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Street</FormLabel>
                  <FormControl>
                    <Input placeholder="Pickup Street" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the pickup street address
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pickupCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup City</FormLabel>
                  <FormControl>
                    <Input placeholder="Pickup City" {...field} />
                  </FormControl>
                  <FormDescription>Enter the pickup city</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pickupState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup State</FormLabel>
                  <FormControl>
                    <Input placeholder="Pickup State" {...field} />
                  </FormControl>
                  <FormDescription>Enter the pickup state</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pickupZipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Pickup Zip Code" {...field} />
                  </FormControl>
                  <FormDescription>Enter the pickup zip code</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pickupCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Pickup Country" {...field} />
                  </FormControl>
                  <FormDescription>Enter the pickup country</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dropoffStreet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dropoff Street</FormLabel>
                  <FormControl>
                    <Input placeholder="Dropoff Street" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the dropoff street address
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dropoffCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dropoff City</FormLabel>
                  <FormControl>
                    <Input placeholder="Dropoff City" {...field} />
                  </FormControl>
                  <FormDescription>Enter the dropoff city</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dropoffState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dropoff State</FormLabel>
                  <FormControl>
                    <Input placeholder="Dropoff State" {...field} />
                  </FormControl>
                  <FormDescription>Enter the dropoff state</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dropoffZipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dropoff Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Dropoff Zip Code" {...field} />
                  </FormControl>
                  <FormDescription>Enter the dropoff zip code</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dropoffCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dropoff Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Dropoff Country" {...field} />
                  </FormControl>
                  <FormDescription>Enter the dropoff country</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pickupTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormDescription>Enter the pickup time</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dropoffTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dropoff Time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormDescription>Enter the dropoff time</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="packageWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package Weight (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      {...form.register("packageWeight", {
                        valueAsNumber: true,
                      })}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the package weight in kg
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="packageWidth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package Width (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      {...form.register("packageWidth", {
                        valueAsNumber: true,
                      })}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the package width in cm
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="packageLength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package Length (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      {...form.register("packageLength", {
                        valueAsNumber: true,
                      })}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the package length in cm
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="packageHeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package Height (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      {...form.register("packageHeight", {
                        valueAsNumber: true,
                      })}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the package height in cm
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fragile"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Fragile</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(val) => field.onChange(val === "true")}
                      defaultValue={field.value ? "true" : "false"}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex !justify-center col-span-full">
              <Button type="submit" className="cursor-pointer min-w-[200px]">
                New Shipment
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function Merchant() {
  const { currentUser, accessToken } = useAppContext();
  const [shipments, setShipments] = useState<IShipmentRequestResponse[]>([]);
  const router = useRouter();
  useEffect(() => {
    if (currentUser._id === "-1") {
      router.push("/");
      return;
    }
    const apiBase = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${apiBase}/api/v1/merchants/shipment-requests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setShipments(data);
        });
      } else {
        toast.error("Error fetching shipments");
        console.log("Error fetching shipments");
      }
    });
  }, [currentUser]);
  return (
    <main className="flex justify-center items-center flex-col">
      <div className="flex flex-col items-center justify-center w-full p-6">
        <h1 className="text-2xl font-bold">Merchant Dashboard</h1>
        <p className="text-lg">Welcome to the Merchant Dashboard</p>
        <p className="text-lg py-2">
          <NewShipment />
        </p>
      </div>
      <div className="container mx-auto p-6">
        <Table>
          <TableCaption>A list of your recent shipping requests.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Pickup street</TableHead>
              <TableHead>Pickup city</TableHead>
              <TableHead>Pickup state</TableHead>
              <TableHead>Pickup zip code</TableHead>
              <TableHead>Pickup country</TableHead>
              <TableHead>dropoff street</TableHead>
              <TableHead>dropoff city</TableHead>
              <TableHead>dropoff state</TableHead>
              <TableHead>dropoff zip code</TableHead>
              <TableHead>dropoff country</TableHead>
              <TableHead>Pickup date</TableHead>
              <TableHead>dropoff date</TableHead>
              <TableHead>status</TableHead>
              <TableHead>weight</TableHead>
              <TableHead>width</TableHead>
              <TableHead>length</TableHead>
              <TableHead>height</TableHead>
              <TableHead className="text-right">fragile? </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments.map((shipment: IShipmentRequestResponse) => (
              <TableRow key={shipment._id}>
                <TableCell>{shipment.pickupLocation.street}</TableCell>
                <TableCell>{shipment.pickupLocation.city}</TableCell>
                <TableCell>{shipment.pickupLocation.state}</TableCell>
                <TableCell>{shipment.pickupLocation.zipCode}</TableCell>
                <TableCell>{shipment.pickupLocation.country}</TableCell>
                <TableCell>{shipment.dropoffLocation.street}</TableCell>
                <TableCell>{shipment.dropoffLocation.city}</TableCell>
                <TableCell>{shipment.dropoffLocation.state}</TableCell>
                <TableCell>{shipment.dropoffLocation.zipCode}</TableCell>
                <TableCell>{shipment.dropoffLocation.country}</TableCell>
                <TableCell>
                  {new Date(shipment.pickupTime).getFullYear()} -{" "}
                  {new Date(shipment.pickupTime).getMonth()} -{" "}
                  {new Date(shipment.pickupTime).getDay()}
                </TableCell>
                <TableCell>
                  {new Date(shipment.dropoffTime).getFullYear()} -{" "}
                  {new Date(shipment.dropoffTime).getMonth()} -{" "}
                  {new Date(shipment.dropoffTime).getDay()}
                </TableCell>
                <TableCell>{shipment.status}</TableCell>
                <TableCell>{shipment.packageDetails.weight}</TableCell>
                <TableCell>
                  {shipment.packageDetails.dimensions.width}
                </TableCell>
                <TableCell>
                  {shipment.packageDetails.dimensions.length}
                </TableCell>
                <TableCell>
                  {shipment.packageDetails.dimensions.height}
                </TableCell>
                <TableCell className="text-right">
                  {shipment.packageDetails.fragile == true ? "yes" : "no"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
