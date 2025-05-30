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
<<<<<<< HEAD
=======
<<<<<<< HEAD
    const apiBase = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${apiBase}/api/v1/delivery-persons/my-shipment-requests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
=======
>>>>>>> Feat/Front
    fetch(
      "http://localhost:3000/api/v1/delivery-persons/my-shipment-requests",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => {
<<<<<<< HEAD
=======
>>>>>>> 6e7cb247cdc391d7bea679ceaf73f367e1ed6fa6
>>>>>>> Feat/Front
      if (res.status === 200) {
        res.json().then((data) => {
          setShipments(data);
          toast.success("Shipments fetched successfully");
        });
      } else {
        console.log("Error fetching shipments");
        toast.error("Error fetching shipments");
      }
    });
  }, [currentUser]);

  function handleAcceptShipment(shipmentId) {
<<<<<<< HEAD
    fetch(
      `http://localhost:3000/api/v1/delivery-persons/shipment-requests/${shipmentId}`,
=======
<<<<<<< HEAD
    const apiBase = process.env.NEXT_PUBLIC_API_URL;
    fetch(
      `${apiBase}/api/v1/delivery-persons/shipment-requests/${shipmentId}`,
=======
    fetch(
      `http://localhost:3000/api/v1/delivery-persons/shipment-requests/${shipmentId}`,
>>>>>>> 6e7cb247cdc391d7bea679ceaf73f367e1ed6fa6
>>>>>>> Feat/Front
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          status: "DELIVERED",
        }),
      }
    ).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log("Shipment accepted", data);
          toast.success("Shipment delivered successfully");
        });
      } else {
        console.log("Error accepting shipment");
        toast.error("Error delivering shipment");
      }
    });
  }
  return (
    <main className="flex justify-center items-center flex-col">
      <div className="flex flex-col items-center justify-center w-full p-6">
        <h1 className="text-2xl font-bold">Delivery Person Dashboard</h1>
        <p className="text-lg">Welcome to the Delivery Person Dashboard</p>
        <p className="text-lg py-2"></p>
      </div>
      <div className="container mx-auto p-6">
        <Table>
          <TableCaption>A list of your shipping requests.</TableCaption>
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
              <TableHead className="text-right">Delivered? </TableHead>
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
                    Delived
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
