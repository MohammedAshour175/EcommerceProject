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
export default function ForgetPassword() {
    const Route = useRouter()
    const SchemaForgetPassword = z.object({
        email: z.email('email invaild').nonempty('email required'),
    })
    const ForgetPasswordForm = useForm({
        defaultValues: {
            "email": "",

        },
        resolver: zodResolver(SchemaForgetPassword)
    })

    async function handleForgetPassword(values: z.infer<typeof SchemaForgetPassword>) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`, {
            method: "post",
            body: JSON.stringify(values),
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await res.json()
        console.log(data);
        if (data.statusMsg == 'success') {
            toast.success('Code send', { position: 'top-center' })
            Route.push('/restCode')
        } else {
            toast.error(data.message, { position: 'top-center' })
        }


    }
    return (
        <>
            <div className='w-3/4 mx-auto my-5 text-center '>
                <title>Find Account</title>
                <h1 className='text-3xl font-bold my-5'>Find Your Account</h1>
                <Form {...ForgetPasswordForm}>
                    <form className='space-y-5' onSubmit={ForgetPasswordForm.handleSubmit(handleForgetPassword)}>

                        <FormField
                            control={ForgetPasswordForm.control}
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




                        <Button className='w-full bg-main'>Confirm </Button>
                    </form>
                </Form>
            </div>
        </>
    )
}
