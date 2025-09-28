/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { motion } from "framer-motion";
import {  FiSearch } from "react-icons/fi";
import { toast } from "sonner";
import { useGetMyWalletQuery } from "@/features/wallet/wallet.api";
import { useGetMyTransactionsQuery } from "@/features/transaction/transaction.api";

import { Input } from "@/components/ui/input";

export default function WalletOverview() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const limit = 5;

    // Wallet balance query
    const { data: walletData, error: walletError } = useGetMyWalletQuery({});
    if (walletError) toast.error("Failed to load wallet data");
    const balance = walletData?.data?.balance || 0;

    // Transactions query
    const { data: transactionsData, error: transactionsError } = useGetMyTransactionsQuery({ page, limit, search });
    if (transactionsError) toast.error("Failed to load transactions");
    const transactions = transactionsData?.data || [];
    const totalPages = transactionsData?.totalPages || 1;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <motion.h1
                className="text-3xl font-bold mb-6 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Wallet Overview
            </motion.h1>

            {/* Wallet Balance Card */}
            <motion.div
                className="bg-white shadow-lg rounded-2xl p-6 mb-6 flex flex-col md:flex-row justify-between items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div>
                    <p className="text-gray-500">Current Balance</p>
                    <h2 className="text-3xl font-bold text-gray-800">${balance.toFixed(2)}</h2>
                </div>

               
            </motion.div>

            {/* Search Bar */}
            <div className="flex mb-4">
                <Input
                    placeholder="Search transactions..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="flex-1 rounded-l-xl shadow-md"
                />
                <button
                    className="rounded-r-xl shadow-md bg-indigo-600 hover:bg-indigo-700 text-white px-4"
                    onClick={() => setPage(1)}
                >
                    <FiSearch size={20} />
                </button>
            </div>

            {/* Transactions Table */}
            <motion.div
                className="overflow-x-auto bg-white rounded-2xl shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <h3 className="text-xl font-semibold text-gray-800 px-6 py-4 border-b">
                    Recent Transactions
                </h3>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">From</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">To</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-6 text-gray-500">
                                    No recent transactions
                                </td>
                            </tr>
                        ) : (
                            transactions.map((tx: any) => (
                                <motion.tr
                                    key={tx._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="hover:bg-gray-50 cursor-pointer"
                                >
                                    <td className="px-6 py-4 text-sm text-gray-700">{tx._id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{tx.from}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{tx.to}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">${tx.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{tx.status}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{new Date(tx.createdAt).toLocaleString()}</td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </motion.div>

            {/* Pagination Info */}
            <div className="flex justify-center items-center mt-6 text-gray-700">
                Page {page} of {totalPages}
            </div>
        </div>
    );
}
