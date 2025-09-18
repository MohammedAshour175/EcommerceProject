'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'image/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'image/components/ui/form'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { toast } from 'sonner'
import * as z from 'zod'
export default function RestCode() {
    const Route = useRouter()
    const SchemaRestCode = z.object({
        resetCode: z.string().nonempty("rest Code Reqierd")
    })
    const RestCodeForm = useForm({
        defaultValues: {
            "resetCode": "",

        },
        resolver: zodResolver(SchemaRestCode)
    })

    async function handleRestCode(values: z.infer<typeof SchemaRestCode>) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`, {
            method: "post",
            body: JSON.stringify(values),
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await res.json()
        console.log(data);
        if (data.status == 'Success') {
            toast.success('Code Correct', { position: 'top-center' })
            Route.push('/restPassword')
        } else {
            toast.error(data.message, { position: 'top-center' })
        }


    }
    return (
        <>
            <div className='w-3/4 mx-auto my-5 text-center '>
                <title>Find Account</title>
                <h1 className='text-3xl font-bold my-5'>Find Your Account</h1>
                <Form {...RestCodeForm}>
                    <form className='space-y-5' onSubmit={RestCodeForm.handleSubmit(handleRestCode)}>

                        <FormField
                            control={RestCodeForm.control}
                            name="resetCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-bold' >Code:</FormLabel>
                                    <FormControl>
                                        <InputOTP {...field} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />




                        <Button className='w-full bg-main'>Vetfiy Code </Button>
                    </form>
                </Form>
            </div>
        </>
    )
}
