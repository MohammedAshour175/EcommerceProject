'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'image/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'image/components/ui/form'
import { Input } from 'image/components/ui/input'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import Link from 'next/link';
import { signIn } from 'next-auth/react'
import { getUserToken } from 'image/getUserToken'
import { CartData } from 'image/types/cartData.type'
import { getCartData } from 'image/app/CartAction/CartAction'
import { CountContext } from 'image/CountProvider'

export default function Login() {
    const Route = useRouter()
    const context = useContext(CountContext)
    if (!context) {
        throw new Error("CountContext must be used within CountProvider")
    }
    const { setCount } = context
    const SchemaLogin = z.object({
        email: z.email('email invaild').nonempty('email required'),
        password: z.string().nonempty('password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/, 'password invaild'),


    })
    const LoginForm = useForm({
        defaultValues: {
            "email": "",
            "password": "",

        },
        resolver: zodResolver(SchemaLogin)
    })

    async function handleLogin(values: z.infer<typeof SchemaLogin>) {
        // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
        //     method: "post",
        //     body: JSON.stringify(values),
        //     headers: {
        //         "content-type": "application/json"
        //     }
        // })
        // const data = await res.json()
        // console.log(data);
        // if (data.message == 'success') {
        //     toast.success('Login successfully', { position: 'top-center' })
        //     Route.push('/')
        // } else {
        //     toast.error(data.message, { position: 'top-center' })
        // }
        const data = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
        })
        if (data?.ok) {
            toast.success('Login successfully', { position: 'top-center' })
            Route.push('/')
            const token: unknown = await getUserToken()
            if (token) {
                const data: CartData = await getCartData()
                const sum = data.data.products.reduce((total, item) => total += item.count, 0)
                setCount(sum)

            }
        } else {
            toast.error(data?.error, { position: 'top-center' })
        }
        console.log(data);


    }
    return (
        <>
            <div className='w-3/4 mx-auto my-5 text-center '>
                <title>Login</title>
                <h1 className='text-3xl font-bold my-5'>Login Now</h1>
                <Form {...LoginForm}>
                    <form className='space-y-5' onSubmit={LoginForm.handleSubmit(handleLogin)}>

                        <FormField
                            control={LoginForm.control}
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
                            control={LoginForm.control}
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


                        <Link href="/forgetPassword" className='m-3' >ForgetPassword!</Link>
                        <br />
                        <Button className='w-full bg-main'>Login </Button>
                    </form>
                </Form>
            </div>
        </>
    )
}
