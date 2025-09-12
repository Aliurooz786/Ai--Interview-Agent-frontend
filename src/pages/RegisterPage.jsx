import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const { register } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password || !phoneNumber) {
            alert("Please fill out all fields.");
            return;
        }
        register({ name, email, password, phoneNumber });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription>
                        Create a new account.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" type="text" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input id="phoneNumber" type="tel" placeholder="9876543210" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button type="submit" className="w-full">Create Account</Button>
                         <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="underline">
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default RegisterPage;

