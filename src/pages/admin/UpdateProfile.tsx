/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FiUser, FiPhone } from "react-icons/fi";
import { useUpdateMyProfileMutation } from "@/features/user/user.api";

interface UpdateProfileProps {
  userData: any; // you get this from your backend (getMyProfile query)
}

export default function UpdateProfile({ userData }: UpdateProfileProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  const [updateUser, { isLoading }] = useUpdateMyProfileMutation();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // ✅ just send form, no need for id
      await updateUser(form).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  return (
    <motion.div
      className="flex justify-center items-start p-6 bg-gray-50 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.form
        className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 space-y-6"
        onSubmit={handleSubmit}
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
              required
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

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </motion.form>
    </motion.div>
  );
}
