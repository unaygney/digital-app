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

export default function PaymentHistory() {
  const queryClient = useQueryClient();
  const { data: payments, isLoading } = useQuery(
    "payments",
    async () => await getPayments(),
  );

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
              ({ invoice_url, status, amount, plan, created_at }, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-sm font-medium text-neutral-900">
                    {created_at}
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
                    {plan}
                  </TableCell>
                  <TableCell className="text-right">
                    <a
                      href={invoice_url}
                      download
                      className={buttonVariants({
                        variant: "linkColor",
                        size: "medium",
                      })}
                      target="_blank"
                    >
                      Download
                    </a>
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
