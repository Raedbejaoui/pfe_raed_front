const courseList = [
    {
        id: 1,
        category: "Laravel Development",
        img: "assets/images/learning/laravel.png",
        name: "Master Laravel for Beginners & Intermediate",
        instructor: "Ophelia Steuber",
        lessons: "57",
        duration: "1 Years",
        students: "84",
        fees: 220.00,
        rating: "4.4",
        status: "Open"
    }, {
        id: 2,
        category: "PHP Development",
        img: "assets/images/learning/mysql.png",
        name: "Fundamentals of Database Engineering",
        instructor: "Domenic Dach",
        lessons: "87",
        duration: "9 Months",
        students: "320",
        fees: 99.99,
        rating: "4.9",
        status: "Open"
    }, {
        id: 3,
        category: "Marketing & Management",
        img: "assets/images/brands/firefox.png",
        name: "Conflict Management with Emotional Intelligence",
        instructor: "Prezy Mark",
        lessons: "43",
        duration: "1 Years",
        students: "159",
        fees: 214.99,
        rating: "4.8",
        status: "Close"
    }, {
        id: 4,
        category: "Web Design",
        img: "assets/images/learning/tailwindcss.png",
        name: "Tailwind CSS From Scratch",
        instructor: "Nelson Schaden",
        lessons: "101",
        duration: "8 Months",
        students: "362",
        fees: 301.00,
        rating: "4.2",
        status: "Open"
    }, {
        id: 5,
        category: "Asp.Net Development",
        img: "assets/images/learning/core.png",
        name: "Asp.Net Core 7 True Ultimate Guide",
        instructor: "Deondre Huel",
        lessons: "49",
        duration: "8 Years",
        students: "321",
        fees: 674.00,
        rating: "4.6",
        status: "Open"
    }, {
        id: 6,
        category: "Flask Development",
        img: "assets/images/learning/flask.png",
        name: "REST APIs with Flask",
        instructor: "Sarai Schmidt",
        lessons: "230",
        duration: "3 Years",
        students: "364",
        fees: 539.99,
        rating: "4.7",
        status: "Close"
    }, {
        id: 7,
        category: "Laravel Development",
        img: "assets/images/learning/laravel.png",
        name: "Master Laravel for Beginners & Intermediate",
        instructor: "Ophelia Steuber",
        lessons: "57",
        duration: "1 Years",
        students: "84",
        fees: 220.00,
        rating: "4.4",
        status: "Open"
    }, {
        id: 8,
        category: "Marketing & Management",
        img: "assets/images/learning/webpack.png",
        name: "Digital Marketing",
        instructor: "Nelson Schaden",
        lessons: "93",
        duration: "2 Years",
        students: "146",
        fees: 149.99,
        rating: "4.8",
        status: "Open"
    }, {
        id: 9,
        category: "Graphic Design",
        img: "assets/images/learning/sketch.png",
        name: "UI/UX Styleguide With Sketch",
        instructor: "Zachary Stokes",
        lessons: "68",
        duration: "7 Months",
        students: "120",
        fees: 321.99,
        rating: "4.9",
        status: "Open"
    }, {
        id: 10,
        category: "Shopify Development",
        img: "assets/images/learning/shopify.png",
        name: "The Complete Shopify Dropship course",
        instructor: "Ayaan Bowen",
        lessons: "120",
        duration: "1 Years",
        students: "23",
        fees: 193.00,
        rating: "4.7",
        status: "Close"
    }, {
        id: 11,
        category: "React Development",
        img: "assets/images/learning/react.png",
        name: "Advanced React and Redux",
        instructor: "Themesbrand",
        lessons: "15",
        duration: "2 Years",
        students: "49",
        fees: 278.12,
        rating: "4.5",
        status: "Open"
    }
]


