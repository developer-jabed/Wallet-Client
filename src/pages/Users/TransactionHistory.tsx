/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiXCircle } from "react-icons/fi";
import { toast } from "sonner";
import gsap from "gsap";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetMyTransactionsQuery } from "@/features/transaction/transaction.api";

export default function TransactionHistory() {
    const [page, setPage] = useState(1);
    const [typeFilter, setTypeFilter] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const limit = 10;

    const tableRef = useRef<HTMLTableElement>(null);

    const { data: transactionsData, error } = useGetMyTransactionsQuery({ page, limit });
    if (error) toast.error("Failed to load transactions");

    const transactions = transactionsData?.data || [];
    const totalPages = Math.ceil(transactions.length / limit) || 1;

    const filteredTransactions = transactions
        .filter((tx: any) =>
            (!typeFilter || tx.type === typeFilter) &&
            (!dateFrom || new Date(tx.createdAt) >= new Date(dateFrom)) &&
            (!dateTo || new Date(tx.createdAt) <= new Date(dateTo)) &&
            (!searchTerm ||
                tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tx.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tx._id.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .slice((page - 1) * limit, page * limit);

    const clearFilters = () => {
        setTypeFilter("");
        setDateFrom("");
        setDateTo("");
        setSearchTerm("");
        setPage(1);
    };

    // GSAP animation for table rows
    useEffect(() => {
        if (tableRef.current) {
            gsap.fromTo(
                tableRef.current.querySelectorAll("tbody tr"),
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: "power3.out" }
            );
        }
    }, [filteredTransactions]);

    return (
        <div className="p-4 md:p-6 bg-gradient-to-b from-indigo-50 to-white min-h-screen">
            <motion.h1
                className="text-2xl sm:text-3xl font-extrabold mb-6 text-indigo-800"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Transaction History
            </motion.h1>

            {/* Filters & Search */}
            <motion.div
                className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6 items-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Type Filter */}
                <div className="flex flex-col w-full sm:w-auto">
                    <label className="mb-1 text-indigo-600 font-medium">Type</label>
                    <select
                        className="border border-indigo-300 rounded-lg p-2 shadow hover:shadow-md transition w-full sm:w-auto text-indigo-700 font-medium"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="CASH_IN">Cash In</option>
                        <option value="CASH_OUT">Cash Out</option>
                        <option value="SEND">Send</option>
                        <option value="RECEIVE">Receive</option>
                    </select>
                </div>

                {/* Date From */}
                <div className="flex flex-col w-full sm:w-auto">
                    <label className="mb-1 text-indigo-600 font-medium">From</label>
                    <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="border-indigo-300" />
                </div>

                {/* Date To */}
                <div className="flex flex-col w-full sm:w-auto">
                    <label className="mb-1 text-indigo-600 font-medium">To</label>
                    <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="border-indigo-300" />
                </div>

                {/* Search */}
                <div className="flex flex-col flex-1">
                    <label className="mb-1 text-indigo-600 font-medium">Search</label>
                    <div className="flex w-full">
                        <Input
                            placeholder="Search by ID, From, To..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border-indigo-300"
                        />
                        <Button className="ml-2 bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all">
                            <FiSearch size={20} />
                        </Button>
                    </div>
                </div>

                {/* Clear Filters */}
                <Button
                    onClick={clearFilters}
                    className="mt-4 sm:mt-5 bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 w-full sm:w-auto justify-center shadow-md hover:shadow-lg transition-all"
                >
                    <FiXCircle /> Clear Filters
                </Button>
            </motion.div>

            {/* Transactions Table */}
            <motion.div
                className="overflow-x-auto bg-white rounded-2xl shadow-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <table ref={tableRef} className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
                    <thead className="bg-indigo-100 sticky top-0">
                        <tr>
                            <th className="px-4 sm:px-6 py-3 text-left font-semibold text-indigo-700">ID</th>
                            <th className="px-4 sm:px-6 py-3 text-left font-semibold text-indigo-700">From</th>
                            <th className="px-4 sm:px-6 py-3 text-left font-semibold text-indigo-700">To</th>
                            <th className="px-4 sm:px-6 py-3 text-left font-semibold text-indigo-700">Amount</th>
                            <th className="px-4 sm:px-6 py-3 text-left font-semibold text-indigo-700">Type</th>
                            <th className="px-4 sm:px-6 py-3 text-left font-semibold text-indigo-700">Status</th>
                            <th className="px-4 sm:px-6 py-3 text-left font-semibold text-indigo-700">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredTransactions.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-6 text-gray-500">
                                    No transactions found
                                </td>
                            </tr>
                        ) : (
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            filteredTransactions.map((tx: any, index: number) => (
                                <motion.tr
                                    key={tx._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05, duration: 0.4 }}
                                    className="hover:bg-indigo-50 cursor-pointer transition-colors"
                                >
                                    <td className="px-4 sm:px-6 py-3 font-mono text-indigo-900">{tx._id}</td>
                                    <td className="px-4 sm:px-6 py-3 text-indigo-800">{tx.from}</td>
                                    <td className="px-4 sm:px-6 py-3 text-indigo-800">{tx.to}</td>
                                    <td className="px-4 sm:px-6 py-3 font-semibold text-green-600">${tx.amount.toFixed(2)}</td>
                                    <td className="px-4 sm:px-6 py-3 font-medium text-purple-600">{tx.type}</td>
                                    <td className="px-4 sm:px-6 py-3 font-medium text-blue-600">{tx.status}</td>
                                    <td className="px-4 sm:px-6 py-3 text-gray-700">{new Date(tx.createdAt).toLocaleString()}</td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </motion.div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-2">
                <Button
                    className="bg-gray-300 hover:bg-gray-400 w-full sm:w-auto shadow-md hover:shadow-lg transition-all"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                    Previous
                </Button>
                <span className="text-indigo-800 font-medium">Page {page} of {totalPages}</span>
                <Button
                    className="bg-gray-300 hover:bg-gray-400 w-full sm:w-auto shadow-md hover:shadow-lg transition-all"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
