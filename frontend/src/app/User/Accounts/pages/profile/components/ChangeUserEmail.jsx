import React from "react";
import Button from "@/app/User/components/Button";
import InputComponent from "@/components/InputComponent";
import { Loader2 } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { useChangeEmail } from "../../../hooks/useAccount";
import toast from "react-hot-toast";
import { OTP_TYPES } from "@/utils/CONSTANTS";

const ChangeUserEmail = () => {
    const newEmailRef = useRef();
    const { mutate: changeEmail, status } = useChangeEmail();
    const navigate = useNavigate()

    const onSubmit = () => {
        changeEmail(newEmailRef.current.value, {
            onSuccess : (res , variables) => {
                console.log(variables)
                toast.success(res.message)
                navigate('/auth/otp-verify', {
                    state : {otpExpiry : res.data.otp_timer , email : variables , type : OTP_TYPES.CHANGE_EMAIL}
                })
                
            },
            onError : (data) => toast.error(data.response.data.message)
        })
    }

    return (
        <div className="border-t-2 mt-4">
            <p className="text-2xl pt-4">Change Email</p>
            <div className="flex gap-10 w-full justify-between">
                <InputComponent
                    ref={newEmailRef}
                    placeholder={"Enter New Email ID"}
                />

                <Button 
                onClick={onSubmit}
                    className={"h-min mt-2"}
                    disabled={status === "pending"}
                    label={"Submit"}
                    isLoading={status === "pending"}
                    loadingLabel={
                        <div className="flex gap-2">
                            <Loader2 className="animate-spin" /> Submiting{" "}
                        </div>
                    }
                />
            </div>
        </div>
    );
};
export default ChangeUserEmail;
