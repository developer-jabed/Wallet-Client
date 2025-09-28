import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { toast } from "sonner";
import { useAgentTransactionQuery } from "@/features/agent/agent.api";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";


type Transaction = {
  _id: string;
  fromUserId?: { _id: string; name: string; email: string };
  toUserId?: { _id: string; name: string; email: string };
  amount: number;
  type: string;
  status: string;
  createdAt: string;
};

export default function AgentTransaction() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  const { data, error, isLoading, isFetching } = useAgentTransactionQuery({
    page,
    limit,
    search,
  });

  const transactions: Transaction[] = data?.data || [];
  const totalPages = data?.totalPages || 1;

  // Safe error handling
  useEffect(() => {
    if (error) {
      const err = error as FetchBaseQueryError;
      if ("status" in err) {
        toast.error("Failed to fetch transactions");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }, [error]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center md:text-left">
          Agent Transactions
        </h2>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Input
            placeholder="Search by user or transaction ID"
            value={search}
            onChange={handleSearchChange}
            className="flex-1 rounded-xl shadow-md"
          />
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md w-full sm:w-auto"
            disabled={isFetching}
          >
            <FiSearch size={20} />
          </Button>
        </div>

        {/* Transactions */}
        {isLoading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-6 text-gray-500 bg-white rounded-xl shadow">
            No transactions found
          </div>
        ) : (
          <>
            {/* Desktop / Tablet Table */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">From</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">To</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <AnimatePresence>
                    {transactions.map((tx) => (
                      <motion.tr
                        key={tx._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-gray-50 cursor-pointer"
                      >
                        <td className="px-6 py-4 text-sm text-gray-700">{tx._id}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {tx.fromUserId?.name} <br />
                          <span className="text-xs text-gray-500">{tx.fromUserId?.email}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {tx.toUserId?.name} <br />
                          <span className="text-xs text-gray-500">{tx.toUserId?.email}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">${tx.amount.toFixed(2)}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{tx.type}</td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${tx.status === "COMPLETED"
                              ? "bg-green-100 text-green-700"
                              : tx.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                              }`}
                          >
                            {tx.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {new Date(tx.createdAt).toLocaleString()}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden grid gap-4">
              <AnimatePresence>
                {transactions.map((tx) => (
                  <motion.div
                    key={tx._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
                  >
                    <p className="text-sm text-gray-500">ID: {tx._id}</p>
                    <p className="font-semibold text-gray-800 mt-1">
                      From: {tx.fromUserId?.name}
                    </p>
                    <p className="text-sm text-gray-600">{tx.fromUserId?.email}</p>
                    <p className="font-semibold text-gray-800 mt-2">
                      To: {tx.toUserId?.name}
                    </p>
                    <p className="text-sm text-gray-600">{tx.toUserId?.email}</p>
                    <p className="mt-2 text-gray-700">
                      <span className="font-bold">Amount:</span> ${tx.amount.toFixed(2)}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-bold">Type:</span> {tx.type}
                    </p>
                    <p
                      className={`font-bold ${tx.status === "COMPLETED"
                        ? "text-green-600"
                        : tx.status === "PENDING"
                          ? "text-yellow-600"
                          : "text-red-600"
                        }`}
                    >
                      Status: {tx.status}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(tx.createdAt).toLocaleString()}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-3">
          <Button
            className="bg-gray-300 hover:bg-gray-400 w-full md:w-auto"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <span className="text-gray-700">
            Page {page} of {totalPages}
          </span>
          <Button
            className="bg-gray-300 hover:bg-gray-400 w-full md:w-auto"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
