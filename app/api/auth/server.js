// server.js
import express from "express";
import next from "next";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import axios from "axios";
import mongoose from "mongoose";
import User from "../../../lib/models/user"; // Assuming you have a User model

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/your-db-name", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Save the user data in MongoDB
      User.findOneAndUpdate(
        { googleId: profile.id },
        {
          googleId: profile.id,
          accessToken,
          refreshToken,
          youtubeChannelId: profile.id,
          email: profile.emails[0].value,
        },
        { upsert: true, new: true },
        (err, user) => {
          return done(err, user);
        }
      );
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.prepare().then(() => {
  const server = express();

  server.use(
    session({
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: true,
    })
  );
  server.use(passport.initialize());
  server.use(passport.session());

  // Google login route
  server.get(
    "/api/auth/google",
    passport.authenticate("google", {
      scope: [
        "profile",
        "email",
        "https://www.googleapis.com/auth/youtube.readonly",
      ],
    })
  );

  // Google callback route
  server.get(
    "/api/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/dashboard"); // Redirect to dashboard after successful login
    }
  );

  // Server-side YouTube video fetching
  server.get("/api/user/videos", async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const { accessToken } = req.user;

      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/videos",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: { part: "snippet,contentDetails", mine: true },
        }
      );

      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  });

  // Default handler for Next.js pages
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
