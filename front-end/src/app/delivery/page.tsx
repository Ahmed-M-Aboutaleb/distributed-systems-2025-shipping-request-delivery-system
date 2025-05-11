"use client";

import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function page() {
  const { currentUser, accessToken } = useAppContext();
  const [shipments, setShipments] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (currentUser._id === "-1") {
      router.push("/");
      return;
    }
    const apiBase = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${apiBase}/api/v1/delivery-persons/available-shipment-requests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setShipments(data);
          toast.success("Shipments fetched successfully");
        });
      } else {
        toast.error("Error fetching shipments");
        console.log("Error fetching shipments");
      }
    });
  }, [currentUser]);

  function handleAcceptShipment(shipmentId) {
    const apiBase = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${apiBase}/api/v1/delivery-persons/accept-shipment/${shipmentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          toast.success("Shipment accepted successfully");
          console.log("Shipment accepted", data);
        });
      } else {
        toast.error("Error accepting shipment");
        console.log("Error accepting shipment");
      }
    });
  }
  return (
    <main className="flex justify-center items-center flex-col">
      <div className="flex flex-col items-center justify-center w-full p-6">
        <h1 className="text-2xl font-bold">Delivery Person Dashboard</h1>
        <p className="text-lg">Welcome to the Delivery Person Dashboard</p>
        <p className="text-lg py-2">
          <Link href="/delivery/my" className="cursor-pointer">
            <Button variant="secondary">My Shipments</Button>
          </Link>
        </p>
      </div>
      <div className="container mx-auto p-6">
        <Table>
          <TableCaption>
            A list of recent available shipping requests.
          </TableCaption>
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
              <TableHead>fragile? </TableHead>
              <TableHead className="text-right">Accept? </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments.map((shipment) => (
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
                <TableCell>
                  {shipment.packageDetails.fragile == true ? "yes" : "no"}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    className="cursor-pointer"
                    variant="secondary"
                    onClick={() => handleAcceptShipment(shipment._id)}
                  >
                    Accept
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

export default page;
