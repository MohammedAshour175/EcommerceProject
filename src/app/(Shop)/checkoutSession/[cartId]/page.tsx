'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutPayment } from 'image/app/OrderAction/OrderAction'
import { Button } from 'image/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from 'image/components/ui/form'
import { Input } from 'image/components/ui/input'
import { useParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const SchemaCart = z.object({
    details: z.string().nonempty('Details is required'),
    phone: z.string().nonempty('Phone is required'),
    city: z.string().nonempty('City is required'),
})

type SchemaCartType = z.infer<typeof SchemaCart>

export default function CheckoutSession() {
    const { cartId }: { cartId: string } = useParams()

    const shippingForm = useForm<SchemaCartType>({
        resolver: zodResolver(SchemaCart),
        defaultValues: {
            details: '',
            phone: '',
            city: '',
        },
    })

    async function CheckoutSessionPayment(values: { details: string, phone: string, city: string }) {
        const data = await checkoutPayment(cartId, values)
        console.log(data);
        // window.location.href=data.session.url
        window.open(data.session.url, "_blank")


    }

    return (
        <div className="w-3/4 mx-auto my-5">
            <title>Checkout</title>
            <h1 className="text-3xl text-center font-bold">Check out payment</h1>

            <Form {...shippingForm}>
                <form
                    className="space-y-4"
                    onSubmit={shippingForm.handleSubmit(CheckoutSessionPayment)}
                >
                    <FormField
                        control={shippingForm.control}
                        name="details"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Details</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter details" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={shippingForm.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={shippingForm.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter city" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full bg-main">
                        Payment
                    </Button>
                </form>
            </Form>
        </div>
    )
}
