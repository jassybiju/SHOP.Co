export const OTP_INVALID_TIME = process.env.OTP_INVALID_TIME || 120;
export const OTP_EXPIRY_TIME = process.env.OTP_EXPIRY_TIME || 300;
export const OTP_VERIFY_LIMIT = process.env.OTP_VERIFY_LIMIT || 3;

export const OTP_TYPES = {
    SIGN_UP: "sign-up",
    FORGET_PASSWORD: "forget-password",
    CHANGE_EMAIL : 'change-email'
};

export const filterOptions = {
    AllUsers: {},
    ActiveUsers: { active: true },
    InActiveUsers: { active: false },
    Admin: { role: "admin" },
    User: { role: "user" },
};

export const brandFilterOptions = {
    isActive : {active : true},
    AllBrand : {},
    isInactive : {active : false}
}

export const productFilterOptions = {
    isActive : {is_active : true},
    AllProduct : {},
    isInActive : {is_active : false}
}