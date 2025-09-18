'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'image/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'image/components/ui/form'
import { Input } from 'image/components/ui/input'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
export default function RestPassword() {
    const [btnLoading, setBtn] = useState<boolean>(true)
    const Route = useRouter()
    const SchemaRestPassword = z.object({
        email: z.email('email invaild').nonempty('email required'),
        newPassword: z.string().nonempty('newPassword is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/, 'password invaild'),


    })
    const RestPasswordForm = useForm({
        defaultValues: {
            "email": "",
            "newPassword": "",

        },
        resolver: zodResolver(SchemaRestPassword)
    })

    async function handleRestPassword(values: z.infer<typeof SchemaRestPassword>) {
        setBtn(false)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`, {
            method: "Put",
            body: JSON.stringify(values),
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await res.json()
        setBtn(true)
        console.log(data);
        if (data.token) {
            toast.success('Password Updated', { position: 'top-center' })
            Route.push('/login')
        } else {
            toast.error(data.message, { position: 'top-center' })
        }


    }
    return (
        <>
            <div className='w-3/4 mx-auto my-5 text-center '>
                <title>Find Account</title>
                <h1 className='text-3xl font-bold my-5'>Rest Password</h1>
                <Form {...RestPasswordForm}>
                    <form className='space-y-5' onSubmit={RestPasswordForm.handleSubmit(handleRestPassword)}>

                        <FormField
                            control={RestPasswordForm.control}
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
                            control={RestPasswordForm.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-bold'>Enter New Password:</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <br />
                        {
                            btnLoading ? <Button className='w-full bg-main'>Rest Password </Button> : <Button type='button' className='w-full bg-main'>Loadinnnnnnng </Button>
                        }



                    </form>
                </Form>
            </div>
        </>
    )
}
