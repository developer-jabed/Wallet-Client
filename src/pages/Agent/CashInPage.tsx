/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCashInMutation } from "@/features/transaction/transaction.api";
import { useGetMyWalletQuery } from "@/features/wallet/wallet.api";
import { useUserInfoQuery } from "@/features/auth/auth.api"; // 👈 import this

export default function AgentCashIn() {
    const [userId, setUserId] = useState("");
    const [amount, setAmount] = useState<number | "">("");

    // Fetch agent's own wallet
    const { data: walletData, isLoading: walletLoading } = useGetMyWalletQuery({});
    const agentBalance = walletData?.data.balance ?? 0;
    // console.log(walletData)

    // Fetch agent's user info (to get agentId)
    const { data: userInfo } = useUserInfoQuery();
    const agentId = userInfo?.data?._id; // 👈 agentId will be fixed from backend
    // console.log(userInfo)
    const [cashIn, { isLoading }] = useCashInMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId || !amount || amount <= 0) {
            return toast.error("Please enter valid user ID and amount");
        }

        if (amount > agentBalance) {
            return toast.error("Insufficient balance in your wallet");
        }

        try {
            await cashIn({
                fromAgentId: agentId, 
                toUserId: userId,
                amount: Number(amount),
            }).unwrap();

            toast.success("Cash-in successful!");
            setUserId("");
            setAmount("");
        } catch (err: any) {
            console.log(err)
            toast.error(err?.data?.message || "Cash-in failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Cash In to User Wallet</h2>

            {/* Display available balance */}
            <div className="mb-6 text-lg font-medium text-gray-700">
                Available Balance:{" "}
                {walletLoading ? "Loading..." : <span className="font-bold">{agentBalance}৳</span>}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Fixed Agent ID */}
                <div className="flex flex-col">
                    <label className="mb-1 text-gray-600 font-medium">Agent ID</label>
                    <Input value={agentId ?? ""} disabled /> {/* 👈 fixed, not editable */}
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 text-gray-600 font-medium">User ID</label>
                    <Input
                        placeholder="Enter user ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 text-gray-600 font-medium">Amount</label>
                    <Input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        min={1}
                        required
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={isLoading || walletLoading || !agentId}
                >
                    {isLoading ? "Processing..." : "Cash In"}
                </Button>
            </form>
        </div>
    );
}
