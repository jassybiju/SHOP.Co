import { useForm } from "react-hook-form";
import Input from "../../../../components/Input";
import { Link } from "react-router";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Email submitted:", data);
  };

  return (
    <div className="flex h-[90vh] items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full h-3/4 max-w-md p-8 ">
        {/* Logo / App Name */}
        <h1 className="text-2xl font-bold text-center mb-2">
          Syn<span className="text-purple-500">apse</span>
        </h1>
        <h2 className="text-3xl font-bold text-center mb-20">
          Forgot Password ?
        </h2>

        {/* Instruction */}
        <p className="text-gray-600  mb-4">
          Enter your registered email
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input
            type="email"
            placeholder="Enter the email"
            {...register("email", { required: "Email is required" })}
            error={errors.email?.message}
          />

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <Link
              to="/auth/login"
              className="text-sm text-gray-600 hover:underline"
            >
              Back to Login
            </Link>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >
              Verify Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ForgetPassword;
