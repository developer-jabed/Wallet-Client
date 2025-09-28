/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCashoutMutation } from "@/features/transaction/transaction.api";
import { useGetMyWalletQuery } from "@/features/wallet/wallet.api";
import { useUserInfoQuery } from "@/features/auth/auth.api";

export default function AgentCashout() {
    const [amount, setAmount] = useState<number | "">("");
    const [recipientId, setRecipientId] = useState("");

    // Fetch agent's wallet
    const { data: walletData, isLoading: walletLoading } = useGetMyWalletQuery({});
    const agentBalance = walletData?.data.balance ?? 0;

    // Fetch agent info
    const { data: userInfo } = useUserInfoQuery();
    const userId = userInfo?.data?._id;
    console.log(userId)

    const [cashout, { isLoading }] = useCashoutMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!recipientId || !amount || amount <= 0) {
            return toast.error("Please enter valid recipient ID and amount");
        }

        if (amount > agentBalance) {
            return toast.error("Insufficient balance in your wallet");
        }

        try {
            await cashout({
                fromUserId: userId,
                toAgentId: recipientId,
                amount: Number(amount),
            }).unwrap();

            toast.success("Cashout successful!");
            setRecipientId("");
            setAmount("");
        } catch (err: any) {
            console.log(err);
            toast.error(err?.data?.message || "Cashout failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Cash Out from Wallet</h2>

            {/* Display available balance */}
            <div className="mb-6 text-lg font-medium text-gray-700">
                Available Balance:{" "}
                {walletLoading ? "Loading..." : <span className="font-bold">{agentBalance}৳</span>}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Fixed Agent ID */}
                <div className="flex flex-col">
                    <label className="mb-1 text-gray-600 font-medium">My ID</label>
                    <Input value={userId ?? ""} disabled />
                </div>

                {/* Recipient ID */}
                <div className="flex flex-col">
                    <label className="mb-1 text-gray-600 font-medium">Agent ID</label>
                    <Input
                        placeholder="Enter recipient ID"
                        value={recipientId}
                        onChange={(e) => setRecipientId(e.target.value)}
                        required
                    />
                </div>

                {/* Amount */}
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
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    disabled={isLoading || walletLoading || !userId}
                >
                    {isLoading ? "Processing..." : "Cash Out"}
                </Button>
            </form>
        </div>
    );
}
