"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buttonVariants } from "./ui/button";
import { Badge } from "./ui/badge";

import { BankCard } from "./icons";
import { useQuery, useQueryClient } from "react-query";
import { getPayments } from "@/app/(dashboard)/settings/billing/actions";
import moment from "moment";

export default function PaymentHistory() {
  const queryClient = useQueryClient();
  const { data: payments, isLoading } = useQuery(
    "payments",
    async () => await getPayments(),
  );

  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      });
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "invoice.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section
      id="account-settings"
      className="flex w-full max-w-[1216px] flex-col gap-8"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold leading-7 text-neutral-900">
          Payment History
        </h3>
        <p className="text-sm font-normal leading-5 text-neutral-500">
          Please reach out to our friendly team via team@codepulse.com if you
          have questions.
        </p>
      </div>

      {payments?.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-full max-w-[320px] flex-col items-center gap-2 p-6 text-center">
            <span className="mt-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow">
              <BankCard />
            </span>
            <h3 className="text-xl font-medium leading-7 text-neutral-900">
              No payment history available
            </h3>
            <p className="text-base font-normal leading-6 text-neutral-900">
              Once you start making transactions, your payment details will
              appear here.
            </p>
          </div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Plan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments?.map(
              (
                {
                  amount,
                  downloadLink,
                  invoiceStart,
                  planType,
                  status,
                }: {
                  amount: number;
                  downloadLink: string;
                  invoiceStart: Date;
                  planType: string;
                  status: string;
                },
                idx: number,
              ) => (
                <TableRow key={idx}>
                  <TableCell className="text-sm font-medium text-neutral-900">
                    {moment(invoiceStart).format("D MMM, YYYY")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className="capitalize"
                      variant={status === "paid" ? "success" : "warning"}
                    >
                      {status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-normal leading-5 text-neutral-600">
                    ${amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-sm font-normal capitalize leading-5 text-neutral-600">
                    {planType}
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() => handleDownload(downloadLink)}
                      className={buttonVariants({
                        variant: "linkColor",
                        size: "medium",
                      })}
                    >
                      Download
                    </button>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      )}
    </section>
  );
}
