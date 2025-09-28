/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FiUser, FiPhone, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useUpdateMyProfileMutation} from "@/features/user/user.api";
import { useResetPasswordMutation } from "@/features/auth/auth.api";

interface UpdateProfileProps {
    userData: any; // get this from backend (getMyProfile query)
}

export default function UpdateAgent({ userData }: UpdateProfileProps) {
    const [form, setForm] = useState({
        name: "",
        phone: "",
    });

    const [passwordForm, setPasswordForm] = useState({
        oldPassword: "",
        newPassword: "",
    });

    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
    });

    const [updateUser, { isLoading: isUpdating }] = useUpdateMyProfileMutation();
    const [changePassword, { isLoading: isChanging }] = useResetPasswordMutation();

    useEffect(() => {
        if (userData) {
            setForm({
                name: userData.name || "",
                phone: userData.phone || "",
            });
        }
    }, [userData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordForm((prev) => ({ ...prev, [name]: value }));
    };

    const togglePassword = (field: "oldPassword" | "newPassword") => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmitProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateUser(form).unwrap();
            toast.success("Profile updated successfully!");
        } catch (err: any) {
            console.error(err);
            toast.error(err?.data?.message || "Failed to update profile");
        }
    };

    const handleSubmitPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await changePassword(passwordForm).unwrap();
            toast.success("Password changed successfully!");
            setPasswordForm({ oldPassword: "", newPassword: "" });
        } catch (err: any) {
            console.error(err);
            toast.error(err?.data?.message || "Failed to change password");
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center p-6 bg-gray-50 min-h-screen gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Profile Update Form */}
            <motion.form
                className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 space-y-6"
                onSubmit={handleSubmitProfile}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Update Profile</h2>

                {/* Name */}
                <div className="flex flex-col relative">
                    <label className="mb-1 text-gray-600 font-medium">Name</label>
                    <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col relative">
                    <label className="mb-1 text-gray-600 font-medium">Phone</label>
                    <div className="relative">
                        <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="pl-10"
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300"
                    disabled={isUpdating}
                >
                    {isUpdating ? "Updating..." : "Update Profile"}
                </Button>
            </motion.form>

            {/* Change Password Form */}
            <motion.form
                className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 space-y-6"
                onSubmit={handleSubmitPassword}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Change Password</h2>

                {/* Old Password */}
                <div className="flex flex-col relative">
                    <label className="mb-1 text-gray-600 font-medium">Old Password</label>
                    <div className="relative">
                        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                            name="oldPassword"
                            type={showPassword.oldPassword ? "text" : "password"}
                            value={passwordForm.oldPassword}
                            onChange={handlePasswordChange}
                            placeholder="Enter old password"
                            className="pl-10 pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => togglePassword("oldPassword")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {showPassword.oldPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                </div>

                {/* New Password */}
                <div className="flex flex-col relative">
                    <label className="mb-1 text-gray-600 font-medium">New Password</label>
                    <div className="relative">
                        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                            name="newPassword"
                            type={showPassword.newPassword ? "text" : "password"}
                            value={passwordForm.newPassword}
                            onChange={handlePasswordChange}
                            placeholder="Enter new password"
                            className="pl-10 pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => togglePassword("newPassword")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {showPassword.newPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300"
                    disabled={isChanging}
                >
                    {isChanging ? "Changing..." : "Change Password"}
                </Button>
            </motion.form>
        </motion.div>
    );
}
