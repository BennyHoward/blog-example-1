# Requirements

Unfortunately, due to the time limitations, the user registration flow will not be available.  
However, if this is requested feel free to reach out to [Benny Howard](mailto:bennyhoward.opensource@gmail.com).  

The application is a minimalistic blogging platform.  
It should allow the user to login, see posts, create a new post, and logout.  

User classification definitions:

- _anonymous user_: Any unauthenticated user.
- _authenticated user_: Any user that has an account wit hte system

High-level requirements:

- The system **SHALL** consist of a _Login Page_ via the following path `/login`.
- The system **SHALL** consist of a _Logout page_ via the following path `/logout`.
- The system **SHALL** consist of a _Dashboard Page_ via the following path `/`.

Login Page requirements:

- The system **SHALL** present a login form to all user classifications when on the _Login Page_.

Logout Page requirements:

- The system **SHALL** deauthenticate _authenticated users_ when the _Logout page_ is loaded.
- The system **SHALL** present the _Logout page_ to all user classifications with a message indicating that the user is no longer logged into the system.
- The system **SHALL** present the _Logout page_ to all user classifications with a message inviting the user to log into the system with a link to redirect to the _Login Page_.

Dashboard Page requirements:

- The system **SHALL** only allow authenticated users to access the _Dashboard Page_.
- The system **SHALL** redirect _anonymous users_ the _Login Page_.
- The system **SHALL** present a single-page web application to an _authenticated user_ to perform all operations.
- The system **SHALL** allow an _authenticated user_ to view all available blog posts on the _Dashboard Page_.
- The system **SHALL** allow an _authenticated user_ to create a new blog post.
- The system **SHALL** allow an _authenticated user_ to update an existing blog post that was only written by that _authenticated user_.
- The system **SHALL** allow an _authenticated user_ to delete an existing blog post that was only written by that _authenticated user_.

Data Models:

| User            | type   | unique | required | default | nullable | constraints | notes |
|-----------------|--------|--------|----------|---------|----------|-------------|-------|
| username        | string |        |          |         |          |             |       |
| hashed_password | string |        |          |         |          |             |       |
| email           | string |        |          |         |          |             |       |

| Article         | type   | unique | required | default | nullable | constraints | notes |
|-----------------|--------|--------|----------|---------|----------|-------------|-------|
| title           | string |        |          |         |          |             |       |
| body            | string |        |          |         |          |             |       |
| writer          | User   |        |          |         |          |             |       |

**TODO**
