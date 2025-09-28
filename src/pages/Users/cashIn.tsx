import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetMyTransactionsQuery } from "@/features/transaction/transaction.api";

export default function CashInHistory() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const limit = 10;

    // Fetch all transactions
    const { data: transactionsData, error } = useGetMyTransactionsQuery({ page, limit, search });
    if (error) toast.error("Failed to load transactions");

    // Filter cash-in transactions only
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transactions = transactionsData?.data?.filter((tx: any) => tx.type === "CASH_IN") || [];
    const totalPages = transactionsData?.totalPages || 1;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <motion.h1
                className="text-3xl font-bold mb-4 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Cash In History
            </motion.h1>

            {/* Fancy Note */}
            <motion.div
                className="bg-indigo-50 border-l-4 border-indigo-400 text-indigo-800 px-6 py-4 rounded-lg mb-6 shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                💡 <strong>Note:</strong> Cash-in transactions can only be performed through your agent store. You can view the history here, but to add funds, please contact your agent.
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
                <Button className="rounded-r-xl shadow-md bg-indigo-600 hover:bg-indigo-700">
                    <FiSearch size={20} />
                </Button>
            </div>

            {/* Transactions Table */}
            <motion.div
                className="overflow-x-auto bg-white rounded-2xl shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">From</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-gray-500">
                                    No cash-in transactions found
                                </td>
                            </tr>
                        ) : (
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                                    <td className="px-6 py-4 text-sm text-gray-700">${tx.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{tx.status}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{new Date(tx.createdAt).toLocaleString()}</td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </motion.div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 text-gray-700">
                Page {page} of {totalPages}
            </div>
        </div>
    );
}
