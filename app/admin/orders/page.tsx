"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Truck } from "lucide-react"

// Dummy order data
const dummyOrders = [
  {
    id: "ORD-001",
    customerName: "Alice Smith",
    orderDate: "2024-07-15",
    deliveryDate: "2024-07-20", // Added delivery date
    total: 450.0,
    status: "Processing",
  },
  {
    id: "ORD-002",
    customerName: "Bob Johnson",
    orderDate: "2024-07-14",
    deliveryDate: "2024-07-18", // Added delivery date
    total: 1200.5,
    status: "Shipped",
  },
  {
    id: "ORD-003",
    customerName: "Charlie Brown",
    orderDate: "2024-07-13",
    deliveryDate: "2024-07-15", // Added delivery date
    total: 75.99,
    status: "Delivered",
  },
  {
    id: "ORD-004",
    customerName: "Diana Prince",
    orderDate: "2024-07-12",
    deliveryDate: "2024-07-19", // Added delivery date
    total: 210.0,
    status: "Pending",
  },
  {
    id: "ORD-005",
    customerName: "Eve Adams",
    orderDate: "2024-07-11",
    deliveryDate: "2024-07-16", // Added delivery date
    total: 999.0,
    status: "Processing",
  },
]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(dummyOrders)

  const handleViewDetails = (orderId: string) => {
    console.log(`View details for order: ${orderId}`)
    alert(`Viewing details for order ID: ${orderId}`)
  }

  const handleUpdateStatus = (orderId: string, currentStatus: string) => {
    console.log(`Update status for order: ${orderId}, current status: ${currentStatus}`)
    alert(`Updating status for order ID: ${orderId}`)
    // In a real app, this would open a modal or form to change the status
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 border border-green-200"
      case "Shipped":
        return "bg-blue-100 text-blue-800 border border-blue-200"
      case "Processing":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200"
      case "Pending":
        return "bg-gray-100 text-gray-800 border border-gray-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-12">
      <Card className="w-full max-w-6xl shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-2xl font-bold tracking-wide">Order Management</CardTitle>
            <CardDescription>View and process customer orders.</CardDescription>
          </div>
          {/* Add a button for "New Orders" or "Filter Orders" if needed */}
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>{order.deliveryDate}</TableCell>
                    <TableCell className="text-right font-semibold">${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="flex justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(order.id)}
                        className="hover:bg-gray-100"
                      >
                        <Eye className="h-4 w-4 text-gray-600" />
                        <span className="sr-only">View Details</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUpdateStatus(order.id, order.status)}
                        className="hover:bg-gray-100"
                      >
                        <Truck className="h-4 w-4 text-gray-600" />
                        <span className="sr-only">Update Status</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {orders.length === 0 && <p className="text-center text-gray-500 mt-8">No orders found.</p>}
        </CardContent>
      </Card>
    </div>
  )
}
