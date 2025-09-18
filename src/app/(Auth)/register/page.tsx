'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'image/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'image/components/ui/form'
import { Input } from 'image/components/ui/input'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

export default function Register() {
    const Route = useRouter()
    const SchemaRegister = z.object({
        name: z.string().nonempty('name required').min(2, 'min char is 2 ').max(15, 'max char is 15'),
        email: z.email('email invaild').nonempty('email required'),
        password: z.string().nonempty('password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/, 'password invaild'),
        rePassword: z.string().nonempty('password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/, 'password invaild'),
        phone: z.string().nonempty('phone required').regex(/^(\+2)?01[0-2,5]{1}[0-9]{8}$/, "Enter Vaild Phone"),

    }).refine((obj) => {
        return obj.password == obj.rePassword
    }, {
        path: ['rePassword'],
        error: "Confirm Password not Match"
    })
    const RegisterForm = useForm({
        defaultValues: {
            "name": "",
            "email": "",
            "password": "",
            "rePassword": "",
            "phone": ""
        },
        resolver: zodResolver(SchemaRegister)
    })

    async function handleRegister(values: z.infer<typeof SchemaRegister>) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`, {
            method: "post",
            body: JSON.stringify(values),
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await res.json()
        console.log(data);
        if (data.message == 'success') {
            toast.success('Account Created!', { position: 'top-center' })
            Route.push('/login')
        } else {
            toast.error(data.message, { position: 'top-center' })
        }


    }
    return (
        <>
            <div className='w-3/4 mx-auto my-5 text-center '>
                <title>Register</title>
                <h1 className='text-3xl font-bold my-5'>Register Now</h1>
                <Form {...RegisterForm}>
                    <form className='space-y-5' onSubmit={RegisterForm.handleSubmit(handleRegister)}>
                        <FormField
                            control={RegisterForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-bold'>Name:</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={RegisterForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-bold' >Email:</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={RegisterForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-bold'>Password:</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={RegisterForm.control}
                            name="rePassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-bold'>rePassword:</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={RegisterForm.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-bold'>phone:</FormLabel>
                                    <FormControl>
                                        <Input type="tel" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button className='w-full bg-main'>Register </Button>
                    </form>
                </Form>
            </div>
        </>
    )
}
