// dictionary for all texts

const dict = {
    navbar: {
        title: 'MyContacts',
        login: 'Login',
        register: 'Register',
        contacts: 'Contacts',
        home: 'Home',
        logout: 'Logout',
        to: {
            login: '/login',
            register: '/register',
            contacts: '/contacts',
            home: '/',
        }
    },
    login: {
        title: 'Login',
        email: 'Email',
        password: 'Password',
        login: 'Login',
        to: {
            contacts: '/contacts',
        },
        sessionExpired: 'Your session has expired. Please login again.',
        needLogin: 'You need to login to access this page.',
    },

    register: {
        title: 'Register',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        register: 'Register',
        to: {
            login: '/login',
            contacts: '/contacts',
        },
    },

    contacts: {
        title: 'Contacts',
        list: 'List of contacts',
        loggedIn: 'You are logged in.',
    },
};

export default dict;