const courseGrid = [
    {
        id: 1,
        category: "Laravel Development",
        img: "assets/images/learning/laravel.png",
        name: "Master Laravel for Beginners & Intermediate",
        instructor: "Ophelia Steuber",
        lessons: "57",
        duration: "1 Years",
        students: "84",
        profile: "assets/images/users/32/avatar-9.jpg",
        status: "Beginner",
        fees: 220.00,
        color: 'info',
        coursestatus: "Open"
    }, {
        id: 2,
        category: "PHP Development",
        img: "assets/images/learning/mysql.png",
        name: "Fundamentals of Database Engineering",
        instructor: "Domenic Dach",
        lessons: "87",
        duration: "9 Months",
        students: "320",
        profile: "assets/images/users/32/avatar-5.jpg",
        status: "Intermediate",
        fees: 99.99,
        color: 'danger',
        coursestatus: "Open"
    }, {
        id: 3,
        category: "Marketing & Management",
        img: "assets/images/brands/firefox.png",
        name: "Conflict Management with Emotional Intelligence",
        instructor: "Prezy Mark",
        lessons: "43",
        duration: "1 Years",
        students: "159",
        profile: "assets/images/users/32/avatar-7.jpg",
        status: "Advance",
        fees: 214.99,
        color: 'warning',
        coursestatus: "Close"
    }, {
        id: 4,
        category: "Web Design",
        img: "assets/images/learning/tailwindcss.png",
        name: "Tailwind CSS From Scratch",
        instructor: "Nelson Schaden",
        lessons: "101",
        duration: "8 Months",
        students: "362",
        profile: "assets/images/users/32/avatar-8.jpg",
        status: "Beginner",
        fees: 301.00,
        color: 'info',
        coursestatus: "Open"
    }, {
        id: 5,
        category: "Asp.Net Development",
        img: "assets/images/learning/core.png",
        name: "Asp.Net Core 7 True Ultimate Guide",
        instructor: "Deondre Huel",
        lessons: "49",
        duration: "8 Years",
        students: "321",
        profile: "assets/images/users/32/avatar-10.jpg",
        status: "Intermediate",
        fees: 674.00,
        color: 'primary',
        coursestatus: "Open"
    }, {
        id: 6,
        category: "Flask Development",
        img: "assets/images/learning/flask.png",
        name: "REST APIs with Flask",
        instructor: "Sarai Schmidt",
        lessons: "230",
        duration: "3 Years",
        students: "364",
        profile: "assets/images/users/32/avatar-1.jpg",
        status: "Beginner",
        fees: 539.99,
        color: 'dark',
        coursestatus: "Close"
    }, {
        id: 7,
        category: "Laravel Development",
        img: "assets/images/learning/laravel.png",
        name: "Master Laravel for Beginners & Intermediate",
        instructor: "Ophelia Steuber",
        lessons: "57",
        duration: "1 Years",
        students: "84",
        profile: "assets/images/users/32/avatar-9.jpg",
        status: "Advance",
        fees: 220.00,
        color: 'danger',
        coursestatus: "Open"
    }, {
        id: 8,
        category: "Marketing & Management",
        img: "assets/images/learning/webpack.png",
        name: "Digital Marketing",
        instructor: "Nelson Schaden",
        lessons: "93",
        duration: "2 Years",
        students: "146",
        profile: "assets/images/users/32/avatar-4.jpg",
        status: "Intermediate",
        fees: 149.99,
        color: 'primary',
        coursestatus: "Open"
    }, {
        id: 9,
        category: "Graphic Design",
        img: "assets/images/learning/sketch.png",
        name: "UI/UX Styleguide With Sketch",
        instructor: "Zachary Stokes",
        lessons: "68",
        duration: "7 Months",
        students: "120",
        profile: "assets/images/users/32/avatar-6.jpg",
        status: "Advance",
        fees: 321.99,
        color: 'warning',
        coursestatus: "Open"
    }, {
        id: 10,
        category: "Shopify Development",
        img: "assets/images/learning/shopify.png",
        name: "The Complete Shopify Dropship course",
        instructor: "Ayaan Bowen",
        lessons: "120",
        duration: "1 Years",
        students: "23",
        profile: "assets/images/users/32/avatar-3.jpg",
        status: "Beginner",
        fees: 193.00,
        color: 'success',
        coursestatus: "Close"
    }, {
        id: 11,
        category: "React Development",
        img: "assets/images/learning/react.png",
        name: "Advanced React and Redux",
        instructor: "Themesbrand",
        lessons: "15",
        duration: "6 Months",
        students: "256",
        profile: "assets/images/users/32/avatar-2.jpg",
        status: "Intermediate",
        fees: 278.12,
        color: 'info',
        coursestatus: "Open"
    }
]

export { courseList, courseGrid }