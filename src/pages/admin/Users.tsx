/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import {
    useApproveWalletMutation,
    useBlockWalletMutation,
    useUnblockWalletMutation,
    useGetAllUsersQuery,
    useGetAllWalletsQuery,
} from "@/features/admin/admin.api";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Wallet {
    _id: string;
    userId: string | { _id: string };
    isBlocked: boolean;
}

export default function AdminUsers() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10;

    // ✅ Hooks must be called unconditionally
    const { data: usersResponse, isLoading: usersLoading } = useGetAllUsersQuery({});
    const { data: walletsResponse, isLoading: walletsLoading } = useGetAllWalletsQuery({});
    const [approveWallet] = useApproveWalletMutation();
    const [blockWallet] = useBlockWalletMutation();
    const [unblockWallet] = useUnblockWalletMutation();

    // Map wallets by userId safely
    const wallets = (walletsResponse?.data || []) as Wallet[];
    const walletMap = useMemo(() => {
        return wallets.reduce<Record<string, Wallet>>((acc, w) => {
            const userId = typeof w.userId === "string" ? w.userId : w.userId._id;
            if (userId) acc[userId] = w;
            return acc;
        }, {});
    }, [wallets]);

    // Filter only 'user' role and apply search
    const users = useMemo(() => {
        return (usersResponse?.data || [])
            .filter((u: any) => u.role === "user")
            .filter(
                (u: any) =>
                    u.name.toLowerCase().includes(search.toLowerCase()) ||
                    u.email.toLowerCase().includes(search.toLowerCase()) ||
                    u._id.includes(search)
            );
    }, [usersResponse, search]);

    // Pagination
    const totalPages = Math.ceil(users.length / limit);
    const paginatedUsers = users.slice((page - 1) * limit, page * limit);

    // ✅ Conditional rendering after all hooks
    if (usersLoading || walletsLoading) {
        return <div className="text-center text-lg p-6">Loading users...</div>;
    }

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">All Users</h1>

            {/* Search */}
            <div className="mb-4 flex gap-3">
                <Input
                    placeholder="Search by name, email or ID"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="w-80"
                />
            </div>

            <Table className="shadow-lg rounded-xl overflow-hidden">
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>User Status</TableHead>
                        <TableHead>Wallet Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedUsers.map((user: any) => {
                        const wallet = walletMap[user._id];
                        const walletActive = wallet ? !wallet.isBlocked : false;

                        return (
                            <motion.tr
                                key={user._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="border-b hover:bg-gray-50"
                            >
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>

                                {/* User Status */}
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded-full text-white text-sm ${user.isActive === "ACTIVE" ? "bg-green-600" : "bg-red-600"
                                            }`}
                                    >
                                        {user.isActive}
                                    </span>
                                </TableCell>

                                {/* Wallet Status */}
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded-full text-white text-sm ${walletActive ? "bg-green-600" : "bg-yellow-500"
                                            }`}
                                    >
                                        {walletActive ? "Approved" : "Pending"}
                                    </span>
                                </TableCell>

                                {/* Action buttons */}
                                <TableCell className="flex gap-2 flex-wrap">
                                    {!wallet && (
                                        <Button
                                            className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
                                            onClick={async () => {
                                                await approveWallet({ id: user._id });
                                                toast.success("Wallet approved");
                                            }}
                                        >
                                            Approve Wallet
                                        </Button>
                                    )}
                                    {walletActive && (
                                        <Button
                                            className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                                            onClick={async () => {
                                                await blockWallet({ id: wallet._id });
                                                toast.success("Wallet blocked");
                                            }}
                                        >
                                            Block Wallet
                                        </Button>
                                    )}
                                    {wallet && !walletActive && (
                                        <Button
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                                            onClick={async () => {
                                                await unblockWallet({ id: wallet._id });
                                                toast.success("Wallet unblocked");
                                            }}
                                        >
                                            Unblock Wallet
                                        </Button>
                                    )}
                                </TableCell>
                            </motion.tr>
                        );
                    })}
                </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-4">
                <Button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                >
                    Prev
                </Button>
                <span>
                    Page {page} of {totalPages || 1}
                </span>
                <Button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
