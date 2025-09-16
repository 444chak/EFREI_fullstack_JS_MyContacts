// dictionary for all texts

const dict = {
    navbar: {
        title: "MyContacts",
        login: "Login",
        register: "Register",
        contacts: "Contacts",
        home: "Home",
        logout: "Logout",
        to: {
            login: "/login",
            register: "/register",
            contacts: "/contacts",
            home: "/",
        }
    },
    login: {
        title: "Login",
        email: "Email",
        password: "Password",
        login: "Login",
        to: {
            contacts: "/contacts",
        },
        sessionExpired: "Your session has expired. Please login again.",
        needLogin: "You need to login to access this page.",
    },

    register: {
        title: "Register",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        register: "Register",
        to: {
            login: "/login",
            contacts: "/contacts",
        },
    },

    contacts: {
        title: "Contacts",
        label: "List of contacts",
        subtitle: "Click on a contact to view details",
        loggedIn: "You are logged in.",
        firstName: "First Name",
        lastName: "Last Name",
        phone: "Phone",
        update: "Update",
        updated: "Contact updated successfully.",
        cancel: "Cancel",
        deleteContact: "Delete Contact",
        deleted: "Contact deleted successfully.",
        createContact: "Create Contact",
        to: {
            createContact: "/contacts/create",
        },
    },

    contactCreate: {
        title: "Create Contact",
        subtitle: "Create a new contact",
        firstName: "First Name",
        lastName: "Last Name",
        phone: "Phone",
        create: "Create",
        cancel: "Cancel",
        to: {
            contacts: "/contacts",
        },
    },
    home: {
        title: "MyContacts",
        subtitle: "Welcome to MyContacts, the best way to manage your contacts.",
        login: "Login",
        contacts: "Contacts",
    },
};

export default dict;