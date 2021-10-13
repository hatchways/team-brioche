## Pet sitter

A website that makes it easier for dog owners to find a dog sitter. We created a beautiful, easy to-use website that helps dog owners find dog sitters when they need it most. We want dog owners to feel secure, comfortable and at ease with their decision to book a dog sitter. We want dog sitters to feel excited to meet and care for a new dog.

**Tech Stack:** MongoDB, Express.js, React.js, Node.js, Typescript

**Contributors**:
- https://github.com/BerryGIT-ME
    - contributions: https://github.com/hatchways/team-brioche/pulls?q=is%3Apr+is%3Aclosed+author%3ABerryGIT-ME
- https://github.com/mayanksuchde
    - contributions: https://github.com/hatchways/team-brioche/pulls?q=is%3Apr+is%3Aclosed+author%3Amayanksuchde
- https://github.com/DejanKatovic
    - contributions: https://github.com/hatchways/team-brioche/pulls?q=is%3Apr+is%3Aclosed+author%3ADejanKatovic
- https://github.com/rajivtitus (Team Lead)

---

### Getting Started

1. Clone or download repository

---

## Server

1. Go into the server directory `cd server`
2. Run `npm install` to install packages
3. Create your environment variable (.env) file
- Add the following to your .env file
    - JWT_SECRET="Any valid string: used for hashing passwords"
    - MONGO_URI="Path to your MongoDB database"
    - STRIPE_SECRET_KEY="Secret key obtained from Stripe: used for processing payments"
    - STRIPE_PUBLIC_KEY="Public key obtained from Stripe"
4. Run `npm run dev` to start the server

---

## Client

1. Go into the client directory `cd client`
2. Run `npm install` to install packages
3. Create your environment variable (.env) file
- Add the following to your .env file
    - REACT_APP_STRIPE_PUBLIC_KEY="Public key obtained from Stripe"
4. Run `npm start` to start the client side

---

### Demo

1. Registration. Dog-sitter/Dog-owner will be able to create a new account using their email and password

![signup form](https://user-images.githubusercontent.com/53505772/134494779-228bb459-7936-4588-b78f-6b00997dd49d.PNG)

2. Dashboard. Here is a description about what a Dog-sitter/Dog-owner can expect to see

![dashboard](https://user-images.githubusercontent.com/53505772/137092587-9c92148c-fa06-4786-9260-8370d9d7154f.PNG)

3. Homepage. Dog owners will be able to quickly search for dog sitters

![homepage](https://user-images.githubusercontent.com/53505772/135550767-8a3a8e98-e6fd-4262-bba4-7651174b0435.PNG)

4. Profile Listings. Displays search results for dog sitters. A dog owner may select anyone that fits their needs

![integration1](https://user-images.githubusercontent.com/53505772/135735413-5518fc4b-06c7-4506-87ff-758bf077fe3c.PNG)

5. Profile details. A dog owner can make requests for a dog sitter

<img width="1438" alt="Screen Shot 2021-09-27 at 1 24 30 PM" src="https://user-images.githubusercontent.com/6592064/134956424-ef2a42fc-000a-43ca-9d78-5a3feb47e3a3.png">

6. Profile Payment. Dog owners can add their payment cards to their profile which will be charged when their request for a dog sitter is accepted

https://user-images.githubusercontent.com/53505772/136446113-b602aae0-5c41-4343-b66a-847b4bdf8371.mp4

7. Bookings. Dog sitters can see the list of dog owners requesting their services and accept or decline requests.

![booking_init](https://user-images.githubusercontent.com/53505772/134063583-94ef9721-a7f4-421a-a94e-c0d0f22bcf3f.PNG)

