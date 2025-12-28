"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Code2, MessageSquare, Share2, Sparkles, Github } from "lucide-react";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  
  const handleSignin = async () => {
    setLoading(true);
    await signIn("github", {
      callbackUrl: "http://localhost:3000",
    });
    setLoading(false);
  };

  const features = [
    { icon: Code2, text: "Share Code Snippets" },
    { icon: MessageSquare, text: "Engage in Discussions" },
    { icon: Share2, text: "Connect with Developers" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Platform Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-primary/20 rounded-full"
                />
                <Code2 className="h-8 w-8 text-primary relative z-10" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                CodeBook
              </h1>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-2xl lg:text-3xl font-semibold text-foreground"
            >
              Where Developers Connect
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              A vibrant community platform built exclusively for developers. Share your code snippets, 
              engage in technical discussions, and connect with fellow developers from around the world.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              What you can do
            </h3>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <feature.icon className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Login Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center lg:justify-end"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="relative p-8 rounded-2xl border bg-card shadow-2xl backdrop-blur-sm">
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-2xl -z-10" />
              
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-center space-y-2"
                >
                  <h2 className="text-3xl font-bold">Welcome Back</h2>
                  <p className="text-muted-foreground">
                    Sign in to continue your coding journey
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Button
                    onClick={handleSignin}
                    disabled={loading}
                    size="lg"
                    className="w-full h-12 text-base font-semibold bg-[#24292e] hover:bg-[#2d3339] text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="flex items-center gap-2"
                      >
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full" />
                        <span>Connecting...</span>
                      </motion.div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Github className="h-5 w-5" />
                        <span>Continue with GitHub</span>
                      </div>
                    )}
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-center text-sm text-muted-foreground space-y-1"
                >
                  <p>By continuing, you agree to our</p>
                  <p>
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginForm;
