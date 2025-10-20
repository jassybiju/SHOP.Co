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

export const STATUS_TRANSITIONS = {
    'PLACED' : ['CONFIRMED'],
    'CONFIRMED' : ['PACKED'],
    PACKED : ['SHIPPED'],
    SHIPPED : ["DELIVERED" ],
    DELIVERED : [],

    'CANCELLATION_REQUESTED' : ['CANCELLED', 'CONFIRMED', 'PACKED', 'SHIPPED', 'DELIVERED', 'RETURNED'],
    CANCELLATION_DENIED: ['CONFIRMED', 'PACKED', 'SHIPPED', 'DELIVERED', 'RETURNED'],

    RETURN_REQUESTED : ['RETURNED', 'RETURN_DENIED' ],
    RETURN_DENIED : ['DELIVERED'],

    'CANCELLED': [],
    'RETURNED': [],

    'DEFAULT': ['CANCELLATION_REQUESTED', 'CANCELLED']

}


export const HTTP_RES = {
    'OK' : 200,
    'CREATED' : 201,
    ACCEPTED : 202,
    'NOT_FOUND' : 404,
    BAD_REQUEST : 400,
    UNAUTHORIZED : 401,
    FORBIDDEN : 403,
    CONFLICT : 409,
    UNPROCESSABLE_ENTITY : 422,
    INTERNAL_ERROR : 500
}