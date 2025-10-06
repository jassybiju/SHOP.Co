export const OTP_TYPES = {
    SIGN_UP: "sign-up",
    FORGET_PASSWORD: "forget-password",
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