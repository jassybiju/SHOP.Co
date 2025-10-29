export const OTP_TYPES = {
    SIGN_UP: "sign-up",
    FORGET_PASSWORD: "forget-password",
    CHANGE_EMAIL : 'change-email'
};

export const SIZE_TYPES = [
    { label: "Small", value: "S" },
    { label: "Medium", value: "M" },
    { label: "Large", value: "L" },
    { label: "X Large", value: "XL" },
];


export const productFilterOptions = [
    {label : "Active" , value: 'isActive'},
    {label : "All Products" , value: 'AllProduct'},
    {label : "In Active" , value: 'isInActive'},
]

export const STATUS_TRANSITIONS_OPTIONS = {
    'PLACED': [
        { label: 'CONFIRMED', value: 'CONFIRMED' },

    ],
    'CONFIRMED': [
        { label: 'PACKED', value: 'PACKED' },

    ],
    'PACKED': [
        { label: 'SHIPPED', value: 'SHIPPED' },

    ],
    'SHIPPED': [
        { label: 'DELIVERED', value: 'DELIVERED' },
        // { label: 'RETURNED', value: 'RETURNED' },
    ],
    'DELIVERED': [
        // { label: 'RETURNED', value: 'RETURNED' },
    ],
    'CANCELLATION_REQUESTED': [
        { label: 'CANCELLED', value: 'CANCELLED' },
        { label: 'CONFIRMED', value: 'CONFIRMED' },
        { label: 'PACKED', value: 'PACKED' },
        { label: 'SHIPPED', value: 'SHIPPED' },
        { label: 'DELIVERED', value: 'DELIVERED' },
        { label: 'RETURNED', value: 'RETURNED' },
    ],
    'CANCELLATION_DENIED': [
        { label: 'CONFIRMED', value: 'CONFIRMED' },
        { label: 'PACKED', value: 'PACKED' },
        { label: 'SHIPPED', value: 'SHIPPED' },
        { label: 'DELIVERED', value: 'DELIVERED' },
        { label: 'RETURNED', value: 'RETURNED' },
    ],

    RETURN_REQUESTED : [
        {label : "RETURNED", value :"RETURNED"},
        {label : "RETURN_DENIED", value : "RETURN_DENIED"}
    ],
    RETURN_DENIED : [
        { label: 'DELIVERED', value: 'DELIVERED' },

    ],

    'CANCELLED': [],
    'RETURNED': [],
    'DEFAULT': [
        { label: 'CANCELLATION_REQUESTED', value: 'CANCELLATION_REQUESTED' },
        { label: 'CANCELLED', value: 'CANCELLED' },
    ],
};
