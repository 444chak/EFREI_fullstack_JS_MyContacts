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
    },
};

export default dict;