/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  ArrowDownCircle,
  ArrowUpCircle,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useGetAllTransactionsQuery } from "@/features/transaction/transaction.api";

export default function ViewAllTransactions() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetAllTransactionsQuery({ page, limit, search });

  if (isLoading) {
    return <p className="text-center text-lg animate-pulse text-blue-600">Loading transactions...</p>;
  }

  const transactions = data?.data || [];
  const meta = data?.meta || { total: 0, totalPages: 1 };

  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-xl border rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-500  to-pink-500 text-white">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <DollarSign className="w-6 h-6" />
            All Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="flex items-center gap-3 mb-5 mt-4">
            <Input
              placeholder="🔍 Search by ID, name, or email"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-80"
            />
          </div>

          {/* Table */}
          <motion.table
            className="w-full border-collapse border rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border text-left">ID</th>
                <th className="p-3 border text-left">From</th>
                <th className="p-3 border text-left">To</th>
                <th className="p-3 border text-left">Amount</th>
                <th className="p-3 border text-left">Commission</th>
                <th className="p-3 border text-left">Type</th>
                <th className="p-3 border text-left">Status</th>
                <th className="p-3 border text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t: any, i: number) => (
                <motion.tr
                  key={t._id}
                  className="hover:bg-indigo-50 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td className="p-3 border text-xs font-mono text-gray-600">{t._id}</td>

                  {/* From User */}
                  <td className="p-3 border">
                    {t.fromUserId ? (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-indigo-500" />
                        <div>
                          <p className="font-semibold text-gray-800">{t.fromUserId.name}</p>
                          <p className="text-xs text-gray-500">{t.fromUserId.email}</p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
                  </td>

                  {/* To User */}
                  <td className="p-3 border">
                    {t.toUserId ? (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-green-500" />
                        <div>
                          <p className="font-semibold text-gray-800">{t.toUserId.name}</p>
                          <p className="text-xs text-gray-500">{t.toUserId.email}</p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
                  </td>

                  {/* Amount */}
                  <td className="p-3 border font-semibold text-green-600 flex items-center gap-1">
                    <DollarSign className="w-4 h-4" /> ${t.amount}
                  </td>

                  {/* Commission */}
                  <td className="p-3 border text-sm text-gray-700">
                    ${t.commission || 0}
                  </td>

                  {/* Type */}
                  <td className="p-3 border">
                    <Badge
                      className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${t.type === "SEND"
                          ? "bg-blue-100 text-blue-600"
                          : t.type === "RECEIVE"
                            ? "bg-green-100 text-green-600"
                            : t.type === "CASH_IN"
                              ? "bg-purple-100 text-purple-600"
                              : "bg-orange-100 text-orange-600"
                        }`}
                    >
                      {t.type === "SEND" && <ArrowUpCircle className="w-3 h-3" />}
                      {t.type === "RECEIVE" && <ArrowDownCircle className="w-3 h-3" />}
                      {t.type}
                    </Badge>
                  </td>

                  {/* Status */}
                  <td className="p-3 border">
                    <Badge
                      className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${t.status === "COMPLETED"
                          ? "bg-green-100 text-green-600"
                          : t.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                    >
                      {t.status === "COMPLETED" && <CheckCircle2 className="w-3 h-3" />}
                      {t.status === "PENDING" && <Clock className="w-3 h-3" />}
                      {t.status === "FAILED" && <XCircle className="w-3 h-3" />}
                      {t.status}
                    </Badge>
                  </td>

                  {/* Date */}
                  <td className="p-3 border text-sm text-gray-500">
                    {new Date(t.createdAt).toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <Button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              variant="outline"
              className="hover:bg-indigo-100"
            >
              Prev
            </Button>
            <span className="text-sm font-medium text-gray-700">
              Page {page} of {meta.totalPages}
            </span>
            <Button
              disabled={page === meta.totalPages}
              onClick={() => setPage((p) => p + 1)}
              variant="outline"
              className="hover:bg-indigo-100"
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
