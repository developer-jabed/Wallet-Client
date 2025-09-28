/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetMyTransactionsQuery } from "@/features/transaction/transaction.api";

export default function AgentDashboard() {
  const { data: transactionsData, isLoading } = useGetMyTransactionsQuery({});

  // Transactions array
  const transactions = transactionsData?.data || [];

  // Sort newest first safely (RTK Query returns read-only array)
  const sortedTransactions = useMemo(
    () => [...transactions].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [transactions]
  );

  // Calculate cash-in / cash-out summary
  const summary = useMemo(() => {
    let cashIn = 0;
    let cashOut = 0;

    transactions.forEach((t: any) => {
      if (t.type === "CASH_IN") cashIn += t.amount;
      if (t.type === "CASH_OUT") cashOut += t.amount;
    });

    return { cashIn, cashOut };
  }, [transactions]);

  if (isLoading) return <div className="p-4">Loading dashboard...</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Agent Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="bg-green-50">
          <CardHeader>
            <CardTitle>Cash In</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-green-700">${summary.cashIn}</span>
          </CardContent>
        </Card>
        <Card className="bg-red-50">
          <CardHeader>
            <CardTitle>Cash Out</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-red-700">${summary.cashOut}</span>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Recent Transactions</h2>
        <div className="space-y-2">
          {sortedTransactions.length === 0 && <p>No transactions yet.</p>}
          {sortedTransactions.map((t: any) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex justify-between items-center p-3 bg-white shadow rounded"
            >
              <div>
                <p className="font-medium">{t.type}</p>
                <p className="text-sm text-gray-500">{new Date(t.createdAt).toLocaleString()}</p>
              </div>
              <div className={`font-bold ${t.type === "CASH_IN" ? "text-green-600" : "text-red-600"}`}>
                ${t.amount}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
