/* eslint-disable @typescript-eslint/no-explicit-any */
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

export default function AdminAgents() {
  const { data: usersResponse, isLoading: usersLoading } = useGetAllUsersQuery({});
  const { data: walletsResponse, isLoading: walletsLoading } = useGetAllWalletsQuery({});

  const [approveWallet] = useApproveWalletMutation();
  const [blockWallet] = useBlockWalletMutation();
  const [unblockWallet] = useUnblockWalletMutation();

  if (usersLoading || walletsLoading) return <div>Loading agents...</div>;

  // ✅ Filter only agents
  const users = (usersResponse?.data || []).filter((user: any) => user.role === "agent");
  console.log(usersResponse)
  const wallets = walletsResponse?.data || [];

  const walletMap = Array.isArray(wallets)
    ? wallets.reduce<Record<string, any>>((acc, w) => {
      const userId = typeof w.userId === "string" ? w.userId : w.userId?._id;
      if (userId) acc[userId] = w;
      return acc;
    }, {})
    : {};

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">All Agents</h1>

      <Table>
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
          {users.map((user: any) => {
            const wallet = walletMap[user._id];
            const walletActive = wallet ? !wallet.isBlocked : false;

            return (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="border-b"
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>

                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${user.isActive === "ACTIVE"
                        ? "bg-green-600"
                        : "bg-red-600"
                      }`}
                  >
                    {user.isActive}
                  </span>
                </TableCell>

                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${walletActive ? "bg-green-600" : "bg-yellow-500"
                      }`}
                  >
                    {walletActive ? "Approved" : "Pending"}
                  </span>
                </TableCell>

                <TableCell className="flex gap-2 flex-wrap">
                  {!wallet && (
                    <button
                      className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                      onClick={async () => {
                        await approveWallet({ id: user._id });
                        toast.success("Wallet approved");
                      }}
                    >
                      Approve Wallet
                    </button>
                  )}

                  {walletActive && (
                    <button
                      className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      onClick={async () => {
                        await blockWallet({ id: wallet._id });
                        toast.success("Wallet blocked");
                      }}
                    >
                      Block Wallet
                    </button>
                  )}
                  {wallet && !walletActive && (
                    <button
                      className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      onClick={async () => {
                        await unblockWallet({ id: wallet._id });
                        toast.success("Wallet unblocked");
                      }}
                    >
                      Unblock Wallet
                    </button>
                  )}
                </TableCell>
              </motion.tr>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
