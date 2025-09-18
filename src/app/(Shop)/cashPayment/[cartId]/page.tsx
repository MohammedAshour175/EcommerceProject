'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { CashPayment } from 'image/app/OrderAction/OrderAction'
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
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

const SchemaCashPayment = z.object({
    details: z.string().nonempty('Details is required'),
    phone: z.string().nonempty('Phone is required'),
    city: z.string().nonempty('City is required'),
})

type SchemaCashPaymentType = z.infer<typeof SchemaCashPayment>

export default function CashPaymentPage() {
    const Route = useRouter()
    const params = useParams<{ cartId: string }>() // ✅ هنا التايب مظبوط
    const cartId = params.cartId

    const shippingForm = useForm<SchemaCashPaymentType>({
        resolver: zodResolver(SchemaCashPayment),
        defaultValues: {
            details: '',
            phone: '',
            city: '',
        },
    })

    async function CheckoutSessionPayment(values: SchemaCashPaymentType) {
        const data = await CashPayment(cartId, values)
        console.log(data)

        if (data.status === 'success') {
            toast.success('Payment done', { position: 'top-center' })
            Route.push('/allorders')
        } else {
            toast.error('There is no cart for this user', { position: 'top-center' })
            Route.push('/')
        }
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
